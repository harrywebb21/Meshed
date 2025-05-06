/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { uploadWorkspacePreview } from "@/utils/queries/workspace";

interface WorkspaceScreenshotOptions {
  workspaceId: string;
  interval?: number; // in milliseconds, defaults to 30 seconds
  captureOnUserLeave?: boolean;
  enabled?: boolean;
}

export function useWorkspaceScreenshot({
  workspaceId,
  interval = 30000,
  captureOnUserLeave = true,
  enabled = true,
}: WorkspaceScreenshotOptions) {
  // Use state instead of ref - this was causing the loop
  const [screenshotFn, setScreenshotFn] = useState<(() => string) | null>(null);

  // Function to capture and upload screenshot
  const captureAndUploadScreenshot = useCallback(async () => {
    if (!screenshotFn || !workspaceId || !enabled) return;

    try {
      console.log("Capturing workspace screenshot");
      const dataUrl = screenshotFn();

      // Convert data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Upload to Supabase
      await uploadWorkspacePreview(blob, workspaceId);
      console.log("Screenshot uploaded successfully");
    } catch (error) {
      console.error("Error capturing or uploading screenshot:", error);
    }
  }, [screenshotFn, workspaceId, enabled]);

  useEffect(() => {
    if (!enabled || !workspaceId || !screenshotFn) return;

    console.log("Starting screenshot interval:", interval);
    const intervalId = setInterval(captureAndUploadScreenshot, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    workspaceId,
    interval,
    enabled,
    captureAndUploadScreenshot,
    screenshotFn,
  ]);

  // Handle user leaving (tab/window close)
  useEffect(() => {
    if (!captureOnUserLeave || !enabled || !screenshotFn) return;

    const handleBeforeUnload = () => {
      captureAndUploadScreenshot();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [captureOnUserLeave, enabled, captureAndUploadScreenshot, screenshotFn]);

  return {
    setScreenshotFunction: setScreenshotFn,
    captureScreenshot: captureAndUploadScreenshot,
  };
}

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Profile, Workspace } from "@/utils/supabase/types/dbTypes";

interface EmailTemplateProps {
  user: Profile;
  workspace: Workspace;
}

export default function EmailTemplate({ user, workspace }: EmailTemplateProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://meshed.art";
  const url = `${baseUrl}/design/${workspace.id}`;
  return (
    <Html>
      <Head />
      <Preview>You&apos;ve been invited to test</Preview>
      <Tailwind>
        <Body className="bg-[#141414] my-auto mx-auto font-sans px-2 ">
          <Container className="border-2 border-solid border-[#1a1a1a] shadow-lg rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <a href="https://meshed.art">
                <Img
                  src={`https://meshed.art/MESHED_LOGO.png`}
                  height="42"
                  alt="Meshed Logo"
                  className="my-0 mx-auto"
                />
              </a>
            </Section>
            <Heading className="text-white text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              You&apos;ve been invited to{" "}
              <strong className="text-[#05ff69]">
                {workspace.workspace_name}
              </strong>
            </Heading>
            <Text className="text-white text-[14px] leading-[24px]">
              Hello {user.display_name},
            </Text>
            <Text className="text-white text-[14px] leading-[24px]">
              You have been invited to join the{" "}
              <strong className="text-[#05ff69]">
                {workspace.workspace_name}
              </strong>{" "}
              workspace on Meshed. Click the button below to start meshing!
            </Text>
            <Button
              href={url}
              className="bg-[#05ff69] rounded text-[#1a1a1a] text-[12px] font-semibold no-underline text-center px-5 py-3 w-11/12 mx-auto "
            >
              Start Meshing
            </Button>
            <Text className="text-white text-[14px] leading-[24px] mt-[30px]">
              If you have any questions, please contact the workspace owner.
            </Text>
            <Text className="text-white text-[14px] leading-[24px]">
              Thanks for using Meshed!
            </Text>
            <Text className="text-white text-[14px] leading-[24px]">
              The Meshed Team
            </Text>
          </Container>
          <Section className="text-center">
            <a className="no-underline" href="https://meshed.art">
              <table className="w-full">
                <tr className="w-full">
                  <td align="center">
                    <Img
                      alt="Meshed Logo"
                      height="42"
                      src={`https://meshed.art/MESHED_LOGO.png`}
                    />
                  </td>
                </tr>
                <tr className="w-full">
                  <td align="center">
                    <Text className=" text-[32px] font-semibold leading-[24px] text-white">
                      Meshed
                    </Text>
                  </td>
                </tr>
              </table>
            </a>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}

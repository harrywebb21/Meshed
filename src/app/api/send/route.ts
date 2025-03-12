import EmailTemplate from "@/components/Email/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await req.json();
    if (!body.user || !body.workspace) {
      return Response.json(
        { error: "Missing user or workspace in request body" },
        { status: 400 }
      );
    }
    const { data, error } = await resend.emails.send({
      from: "Meshed <no.reply@meshed.art>",
      to: body.user.email,
      subject: "You have been invited to a Meshed project!",
      react: EmailTemplate({ user: body.user, workspace: body.workspace }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

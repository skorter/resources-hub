import { Router } from "express";
import { type Request, type Response } from "express";
import { Resend } from "resend";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, title, url, description } = req.body;

  if (!title || !url || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Resource Hub <onboarding@resend.dev>",
      to: [process.env.RECIPIENT_EMAIL!],
      subject: `New resource suggestion: ${title}`,
      html: `
        <h1>New Resource Suggestion</h1>
        <p><strong>Name:</strong> ${name || "Anonymous"}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Link:</strong> <a href="${url}">${url}</a></p>
        <p><strong>Description:</strong> ${description}</p>
      `,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;

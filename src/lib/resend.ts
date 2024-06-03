import { Resend } from "resend";
import { SendVerificationRequestParams } from "next-auth/providers/email";

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  let {
    identifier: email,
    url,
    provider: { from },
  } = params;

  console.log("url", url);
  console.log("provider", email);
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    await resend.emails.send({
      from: from,
      to: email,
      subject: "Login to you Account",
      html:
        '<p>Click the magic link below to sign in to your account:</p>\
                    <p><a href="' +
        url +
        '"><b>Sign in</b></a></p>',
    });
  } catch (error) {
    console.log({ error });
  }
};

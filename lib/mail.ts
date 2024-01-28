import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendTowFactorTokenEmail = async (email:string, token:string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two-factor authentication code",
    html:`
      <p> Your 2FA code  : ${token} </p>
    `
}
)}


export const sendPasswordResetEmail = async (email:string, token:string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h1 style="color: #333;">Reset your password</h1>
        <p style="color: #555;">Click the button below to reset your password.</p>
        <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 15px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px; margin-top: 10px;">Reset your password</a>
        <p style="color: #777; font-size: 12px; margin-top: 20px;">If you did not request this email, please ignore it.</p>
      </div>
    `,
  });
}


export const sendVerificationEmail = async (email:string, token:string) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h1 style="color: #333;">Welcome!</h1>
        <p style="color: #555;">Thanks for signing up. Please verify your email address to get started.</p>
        <a href="${confirmationLink}" style="background-color: #4CAF50; color: white; padding: 15px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px; margin-top: 10px;">Verify your email</a>
        <p style="color: #777; font-size: 12px; margin-top: 20px;">If you did not request this email, please ignore it.</p>
      </div>
    `,
  });
};






import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendConfirmationEmail({ email, firstName, lga, interests }) {
  await transporter.sendMail({
    from: `"Lagos APC" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: '✅ Welcome to the Lagos APC Movement!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #008A44; padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Lagos APC</h1>
        </div>
        <div style="padding: 32px; background: #fff;">
          <h2 style="color: #1a1a1a;">Welcome, ${firstName}! 🎉</h2>
          <p style="color: #555; line-height: 1.6;">
            Thank you for joining the movement. Your registration for 
            <strong>${lga} LGA</strong> has been received.
          </p>
          <p style="color: #555;">
            You signed up to help with: <strong>${interests.join(', ')}</strong>
          </p>
          <p style="color: #555;">
            A party representative from your LGA will contact you soon.
          </p>
          <div style="margin-top: 32px; padding: 16px; background: #f0fdf4; border-left: 4px solid #008A44; border-radius: 4px;">
            <p style="color: #008A44; margin: 0; font-weight: bold;">
              Together, we build a greater Lagos.
            </p>
          </div>
        </div>
        <div style="padding: 16px; text-align: center; color: #999; font-size: 12px;">
          © ${new Date().getFullYear()} Lagos APC. All rights reserved.
        </div>
      </div>
    `,
  });
}
import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

class EmailService {
  constructor() {
    // Validate required env vars at startup — fail loudly, not silently later
    const required = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
    const missing = required.filter((k) => !process.env[k]);
    if (missing.length) {
      logger.warn(`⚠️  Email service: missing env vars [${missing.join(', ')}] — emails will not send.`);
    }

    this.enabled = missing.length === 0;

    const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
    // EMAIL_IGNORE_TLS=true bypasses self-signed cert rejection (ESOCKET / CERT_UNTRUSTED).
    // Safe for corporate/private SMTP servers. Never use with Gmail, Outlook, or SendGrid.
    const ignoreTLS = process.env.EMAIL_IGNORE_TLS === 'true';

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port,
      secure: port === 465,           // 465 = implicit TLS, 587 = STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail: use an App Password, not your login password
      },
      tls: {
        rejectUnauthorized: !ignoreTLS,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }

  // Call this once after server starts to catch bad credentials early
  async verify() {
    if (!this.enabled) return false;
    try {
      await this.transporter.verify();
      logger.info('✅ Email transporter connected and ready.');
      return true;
    } catch (err) {
      // Log everything — full error, code, and response from the SMTP server
      logger.error('❌ Email transporter verification failed:');
      logger.error(`   Message : ${err.message}`);
      logger.error(`   Code    : ${err.code || 'N/A'}`);
      logger.error(`   Response: ${err.response || 'N/A'}`);
      logger.error('');
      logger.error('   Common fixes:');
      logger.error('   • Gmail: use an App Password (not your login password)');
      logger.error('     → https://myaccount.google.com/apppasswords');
      logger.error('   • Gmail: enable "2-Step Verification" first (required for App Passwords)');
      logger.error('   • Wrong port: use 587 (STARTTLS) or 465 (SSL) — not 25');
      logger.error('   • EMAIL_FROM must be the same address as EMAIL_USER for Gmail');
      return false;
    }
  }

  async send({ to, subject, html, text }) {
    if (!this.enabled) {
      logger.warn(`Email skipped (service not configured): ${subject} → ${to}`);
      return false;
    }

    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''),
      });
      logger.info(`📧 Email sent → ${to} [${info.messageId}]`);
      return true;
    } catch (err) {
      // Log the full error — never swallow it silently
      logger.error(`📧 Failed to send email → ${to}`);
      logger.error(`   Subject : ${subject}`);
      logger.error(`   Message : ${err.message || JSON.stringify(err)}`);
      logger.error(`   Code    : ${err.code || 'N/A'}`);
      logger.error(`   Response: ${err.response || 'N/A'}`);
      return false;
    }
  }

  async sendWelcome(member) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Lagos APC</title>
      </head>
      <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
              <tr>
                <td style="background:#15803d;padding:32px 40px;text-align:center;">
                  <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700;">Lagos APC</h1>
                  <p style="color:#bbf7d0;margin:8px 0 0;font-size:14px;">All Progressives Congress — Lagos State</p>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="color:#111;font-size:22px;margin:0 0 16px;">Welcome, ${member.firstName}! 🎉</h2>
                  <p style="color:#444;font-size:16px;line-height:1.6;margin:0 0 16px;">
                    Thank you for joining the Lagos APC movement. Your registration has been received and a party
                    representative from <strong>${member.lga} LGA</strong> will be reaching out to you shortly.
                  </p>
                  <table style="background:#f0fdf4;border-left:4px solid #15803d;border-radius:4px;padding:16px 20px;width:100%;margin-bottom:24px;">
                    <tr><td>
                      <p style="margin:0 0 8px;color:#166534;font-weight:600;">Your Registration Details</p>
                      <p style="margin:4px 0;color:#444;font-size:14px;">📍 LGA: <strong>${member.lga}</strong></p>
                      ${member.ward ? `<p style="margin:4px 0;color:#444;font-size:14px;">🏘️ Ward: <strong>${member.ward}</strong></p>` : ''}
                      ${member.interests?.length ? `<p style="margin:4px 0;color:#444;font-size:14px;">🤝 Areas of Interest: <strong>${member.interests.join(', ')}</strong></p>` : ''}
                    </td></tr>
                  </table>
                  <p style="color:#444;font-size:15px;line-height:1.6;margin:0 0 24px;">
                    Together, we are building a greater Lagos. Stay connected and watch out for updates from your LGA coordinator.
                  </p>
                  <p style="color:#888;font-size:13px;margin:0;">
                    If you did not register, please ignore this email or contact us at
                    <a href="mailto:info@apclagos.com" style="color:#15803d;">info@apclagos.com</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
                  <p style="color:#9ca3af;font-size:12px;margin:0;">
                    © ${new Date().getFullYear()} Lagos APC. All rights reserved.<br />
                    Lagos State Chapter, All Progressives Congress
                  </p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    return this.send({
      to: member.email,
      subject: `Welcome to the Lagos APC Movement, ${member.firstName}!`,
      html,
    });
  }

  async sendPasswordReset(admin, resetURL) {
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#15803d;">Password Reset Request</h2>
        <p>Hi ${admin.name},</p>
        <p>You requested a password reset. Click the button below — this link expires in 10 minutes.</p>
        <a href="${resetURL}" style="display:inline-block;background:#15803d;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
          Reset Password
        </a>
        <p style="color:#888;font-size:13px;margin-top:24px;">
          If you didn't request this, ignore this email. Your password remains unchanged.
        </p>
      </div>
    `;

    return this.send({
      to: admin.email,
      subject: 'Password Reset — Lagos APC Admin',
      html,
    });
  }
}

export default new EmailService();
// import nodemailer from 'nodemailer';
// import logger from '../utils/logger.js';

// class EmailService {
//   constructor() {
//     // Validate required env vars at startup — fail loudly, not silently later
//     const required = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
//     const missing = required.filter((k) => !process.env[k]);
//     if (missing.length) {
//       logger.warn(`⚠️  Email service: missing env vars [${missing.join(', ')}] — emails will not send.`);
//     }

//     this.enabled = missing.length === 0;

//     const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
//     // EMAIL_IGNORE_TLS=true bypasses self-signed cert rejection (ESOCKET / CERT_UNTRUSTED).
//     // Safe for corporate/private SMTP servers. Never use with Gmail, Outlook, or SendGrid.
//     const ignoreTLS = process.env.EMAIL_IGNORE_TLS === 'true';

//     this.transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port,
//       secure: port === 465,           // 465 = implicit TLS, 587 = STARTTLS
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // Gmail: use an App Password, not your login password
//       },
//       tls: {
//         rejectUnauthorized: !ignoreTLS,
//       },
//       connectionTimeout: 10_000,
//       greetingTimeout: 10_000,
//       socketTimeout: 15_000,
//     });
//   }

//   // Call this once after server starts to catch bad credentials early
//   async verify() {
//     if (!this.enabled) return false;
//     try {
//       await this.transporter.verify();
//       logger.info('✅ Email transporter connected and ready.');
//       return true;
//     } catch (err) {
//       // Log everything — full error, code, and response from the SMTP server
//       logger.error('❌ Email transporter verification failed:');
//       logger.error(`   Message : ${err.message}`);
//       logger.error(`   Code    : ${err.code || 'N/A'}`);
//       logger.error(`   Response: ${err.response || 'N/A'}`);
//       logger.error('');
//       logger.error('   Common fixes:');
//       logger.error('   • Gmail: use an App Password (not your login password)');
//       logger.error('     → https://myaccount.google.com/apppasswords');
//       logger.error('   • Gmail: enable "2-Step Verification" first (required for App Passwords)');
//       logger.error('   • Wrong port: use 587 (STARTTLS) or 465 (SSL) — not 25');
//       logger.error('   • EMAIL_FROM must be the same address as EMAIL_USER for Gmail');
//       return false;
//     }
//   }

//   async send({ to, subject, html, text }) {
//     if (!this.enabled) {
//       logger.warn(`Email skipped (service not configured): ${subject} → ${to}`);
//       return false;
//     }

//     try {
//       const info = await this.transporter.sendMail({
//         from: process.env.EMAIL_FROM,
//         to,
//         subject,
//         html,
//         text: text || html.replace(/<[^>]*>/g, ''),
//       });
//       logger.info(`📧 Email sent → ${to} [${info.messageId}]`);
//       return true;
//     } catch (err) {
//       // Log the full error — never swallow it silently
//       logger.error(`📧 Failed to send email → ${to}`);
//       logger.error(`   Subject : ${subject}`);
//       logger.error(`   Message : ${err.message || JSON.stringify(err)}`);
//       logger.error(`   Code    : ${err.code || 'N/A'}`);
//       logger.error(`   Response: ${err.response || 'N/A'}`);
//       return false;
//     }
//   }

//   async sendWelcome(member) {
//     const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Welcome to Lagos APC</title>
//       </head>
//       <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
//         <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
//           <tr><td align="center">
//             <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
//               <tr>
//                 <td style="background:#15803d;padding:32px 40px;text-align:center;">
//                   <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700;">Lagos APC</h1>
//                   <p style="color:#bbf7d0;margin:8px 0 0;font-size:14px;">All Progressives Congress — Lagos State</p>
//                 </td>
//               </tr>
//               <tr>
//                 <td style="padding:40px;">
//                   <h2 style="color:#111;font-size:22px;margin:0 0 16px;">Welcome, ${member.firstName}! 🎉</h2>
//                   <p style="color:#444;font-size:16px;line-height:1.6;margin:0 0 16px;">
//                     Thank you for joining the Lagos APC movement. Your registration has been received and a party
//                     representative from <strong>${member.lga} LGA</strong> will be reaching out to you shortly.
//                   </p>
//                   <table style="background:#f0fdf4;border-left:4px solid #15803d;border-radius:4px;padding:16px 20px;width:100%;margin-bottom:24px;">
//                     <tr><td>
//                       <p style="margin:0 0 8px;color:#166534;font-weight:600;">Your Registration Details</p>
//                       <p style="margin:4px 0;color:#444;font-size:14px;">📍 LGA: <strong>${member.lga}</strong></p>
//                       ${member.ward ? `<p style="margin:4px 0;color:#444;font-size:14px;">🏘️ Ward: <strong>${member.ward}</strong></p>` : ''}
//                       ${member.interests?.length ? `<p style="margin:4px 0;color:#444;font-size:14px;">🤝 Areas of Interest: <strong>${member.interests.join(', ')}</strong></p>` : ''}
//                     </td></tr>
//                   </table>
//                   <p style="color:#444;font-size:15px;line-height:1.6;margin:0 0 24px;">
//                     Together, we are building a greater Lagos. Stay connected and watch out for updates from your LGA coordinator.
//                   </p>
//                   <p style="color:#888;font-size:13px;margin:0;">
//                     If you did not register, please ignore this email or contact us at
//                     <a href="mailto:info@apclagos.com" style="color:#15803d;">info@apclagos.com</a>
//                   </p>
//                 </td>
//               </tr>
//               <tr>
//                 <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
//                   <p style="color:#9ca3af;font-size:12px;margin:0;">
//                     © ${new Date().getFullYear()} Lagos APC. All rights reserved.<br />
//                     Lagos State Chapter, All Progressives Congress
//                   </p>
//                 </td>
//               </tr>
//             </table>
//           </td></tr>
//         </table>
//       </body>
//       </html>
//     `;

//     return this.send({
//       to: member.email,
//       subject: `Welcome to the Lagos APC Movement, ${member.firstName}!`,
//       html,
//     });
//   }

//   async sendPasswordReset(admin, resetURL) {
//     const html = `
//       <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
//         <h2 style="color:#15803d;">Password Reset Request</h2>
//         <p>Hi ${admin.name},</p>
//         <p>You requested a password reset. Click the button below — this link expires in 10 minutes.</p>
//         <a href="${resetURL}" style="display:inline-block;background:#15803d;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
//           Reset Password
//         </a>
//         <p style="color:#888;font-size:13px;margin-top:24px;">
//           If you didn't request this, ignore this email. Your password remains unchanged.
//         </p>
//       </div>
//     `;

//     return this.send({
//       to: admin.email,
//       subject: 'Password Reset — Lagos APC Admin',
//       html,
//     });
//   }
// }

// export default new EmailService();
import { Resend } from 'resend';
import logger from '../utils/logger.js';

/**
 * DIRECT IMAGE LINK: 
 * We use i.imgur.com with the extension to ensure email clients (Gmail, Outlook) 
 * can fetch the raw image file directly.
 */
const LOGO_URL = 'https://i.imgur.com/HE9xSj1.png'; 

class EmailService {
  constructor() {
    this.brand = {
      primary: '#008751',   // APC Green
      secondary: '#003366', // APC Blue
      accent: '#E31D1C',    // APC Red
      bg: '#F4F7F9',        // Soft gray background
      white: '#FFFFFF',
      text: '#1E293B'
    };

    if (!process.env.RESEND_API_KEY) {
      logger.warn('⚠️ RESEND_API_KEY not set — Email service disabled.');
      this.enabled = false;
      return;
    }
    this.client = new Resend(process.env.RESEND_API_KEY);
    this.enabled = true;
  }

  /**
   * Layout wrapper with Apple-style minimalist aesthetic
   */
  _renderLayout(content, preheader = '') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: ${this.brand.bg}; color: ${this.brand.text}; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
          .wrapper { width: 100%; table-layout: fixed; background-color: ${this.brand.bg}; padding-bottom: 40px; }
          .container { max-width: 600px; background-color: ${this.brand.white}; margin: 40px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .btn { display: inline-block; padding: 14px 28px; background-color: ${this.brand.primary}; color: #ffffff !important; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #94A3B8; }
          @media screen and (max-width: 600px) { .container { margin: 0; border-radius: 0; } }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div style="display:none; max-height:0; overflow:hidden;">${preheader}</div>
          
          <div class="container">
            <div style="height: 4px; font-size: 0; line-height: 0;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="33.3%" height="4" bgcolor="${this.brand.primary}"></td>
                  <td width="33.3%" height="4" bgcolor="${this.brand.secondary}"></td>
                  <td width="33.3%" height="4" bgcolor="${this.brand.accent}"></td>
                </tr>
              </table>
            </div>

            <div style="padding: 40px 40px 20px; text-align: center;">
              <img src="${LOGO_URL}" alt="Lagos APC" width="70" style="display: block; margin: 0 auto; outline: none; border: none;" />
              <h2 style="margin: 16px 0 0; color: ${this.brand.secondary}; font-size: 18px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Lagos APC</h2>
            </div>

            <div style="padding: 0 40px 40px;">
              ${content}
              
              <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #EDF2F7;">
                <p style="margin: 0; font-size: 14px; color: #64748B;">For a Greater Lagos,</p>
                <p style="margin: 4px 0 0; font-size: 15px; font-weight: 600; color: ${this.brand.primary};">Lagos State APC Secretariat</p>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} All Progressives Congress, Lagos State.</p>
            <p>ACME Road, Ogba, Ikeja, Lagos.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async sendWelcome(member) {
    const content = `
      <h1 style="font-size: 24px; font-weight: 700; color: #0F172A; margin: 0 0 16px; letter-spacing: -0.02em;">Welcome, ${member.firstName}!</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
        Thank you for standing with us. Your registration is complete, and you are now an official member of the movement for a better Lagos.
      </p>
      
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding-bottom: 8px; font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase;">Membership Data</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-size: 14px;"><strong>LGA:</strong> ${member.lga}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-size: 14px;"><strong>Ward:</strong> ${member.ward || 'Pending Assignment'}</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <a href="https://apclagos.com/portal" class="btn">View Your Membership</a>
      </div>
    `;

    return this.send({
      to: member.email,
      subject: `Welcome to the Lagos APC, ${member.firstName}!`,
      html: this._renderLayout(content, "Registration Confirmed"),
    });
  }

  async send({ to, subject, html, text }) {
    if (!this.enabled) return false;
    try {
      const { data, error } = await this.client.emails.send({
        from: process.env.EMAIL_FROM || 'Lagos APC <onboarding@resend.dev>',
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''),
      });
      if (error) { logger.error(`📧 Resend Error: ${error.message}`); return false; }
      return true;
    } catch (err) {
      logger.error(`📧 System Error: ${err.message}`);
      return false;
    }
  }
}

export default new EmailService();
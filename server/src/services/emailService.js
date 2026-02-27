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



import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

/* ─────────────────────────────────────────────
   SHARED STYLE TOKENS
   (inline CSS only — email clients strip <style>)
───────────────────────────────────────────── */
const T = {
  green:     '#16a34a',
  greenDark: '#14532d',
  greenLight:'#dcfce7',
  greenMid:  '#bbf7d0',
  black:     '#0a0f0c',
  charcoal:  '#1a2e20',
  bodyText:  '#374151',
  mutedText: '#6b7280',
  border:    '#e5e7eb',
  bg:        '#f0f4f1',
  white:     '#ffffff',
  font:      "Georgia, 'Times New Roman', serif",
  fontSans:  "Arial, Helvetica, sans-serif",
};

/* ─────────────────────────────────────────────
   SHARED LAYOUT WRAPPERS
───────────────────────────────────────────── */
const emailWrapper = (content) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Lagos APC</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${T.bg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:${T.bg};padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- OUTER CARD -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:580px;background-color:${T.white};border-radius:16px;overflow:hidden;
                 box-shadow:0 4px 24px rgba(0,0,0,0.10);border:1px solid ${T.border};">

          <!-- HEADER BAND -->
          <tr>
            <td style="background-color:${T.black};padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- green left accent -->
                  <td style="width:6px;background-color:${T.green};">&nbsp;</td>
                  <td style="padding:28px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <p style="margin:0;font-family:${T.fontSans};font-size:10px;font-weight:700;
                                    letter-spacing:0.18em;text-transform:uppercase;color:${T.green};">
                            All Progressives Congress
                          </p>
                          <h1 style="margin:6px 0 0;font-family:${T.font};font-size:26px;font-weight:700;
                                     color:${T.white};letter-spacing:-0.01em;line-height:1.1;">
                            Lagos State Chapter
                          </h1>
                        </td>
                        <td width="56" align="right" valign="middle">
                          <!-- APC monogram badge -->
                          <div style="width:48px;height:48px;border-radius:12px;
                                      background-color:${T.green};
                                      text-align:center;line-height:48px;
                                      font-family:${T.fontSans};font-size:12px;font-weight:900;
                                      color:${T.black};letter-spacing:0.04em;">
                            APC
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          ${content}

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#f9fafb;border-top:1px solid ${T.border};padding:24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-family:${T.fontSans};font-size:11px;
                               color:${T.mutedText};line-height:1.6;">
                      © ${new Date().getFullYear()} Lagos APC · All Progressives Congress, Lagos State Chapter.<br />
                      This message was sent to you because you interacted with our registration system.
                    </p>
                    <p style="margin:0;font-family:${T.fontSans};font-size:11px;color:#9ca3af;">
                      Questions? Contact&nbsp;
                      <a href="mailto:info@apclagos.com"
                         style="color:${T.green};text-decoration:none;font-weight:700;">
                        info@apclagos.com
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /OUTER CARD -->

        <!-- POST-CARD NOTE -->
        <p style="margin:20px 0 0;font-family:${T.fontSans};font-size:11px;color:#9ca3af;text-align:center;">
          If you received this in error, simply disregard it — no action required.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
`;

/* Divider line */
const divider = `
  <tr>
    <td style="padding:0 32px;">
      <div style="height:1px;background-color:${T.border};"></div>
    </td>
  </tr>
`;

/* Stat / info row pill */
const infoPill = (icon, label, value) => `
  <tr>
    <td style="padding:8px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family:${T.fontSans};font-size:18px;line-height:1;
                     padding-right:12px;color:${T.green};">${icon}</td>
          <td>
            <span style="font-family:${T.fontSans};font-size:11px;font-weight:700;
                         text-transform:uppercase;letter-spacing:0.1em;color:${T.mutedText};">
              ${label}
            </span><br />
            <span style="font-family:${T.fontSans};font-size:14px;font-weight:700;color:${T.bodyText};">
              ${value}
            </span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
`;

/* CTA button */
const ctaButton = (href, label) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0;">
    <tr>
      <td style="border-radius:10px;background-color:${T.green};">
        <a href="${href}" target="_blank"
           style="display:inline-block;padding:14px 32px;font-family:${T.fontSans};
                  font-size:14px;font-weight:700;color:${T.white};text-decoration:none;
                  letter-spacing:0.02em;border-radius:10px;">
          ${label} &rarr;
        </a>
      </td>
    </tr>
  </table>
`;

/* ─────────────────────────────────────────────
   EMAIL SERVICE CLASS
───────────────────────────────────────────── */
class EmailService {
  constructor() {
    const required = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
    const missing = required.filter((k) => !process.env[k]);
    if (missing.length) {
      logger.warn(`⚠️  Email service: missing env vars [${missing.join(', ')}] — emails will not send.`);
    }

    this.enabled = missing.length === 0;

    const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
    const ignoreTLS = process.env.EMAIL_IGNORE_TLS === 'true';

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: !ignoreTLS },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }

  async verify() {
    if (!this.enabled) return false;
    try {
      await this.transporter.verify();
      logger.info('✅ Email transporter connected and ready.');
      return true;
    } catch (err) {
      logger.error('❌ Email transporter verification failed:');
      logger.error(`   Message : ${err.message}`);
      logger.error(`   Code    : ${err.code || 'N/A'}`);
      logger.error(`   Response: ${err.response || 'N/A'}`);
      logger.error('');
      logger.error('   Common fixes:');
      logger.error('   • Gmail: use an App Password (not your login password)');
      logger.error('     → https://myaccount.google.com/apppasswords');
      logger.error('   • Gmail: enable "2-Step Verification" first');
      logger.error('   • Wrong port: use 587 (STARTTLS) or 465 (SSL) — not 25');
      logger.error('   • EMAIL_FROM must match EMAIL_USER for Gmail');
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
      logger.error(`📧 Failed to send email → ${to}`);
      logger.error(`   Subject : ${subject}`);
      logger.error(`   Message : ${err.message || JSON.stringify(err)}`);
      logger.error(`   Code    : ${err.code || 'N/A'}`);
      logger.error(`   Response: ${err.response || 'N/A'}`);
      return false;
    }
  }

  /* ── WELCOME EMAIL ──────────────────────── */
  async sendWelcome(member) {
    const html = emailWrapper(`

      <!-- GREETING -->
      <tr>
        <td style="padding:40px 32px 28px;">
          <p style="margin:0 0 6px;font-family:${T.fontSans};font-size:11px;font-weight:700;
                     letter-spacing:0.14em;text-transform:uppercase;color:${T.green};">
            Registration Confirmed
          </p>
          <h2 style="margin:0 0 16px;font-family:${T.font};font-size:28px;font-weight:700;
                     color:${T.black};letter-spacing:-0.02em;line-height:1.2;">
            Welcome to the Movement,<br />${member.firstName}.
          </h2>
          <p style="margin:0;font-family:${T.fontSans};font-size:15px;line-height:1.75;color:${T.bodyText};">
            Your registration with the All Progressives Congress, Lagos State Chapter
            has been received. A party representative from your local government will
            be reaching out to you shortly.
          </p>
        </td>
      </tr>

      ${divider}

      <!-- REGISTRATION DETAILS BLOCK -->
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 16px;font-family:${T.fontSans};font-size:11px;font-weight:800;
                     letter-spacing:0.14em;text-transform:uppercase;color:${T.mutedText};">
            Your Registration Details
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
            style="background-color:#f0fdf4;border:1px solid ${T.greenMid};
                   border-radius:12px;padding:20px 24px;">
            <tr><td>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${infoPill('📍', 'LGA', member.lga)}
                ${member.ward ? infoPill('🏘️', 'Ward', member.ward) : ''}
                ${member.interests?.length ? infoPill('🤝', 'Areas of Interest', member.interests.join(' · ')) : ''}
                ${infoPill('📋', 'Status', 'Registered — Pending Verification')}
              </table>
            </td></tr>
          </table>
        </td>
      </tr>

      ${divider}

      <!-- WHAT HAPPENS NEXT -->
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 16px;font-family:${T.fontSans};font-size:11px;font-weight:800;
                     letter-spacing:0.14em;text-transform:uppercase;color:${T.mutedText};">
            What Happens Next
          </p>

          <!-- Step 1 -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
            style="margin-bottom:14px;">
            <tr>
              <td width="36" valign="top">
                <div style="width:28px;height:28px;border-radius:50%;background-color:${T.black};
                            text-align:center;line-height:28px;
                            font-family:${T.fontSans};font-size:12px;font-weight:900;color:${T.white};">
                  1
                </div>
              </td>
              <td valign="top" style="padding-top:4px;">
                <p style="margin:0;font-family:${T.fontSans};font-size:14px;font-weight:700;color:${T.black};">
                  LGA Coordinator Review
                </p>
                <p style="margin:4px 0 0;font-family:${T.fontSans};font-size:13px;color:${T.mutedText};line-height:1.6;">
                  Your details are reviewed by your ${member.lga} LGA coordinator.
                </p>
              </td>
            </tr>
          </table>

          <!-- Step 2 -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
            style="margin-bottom:14px;">
            <tr>
              <td width="36" valign="top">
                <div style="width:28px;height:28px;border-radius:50%;background-color:${T.black};
                            text-align:center;line-height:28px;
                            font-family:${T.fontSans};font-size:12px;font-weight:900;color:${T.white};">
                  2
                </div>
              </td>
              <td valign="top" style="padding-top:4px;">
                <p style="margin:0;font-family:${T.fontSans};font-size:14px;font-weight:700;color:${T.black};">
                  Personal Outreach
                </p>
                <p style="margin:4px 0 0;font-family:${T.fontSans};font-size:13px;color:${T.mutedText};line-height:1.6;">
                  A representative will contact you via phone or email to verify your membership.
                </p>
              </td>
            </tr>
          </table>

          <!-- Step 3 -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="36" valign="top">
                <div style="width:28px;height:28px;border-radius:50%;background-color:${T.green};
                            text-align:center;line-height:28px;
                            font-family:${T.fontSans};font-size:12px;font-weight:900;color:${T.white};">
                  3
                </div>
              </td>
              <td valign="top" style="padding-top:4px;">
                <p style="margin:0;font-family:${T.fontSans};font-size:14px;font-weight:700;color:${T.black};">
                  Full Membership Activation
                </p>
                <p style="margin:4px 0 0;font-family:${T.fontSans};font-size:13px;color:${T.mutedText};line-height:1.6;">
                  Once verified, your membership is activated and you join the Lagos APC family.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      ${divider}

      <!-- CLOSING MESSAGE -->
      <tr>
        <td style="padding:28px 32px 36px;">
          <p style="margin:0 0 20px;font-family:${T.fontSans};font-size:15px;line-height:1.75;color:${T.bodyText};">
            Together, we are committed to building a greater Lagos — one ward,
            one LGA, one community at a time. We are proud to have you with us.
          </p>
          <p style="margin:0;font-family:${T.font};font-size:17px;font-weight:700;
                     color:${T.black};font-style:italic;">
            For a Greater Lagos,
          </p>
          <p style="margin:6px 0 0;font-family:${T.fontSans};font-size:13px;font-weight:700;
                     color:${T.green};letter-spacing:0.04em;">
            Lagos State APC Secretariat
          </p>
        </td>
      </tr>

    `);

    return this.send({
      to: member.email,
      subject: `Welcome to Lagos APC, ${member.firstName} — Registration Confirmed`,
      html,
    });
  }

  /* ── PASSWORD RESET EMAIL ───────────────── */
  async sendPasswordReset(admin, resetURL) {
    const html = emailWrapper(`

      <!-- ICON + HEADING -->
      <tr>
        <td style="padding:40px 32px 28px;">
          <!-- lock icon block -->
          <div style="display:inline-block;width:52px;height:52px;border-radius:14px;
                      background-color:#f0fdf4;border:1px solid ${T.greenMid};
                      text-align:center;line-height:52px;font-size:24px;margin-bottom:20px;">
            🔐
          </div>
          <p style="margin:0 0 6px;font-family:${T.fontSans};font-size:11px;font-weight:700;
                     letter-spacing:0.14em;text-transform:uppercase;color:${T.green};">
            Security Notice
          </p>
          <h2 style="margin:0 0 16px;font-family:${T.font};font-size:28px;font-weight:700;
                     color:${T.black};letter-spacing:-0.02em;line-height:1.2;">
            Password Reset<br />Requested
          </h2>
          <p style="margin:0;font-family:${T.fontSans};font-size:15px;line-height:1.75;color:${T.bodyText};">
            Hi <strong>${admin.name}</strong>, we received a request to reset the password
            for your Lagos APC admin account. Click the button below to set a new password.
          </p>
        </td>
      </tr>

      ${divider}

      <!-- CTA SECTION -->
      <tr>
        <td style="padding:32px;">
          <!-- expiry warning box -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
            style="background-color:#fefce8;border:1px solid #fde047;
                   border-radius:10px;padding:14px 18px;margin-bottom:28px;">
            <tr>
              <td style="font-family:${T.fontSans};font-size:13px;color:#854d0e;line-height:1.6;">
                ⏱&nbsp; <strong>This link expires in 10 minutes.</strong>
                If you don't use it in time, you'll need to request another reset.
              </td>
            </tr>
          </table>

          ${ctaButton(resetURL, 'Reset My Password')}

          <p style="margin:20px 0 0;font-family:${T.fontSans};font-size:12px;color:${T.mutedText};line-height:1.6;">
            If the button above doesn't work, copy and paste this URL into your browser:
          </p>
          <p style="margin:8px 0 0;font-family:'Courier New',Courier,monospace;font-size:12px;
                     color:${T.green};word-break:break-all;line-height:1.6;">
            ${resetURL}
          </p>
        </td>
      </tr>

      ${divider}

      <!-- SAFETY NOTICE -->
      <tr>
        <td style="padding:28px 32px 36px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
            style="background-color:#fef2f2;border:1px solid #fecaca;
                   border-radius:10px;padding:16px 18px;">
            <tr>
              <td style="font-family:${T.fontSans};font-size:13px;color:#991b1b;line-height:1.7;">
                🛡&nbsp; <strong>Didn't request this?</strong><br />
                If you did not initiate this password reset, your account may be at risk.
                Please ignore this email — your password will not change — and consider
                contacting your system administrator immediately.
              </td>
            </tr>
          </table>
        </td>
      </tr>

    `);

    return this.send({
      to: admin.email,
      subject: 'Password Reset Request — Lagos APC Admin Portal',
      html,
    });
  }
}

export default new EmailService();
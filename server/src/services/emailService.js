// import nodemailer from 'nodemailer';
// import logger from '../utils/logger.js';

// /* ─────────────────────────────────────────────
//    SHARED STYLE TOKENS
//    (inline CSS only — email clients strip <style>)
// ───────────────────────────────────────────── */
// const T = {
//   green:     '#16a34a',
//   greenDark: '#14532d',
//   greenLight:'#dcfce7',
//   greenMid:  '#bbf7d0',
//   black:     '#0a0f0c',
//   charcoal:  '#1a2e20',
//   bodyText:  '#374151',
//   mutedText: '#6b7280',
//   border:    '#e5e7eb',
//   bg:        '#f0f4f1',
//   white:     '#ffffff',
//   gold:      '#b45309',
//   goldLight: '#fef9c3',
//   goldBorder:'#fde047',
//   red:       '#991b1b',
//   redLight:  '#fef2f2',
//   redBorder: '#fecaca',
//   font:      "Georgia, 'Times New Roman', serif",
//   fontSans:  "Arial, Helvetica, sans-serif",
// };

// /* ─────────────────────────────────────────────
//    SHARED LAYOUT WRAPPERS
// ───────────────────────────────────────────── */
// const emailWrapper = (content) => `
// <!DOCTYPE html>
// <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//   <title>Lagos APC</title>
//   <!--[if mso]>
//   <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
//   <![endif]-->
// </head>
// <body style="margin:0;padding:0;background-color:${T.bg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
//   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//     style="background-color:${T.bg};padding:40px 16px;">
//     <tr>
//       <td align="center">

//         <!-- OUTER CARD -->
//         <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//           style="max-width:580px;background-color:${T.white};border-radius:16px;overflow:hidden;
//                  box-shadow:0 4px 24px rgba(0,0,0,0.10);border:1px solid ${T.border};">

//           <!-- HEADER BAND -->
//           <tr>
//             <td style="background-color:${T.black};padding:0;">
//               <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                   <!-- green left accent -->
//                   <td style="width:6px;background-color:${T.green};">&nbsp;</td>
//                   <td style="padding:28px 32px;">
//                     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
//                       <tr>
//                         <td>
//                           <p style="margin:0;font-family:${T.fontSans};font-size:10px;font-weight:700;
//                                     letter-spacing:0.18em;text-transform:uppercase;color:${T.green};">
//                             All Progressives Congress
//                           </p>
//                           <h1 style="margin:6px 0 0;font-family:${T.font};font-size:26px;font-weight:700;
//                                      color:${T.white};letter-spacing:-0.01em;line-height:1.1;">
//                             Lagos State Chapter
//                           </h1>
//                         </td>
//                         <td width="56" align="right" valign="middle">
//                           <!-- APC monogram badge -->
//                           <div style="width:48px;height:48px;border-radius:12px;
//                                       background-color:${T.green};
//                                       text-align:center;line-height:48px;
//                                       font-family:${T.fontSans};font-size:12px;font-weight:900;
//                                       color:${T.black};letter-spacing:0.04em;">
//                             APC
//                           </div>
//                         </td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- BODY -->
//           ${content}

//           <!-- FOOTER -->
//           <tr>
//             <td style="background-color:#f9fafb;border-top:1px solid ${T.border};padding:24px 32px;">
//               <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                   <td>
//                     <p style="margin:0 0 6px;font-family:${T.fontSans};font-size:11px;
//                                color:${T.mutedText};line-height:1.6;">
//                       © ${new Date().getFullYear()} Lagos APC · All Progressives Congress, Lagos State Chapter.<br />
//                       This message was sent to you because you interacted with our registration system.
//                     </p>
//                     <p style="margin:0;font-family:${T.fontSans};font-size:11px;color:#9ca3af;">
//                       Questions? Contact&nbsp;
//                       <a href="mailto:info@apclagos.com"
//                          style="color:${T.green};text-decoration:none;font-weight:700;">
//                         info@apclagos.com
//                       </a>
//                     </p>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//         </table>
//         <!-- /OUTER CARD -->

//         <!-- POST-CARD NOTE -->
//         <p style="margin:20px 0 0;font-family:${T.fontSans};font-size:11px;color:#9ca3af;text-align:center;">
//           If you received this in error, simply disregard it — no action required.
//         </p>

//       </td>
//     </tr>
//   </table>
// </body>
// </html>
// `;

// /* Divider line */
// const divider = `
//   <tr>
//     <td style="padding:0 32px;">
//       <div style="height:1px;background-color:${T.border};"></div>
//     </td>
//   </tr>
// `;

// /* Stat / info row pill */
// const infoPill = (icon, label, value) => `
//   <tr>
//     <td style="padding:8px 0;">
//       <table role="presentation" cellpadding="0" cellspacing="0" border="0">
//         <tr>
//           <td style="font-family:${T.fontSans};font-size:18px;line-height:1;
//                      padding-right:12px;color:${T.green};">${icon}</td>
//           <td>
//             <span style="font-family:${T.fontSans};font-size:11px;font-weight:700;
//                          text-transform:uppercase;letter-spacing:0.1em;color:${T.mutedText};">
//               ${label}
//             </span><br />
//             <span style="font-family:${T.fontSans};font-size:14px;font-weight:700;color:${T.bodyText};">
//               ${value}
//             </span>
//           </td>
//         </tr>
//       </table>
//     </td>
//   </tr>
// `;

// /* CTA button */
// const ctaButton = (href, label) => `
//   <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0;">
//     <tr>
//       <td style="border-radius:10px;background-color:${T.green};">
//         <a href="${href}" target="_blank"
//            style="display:inline-block;padding:14px 32px;font-family:${T.fontSans};
//                   font-size:14px;font-weight:700;color:${T.white};text-decoration:none;
//                   letter-spacing:0.02em;border-radius:10px;">
//           ${label} &rarr;
//         </a>
//       </td>
//     </tr>
//   </table>
// `;

// /* ─────────────────────────────────────────────
//    APPOINTMENT HELPERS
//    (used only by the 3 appointment methods below)
// ───────────────────────────────────────────── */

// /** Renders a two-column label/value detail row inside a table */
// const apptDetailRow = (icon, label, value) =>
//   value
//     ? `<tr>
//         <td style="padding:9px 0;border-bottom:1px solid ${T.border};vertical-align:top;width:44px;">
//           <span style="font-size:16px;">${icon}</span>
//         </td>
//         <td style="padding:9px 0;border-bottom:1px solid ${T.border};vertical-align:top;width:130px;">
//           <span style="font-family:${T.fontSans};font-size:11px;font-weight:700;
//                        text-transform:uppercase;letter-spacing:0.08em;color:${T.mutedText};">
//             ${label}
//           </span>
//         </td>
//         <td style="padding:9px 0;border-bottom:1px solid ${T.border};vertical-align:top;">
//           <span style="font-family:${T.fontSans};font-size:13px;font-weight:700;color:${T.bodyText};">
//             ${value}
//           </span>
//         </td>
//        </tr>`
//     : '';

// /** Appointment summary block — shared by all 3 appointment emails */
// const apptSummaryBlock = (appt) => `
//   <tr>
//     <td style="padding:28px 32px;">
//       <p style="margin:0 0 14px;font-family:${T.fontSans};font-size:11px;font-weight:800;
//                  letter-spacing:0.14em;text-transform:uppercase;color:${T.mutedText};">
//         Appointment Details
//       </p>
//       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//         style="background-color:#f0fdf4;border:1px solid ${T.greenMid};border-radius:12px;padding:16px 20px;">
//         <tr><td>
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
//             ${apptDetailRow('🔖', 'Reference',  `#${appt._id.toString().slice(-6).toUpperCase()}`)}
//             ${apptDetailRow('📋', 'Purpose',    appt.purpose)}
//             ${appt.preferredDate ? apptDetailRow('📅', 'Date',  appt.preferredDate) : ''}
//             ${appt.preferredTime ? apptDetailRow('🕐', 'Time',  appt.preferredTime) : ''}
//             ${appt.organization  ? apptDetailRow('🏢', 'Organisation', appt.organization) : ''}
//           </table>
//         </td></tr>
//       </table>
//     </td>
//   </tr>
// `;

// /* ─────────────────────────────────────────────
//    EMAIL SERVICE CLASS
// ───────────────────────────────────────────── */
// class EmailService {
//   constructor() {
//     const required = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
//     const missing = required.filter((k) => !process.env[k]);
//     if (missing.length) {
//       logger.warn(`⚠️  Email service: missing env vars [${missing.join(', ')}] — emails will not send.`);
//     }

//     this.enabled = missing.length === 0;

//     const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
//     const ignoreTLS = process.env.EMAIL_IGNORE_TLS === 'true';

//     this.transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port,
//       secure: port === 465,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: { rejectUnauthorized: !ignoreTLS },
//       connectionTimeout: 10_000,
//       greetingTimeout:   10_000,
//       socketTimeout:     15_000,
//     });
//   }

//   async verify() {
//     if (!this.enabled) return false;
//     try {
//       await this.transporter.verify();
//       logger.info('✅ Email transporter connected and ready.');
//       return true;
//     } catch (err) {
//       logger.error('❌ Email transporter verification failed:');
//       logger.error(`   Message : ${err.message}`);
//       logger.error(`   Code    : ${err.code || 'N/A'}`);
//       logger.error(`   Response: ${err.response || 'N/A'}`);
//       logger.error('');
//       logger.error('   Common fixes:');
//       logger.error('   • Gmail: use an App Password (not your login password)');
//       logger.error('     → https://myaccount.google.com/apppasswords');
//       logger.error('   • Gmail: enable "2-Step Verification" first');
//       logger.error('   • Wrong port: use 587 (STARTTLS) or 465 (SSL) — not 25');
//       logger.error('   • EMAIL_FROM must match EMAIL_USER for Gmail');
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
//       logger.error(`📧 Failed to send email → ${to}`);
//       logger.error(`   Subject : ${subject}`);
//       logger.error(`   Message : ${err.message || JSON.stringify(err)}`);
//       logger.error(`   Code    : ${err.code || 'N/A'}`);
//       logger.error(`   Response: ${err.response || 'N/A'}`);
//       return false;
//     }
//   }

//   /* ── WELCOME EMAIL ──────────────────────── */
//   async sendWelcome(member) {
//     const html = emailWrapper(`

//       <!-- GREETING -->
//       <tr>
//         <td style="padding:40px 32px 28px;">
//           <p style="margin:0 0 6px;font-family:${T.fontSans};font-size:11px;font-weight:700;
//                      letter-spacing:0.14em;text-transform:uppercase;color:${T.green};">
//             Registration Confirmed
//           </p>
//           <h2 style="margin:0 0 16px;font-family:${T.font};font-size:28px;font-weight:700;
//                      color:${T.black};letter-spacing:-0.02em;line-height:1.2;">
//             Welcome to the Movement,<br />${member.firstName}.
//           </h2>
//           <p style="margin:0;font-family:${T.fontSans};font-size:15px;line-height:1.75;color:${T.bodyText};">
//             Your registration with the All Progressives Congress, Lagos State Chapter
//             has been received. A party representative from your local government will
//             be reaching out to you shortly.
//           </p>
//         </td>
//       </tr>

//       ${divider}

//       <!-- REGISTRATION DETAILS BLOCK -->
//       <tr>
//         <td style="padding:28px 32px;">
//           <p style="margin:0 0 16px;font-family:${T.fontSans};font-size:11px;font-weight:800;
//                      letter-spacing:0.14em;text-transform:uppercase;color:${T.mutedText};">
//             Your Registration Details
//           </p>
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//             style="background-color:#f0fdf4;border:1px solid ${T.greenMid};
//                    border-radius:12px;padding:20px 24px;">
//             <tr><td>
//               <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
//                 ${infoPill('📍', 'LGA', member.lga)}
//                 ${member.ward ? infoPill('🏘️', 'Ward', member.ward) : ''}
//                 ${member.interests?.length ? infoPill('🤝', 'Areas of Interest', member.interests.join(' · ')) : ''}
//                 ${infoPill('📋', 'Status', 'Registered — Pending Verification')}
//               </table>
//             </td></tr>
//           </table>
//         </td>
//       </tr>

//       ${divider}

//       <!-- WHAT HAPPENS NEXT -->
//       <tr>
//         <td style="padding:28px 32px;">
//           <p style="margin:0 0 16px;font-family:${T.fontSans};font-size:11px;font-weight:800;
//                      letter-spacing:0.14em;text-transform:uppercase;color:${T.mutedText};">
//             What Happens Next
//           </p>

//           <!-- Step 1 -->
//           <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
//             style="margin-bottom:14px;">
//             <tr>
//               <td width="36" valign="top">
//                 <div style="width:28px;height:28px;border-radius:50%;background-color:${T.black};
//                             text-align:center;line-height:28px;
//                             font-family:${T.fontSans};font-size:12px;font-weight:900;color:${T.white};">
//                   1
//                 </div>
//               </td>
//               <td valign="top" style="padding-top:4px;">
//                 <p style="margin:0;font-family:${T.fontSans};font-size:14px;font-weight:700;color:${T.black};">
//                   LGA Coordinator Review
//                 </p>
//                 <p style="margin:4px 0 0;font-family:${T.fontSans};font-size:13px;color:${T.mutedText};line-height:1.6;">
//                   Your details are reviewed by your ${member.lga} LGA coordinator.
//                 </p>
//               </td>
//             </tr>
//           </table>

//           <!-- Step 2 -->
//           <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
//             style="margin-bottom:14px;">
//             <tr>
//               <td width="36" valign="top">
//                 <div style="width:28px;height:28px;border-radius:50%;background-color:${T.black};
//                             text-align:center;line-height:28px;
//                             font-family:${T.fontSans};font-size:12px;font-weight:900;color:${T.white};">
//                   2
//                 </div>
//               </td>
//               <td valign="top" style="padding-top:4px;">
//                 <p style="margin:0;font-family:${T.fontSans};font-size:14px;font-weight:700;color:${T.black};">
//                   Personal Outreach
//                 </p>
//                 <p style="margin:4px 0 0;font-family:${T.fontSans};font-size:13px;color:${T.mutedText};line-height:1.6;">
//                   A representative will contact you via phone or email to verify your membership.
//                 </p>
//               </td>
//             </tr>
//           </table>

//           <!-- Step 3 -->
//           <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
//             <tr>
//               <td width="36" valign="top">
//                 <div style="width:28px;height:28px;border-radius:50%;background-color:${T.green};
//                             text-align:center;line-height:28px;
//                             font-family:${T.fontSans};font-size:12px;font-weight:900;color:${T.white};">
//                   3
//                 </div>
//               </td>
//               <td valign="top" style="padding-top:4px;">
//                 <p style="margin:0;font-family:${T.fontSans};font-size:14px;font-weight:700;color:${T.black};">
//                   Full Membership Activation
//                 </p>
//                 <p style="margin:4px 0 0;font-family:${T.fontSans};font-size:13px;color:${T.mutedText};line-height:1.6;">
//                   Once verified, your membership is activated and you join the Lagos APC family.
//                 </p>
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>

//       ${divider}

//       <!-- CLOSING MESSAGE -->
//       <tr>
//         <td style="padding:28px 32px 36px;">
//           <p style="margin:0 0 20px;font-family:${T.fontSans};font-size:15px;line-height:1.75;color:${T.bodyText};">
//             Together, we are committed to building a greater Lagos — one ward,
//             one LGA, one community at a time. We are proud to have you with us.
//           </p>
//           <p style="margin:0;font-family:${T.font};font-size:17px;font-weight:700;
//                      color:${T.black};font-style:italic;">
//             For a Greater Lagos,
//           </p>
//           <p style="margin:6px 0 0;font-family:${T.fontSans};font-size:13px;font-weight:700;
//                      color:${T.green};letter-spacing:0.04em;">
//             Lagos State APC Secretariat
//           </p>
//         </td>
//       </tr>

//     `);

//     return this.send({
//       to: member.email,
//       subject: `Welcome to Lagos APC, ${member.firstName} — Registration Confirmed`,
//       html,
//     });
//   }

//   /* ── PASSWORD RESET EMAIL ───────────────── */
//   async sendPasswordReset(admin, resetURL) {
//     const html = emailWrapper(`

//       <!-- ICON + HEADING -->
//       <tr>
//         <td style="padding:40px 32px 28px;">
//           <!-- lock icon block -->
//           <div style="display:inline-block;width:52px;height:52px;border-radius:14px;
//                       background-color:#f0fdf4;border:1px solid ${T.greenMid};
//                       text-align:center;line-height:52px;font-size:24px;margin-bottom:20px;">
//             🔐
//           </div>
//           <p style="margin:0 0 6px;font-family:${T.fontSans};font-size:11px;font-weight:700;
//                      letter-spacing:0.14em;text-transform:uppercase;color:${T.green};">
//             Security Notice
//           </p>
//           <h2 style="margin:0 0 16px;font-family:${T.font};font-size:28px;font-weight:700;
//                      color:${T.black};letter-spacing:-0.02em;line-height:1.2;">
//             Password Reset<br />Requested
//           </h2>
//           <p style="margin:0;font-family:${T.fontSans};font-size:15px;line-height:1.75;color:${T.bodyText};">
//             Hi <strong>${admin.name}</strong>, we received a request to reset the password
//             for your Lagos APC admin account. Click the button below to set a new password.
//           </p>
//         </td>
//       </tr>

//       ${divider}

//       <!-- CTA SECTION -->
//       <tr>
//         <td style="padding:32px;">
//           <!-- expiry warning box -->
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//             style="background-color:#fefce8;border:1px solid #fde047;
//                    border-radius:10px;padding:14px 18px;margin-bottom:28px;">
//             <tr>
//               <td style="font-family:${T.fontSans};font-size:13px;color:#854d0e;line-height:1.6;">
//                 ⏱&nbsp; <strong>This link expires in 10 minutes.</strong>
//                 If you don't use it in time, you'll need to request another reset.
//               </td>
//             </tr>
//           </table>

//           ${ctaButton(resetURL, 'Reset My Password')}

//           <p style="margin:20px 0 0;font-family:${T.fontSans};font-size:12px;color:${T.mutedText};line-height:1.6;">
//             If the button above doesn't work, copy and paste this URL into your browser:
//           </p>
//           <p style="margin:8px 0 0;font-family:'Courier New',Courier,monospace;font-size:12px;
//                      color:${T.green};word-break:break-all;line-height:1.6;">
//             ${resetURL}
//           </p>
//         </td>
//       </tr>

//       ${divider}

//       <!-- SAFETY NOTICE -->
//       <tr>
//         <td style="padding:28px 32px 36px;">
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//             style="background-color:#fef2f2;border:1px solid #fecaca;
//                    border-radius:10px;padding:16px 18px;">
//             <tr>
//               <td style="font-family:${T.fontSans};font-size:13px;color:#991b1b;line-height:1.7;">
//                 🛡&nbsp; <strong>Didn't request this?</strong><br />
//                 If you did not initiate this password reset, your account may be at risk.
//                 Please ignore this email — your password will not change — and consider
//                 contacting your system administrator immediately.
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>

//     `);

//     return this.send({
//       to: admin.email,
//       subject: 'Password Reset Request — Lagos APC Admin Portal',
//       html,
//     });
//   }

//   /* ── APPOINTMENT: SUBMISSION CONFIRMATION ─────────────────────────────────
//      Sent immediately when a public user submits the appointment form.
//      Silent if no email was provided (email is optional on the form).
//   ─────────────────────────────────────────────────────────────────────────── */
//   async sendAppointmentConfirmation(appt) {
//     if (!appt.email) return false;

//     const ref = appt._id.toString().slice(-6).toUpperCase();

//     const html = emailWrapper(`

//       <!-- HEADING -->
//       <tr>
//         <td style="padding:40px 32px 28px;">
//           <p style="margin:0 0 6px;font-family:${T.fontSans};font-size:11px;font-weight:700;
//                      letter-spacing:0.14em;text-transform:uppercase;color:${T.green};">
//             Request Received
//           </p>
//           <h2 style="margin:0 0 16px;font-family:${T.font};font-size:28px;font-weight:700;
//                      color:${T.black};letter-spacing:-0.02em;line-height:1.2;">
//             Your appointment<br />request is under review.
//           </h2>
//           <p style="margin:0;font-family:${T.fontSans};font-size:15px;line-height:1.75;color:${T.bodyText};">
//             Dear <strong>${appt.fullName}</strong>, thank you for reaching out to the
//             Chairman's office. Your request has been logged and is currently awaiting review.
//             You will be contacted within <strong>48–72 hours</strong> to confirm.
//           </p>
//         </td>
//       </tr>

//       ${divider}

//       ${apptSummaryBlock(appt)}

//       ${divider}

//       <!-- WHAT HAPPENS NEXT -->
//       <tr>
//         <td style="padding:28px 32px;">
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//             style="background-color:#fefce8;border:1px solid ${T.goldBorder};
//                    border-radius:10px;padding:16px 18px;">
//             <tr>
//               <td style="font-family:${T.fontSans};font-size:13px;color:#854d0e;line-height:1.7;">
//                 ⏳&nbsp; <strong>What happens next?</strong><br />
//                 Our office will review your request and reach out via phone or email
//                 to confirm your preferred date and time.
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>

//       ${divider}

//       <!-- CLOSING -->
//       <tr>
//         <td style="padding:28px 32px 36px;">
//           <p style="margin:0;font-family:${T.font};font-size:17px;font-weight:700;
//                      color:${T.black};font-style:italic;">
//             For a Greater Lagos,
//           </p>
//           <p style="margin:6px 0 0;font-family:${T.fontSans};font-size:13px;font-weight:700;
//                      color:${T.green};letter-spacing:0.04em;">
//             Office of the State Chairman — Lagos APC
//           </p>
//         </td>
//       </tr>

//     `);

//     return this.send({
//       to: appt.email,
//       subject: `Appointment Request Received — Ref #${ref}`,
//       html,
//     });
//   }

//   /* ── APPOINTMENT: APPROVED ────────────────────────────────────────────────
//      Sent when an admin approves the appointment request.
//   ─────────────────────────────────────────────────────────────────────────── */
//   async sendAppointmentApproved(appt) {
//     if (!appt.email) return false;

//     const ref = appt._id.toString().slice(-6).toUpperCase();

//     const html = emailWrapper(`

//       <!-- HEADING -->
//       <tr>
//         <td style="padding:40px 32px 28px;">
//           <!-- green check badge -->
//           <div style="display:inline-block;width:52px;height:52px;border-radius:14px;
//                       background-color:#f0fdf4;border:1px solid ${T.greenMid};
//                       text-align:center;line-height:52px;font-size:26px;margin-bottom:20px;">
//             ✅
//           </div>
//           <p style="margin:0 0 6px;font-family:${T.fontSans};font-size:11px;font-weight:700;
//                      letter-spacing:0.14em;text-transform:uppercase;color:${T.green};">
//             Appointment Confirmed
//           </p>
//           <h2 style="margin:0 0 16px;font-family:${T.font};font-size:28px;font-weight:700;
//                      color:${T.black};letter-spacing:-0.02em;line-height:1.2;">
//             Your appointment<br />has been approved.
//           </h2>
//           <p style="margin:0;font-family:${T.fontSans};font-size:15px;line-height:1.75;color:${T.bodyText};">
//             Dear <strong>${appt.fullName}</strong>, we are pleased to inform you that your
//             appointment request has been <strong style="color:${T.green};">approved</strong>
//             by the Chairman's office. Please arrive at least
//             <strong>15 minutes early</strong> on your scheduled date.
//           </p>
//         </td>
//       </tr>

//       ${divider}

//       ${apptSummaryBlock(appt)}

//       ${divider}

//       ${appt.adminNote ? `
//       <!-- OFFICE NOTE -->
//       <tr>
//         <td style="padding:28px 32px;">
//           <p style="margin:0 0 10px;font-family:${T.fontSans};font-size:11px;font-weight:800;
//                      letter-spacing:0.14em;text-transform:uppercase;color:${T.mutedText};">
//             Note from the Office
//           </p>
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//             style="background-color:#f0fdf4;border:1px solid ${T.greenMid};
//                    border-radius:10px;padding:16px 18px;">
//             <tr>
//               <td style="font-family:${T.fontSans};font-size:14px;color:${T.bodyText};line-height:1.7;">
//                 💬&nbsp; ${appt.adminNote}
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//       ${divider}
//       ` : ''}

//       <!-- LOCATION REMINDER -->
//       <tr>
//         <td style="padding:28px 32px 36px;">
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//             style="background-color:#f9fafb;border:1px solid ${T.border};
//                    border-radius:10px;padding:16px 18px;margin-bottom:28px;">
//             <tr>
//               <td style="font-family:${T.fontSans};font-size:13px;color:${T.bodyText};line-height:1.7;">
//                 📍&nbsp; <strong>APC Lagos State Secretariat</strong><br />
//                 If you need to reschedule, please contact our office at your earliest convenience.
//               </td>
//             </tr>
//           </table>
//           <p style="margin:0;font-family:${T.font};font-size:17px;font-weight:700;
//                      color:${T.black};font-style:italic;">
//             For a Greater Lagos,
//           </p>
//           <p style="margin:6px 0 0;font-family:${T.fontSans};font-size:13px;font-weight:700;
//                      color:${T.green};letter-spacing:0.04em;">
//             Office of the State Chairman — Lagos APC
//           </p>
//         </td>
//       </tr>

//     `);

//     return this.send({
//       to: appt.email,
//       subject: `✓ Appointment Approved — Ref #${ref}`,
//       html,
//     });
//   }

//   /* ── APPOINTMENT: REJECTED ────────────────────────────────────────────────
//      Sent when an admin rejects the appointment request.
//   ─────────────────────────────────────────────────────────────────────────── */
//   async sendAppointmentRejected(appt) {
//     if (!appt.email) return false;

//     const ref = appt._id.toString().slice(-6).toUpperCase();

//     const html = emailWrapper(`

//       <!-- HEADING -->
//       <tr>
//         <td style="padding:40px 32px 28px;">
//           <p style="margin:0 0 6px;font-family:${T.fontSans};font-size:11px;font-weight:700;
//                      letter-spacing:0.14em;text-transform:uppercase;color:${T.mutedText};">
//             Appointment Update
//           </p>
//           <h2 style="margin:0 0 16px;font-family:${T.font};font-size:28px;font-weight:700;
//                      color:${T.black};letter-spacing:-0.02em;line-height:1.2;">
//             We are unable to<br />accommodate your request.
//           </h2>
//           <p style="margin:0;font-family:${T.fontSans};font-size:15px;line-height:1.75;color:${T.bodyText};">
//             Dear <strong>${appt.fullName}</strong>, thank you for your patience. After careful
//             review, the Chairman's office is unable to accommodate your appointment request at
//             this time.
//           </p>
//         </td>
//       </tr>

//       ${divider}

//       ${apptSummaryBlock(appt)}

//       ${divider}

//       ${appt.adminNote ? `
//       <!-- REASON -->
//       <tr>
//         <td style="padding:28px 32px;">
//           <p style="margin:0 0 10px;font-family:${T.fontSans};font-size:11px;font-weight:800;
//                      letter-spacing:0.14em;text-transform:uppercase;color:${T.mutedText};">
//             Reason / Note
//           </p>
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//             style="background-color:${T.redLight};border:1px solid ${T.redBorder};
//                    border-radius:10px;padding:16px 18px;">
//             <tr>
//               <td style="font-family:${T.fontSans};font-size:14px;color:${T.red};line-height:1.7;">
//                 ${appt.adminNote}
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//       ${divider}
//       ` : ''}

//       <!-- RE-APPLY NOTICE -->
//       <tr>
//         <td style="padding:28px 32px 36px;">
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//             style="background-color:#f9fafb;border:1px solid ${T.border};
//                    border-radius:10px;padding:16px 18px;margin-bottom:28px;">
//             <tr>
//               <td style="font-family:${T.fontSans};font-size:13px;color:${T.bodyText};line-height:1.7;">
//                 You are welcome to submit a new request at a later date.<br />
//                 For urgent matters, please contact the APC Lagos State Secretariat directly.
//               </td>
//             </tr>
//           </table>
//           <p style="margin:0;font-family:${T.font};font-size:17px;font-weight:700;
//                      color:${T.black};font-style:italic;">
//             For a Greater Lagos,
//           </p>
//           <p style="margin:6px 0 0;font-family:${T.fontSans};font-size:13px;font-weight:700;
//                      color:${T.green};letter-spacing:0.04em;">
//             Office of the State Chairman — Lagos APC
//           </p>
//         </td>
//       </tr>

//     `);

//     return this.send({
//       to: appt.email,
//       subject: `Appointment Update — Ref #${ref}`,
//       html,
//     });
//   }
// }

// export default new EmailService();


import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
   All values in one place — change here, reflects everywhere.
═══════════════════════════════════════════════════════════════ */
const T = {
  /* Brand */
  green:       '#006B3F',   // Deep APC green
  greenHover:  '#005533',
  greenLight:  '#E8F5EE',
  greenMid:    '#B8DFC9',
  greenText:   '#004D2C',

  /* Neutrals */
  black:       '#0D0D0D',
  ink:         '#1A1A2E',
  charcoal:    '#2D3748',
  bodyText:    '#4A5568',
  mutedText:   '#718096',
  border:      '#E2E8F0',
  borderLight: '#F0F4F8',
  bg:          '#F4F7F5',   /* slight green tint */
  surface:     '#FAFBFA',
  white:       '#FFFFFF',

  /* Semantic */
  gold:        '#B7791F',
  goldLight:   '#FFFBEB',
  goldBorder:  '#F6E05E',
  amber:       '#92400E',

  red:         '#9B1C1C',
  redLight:    '#FFF5F5',
  redBorder:   '#FEB2B2',

  /* Typography */
  serif:   "Georgia, 'Times New Roman', serif",
  sans:    "'Helvetica Neue', Arial, Helvetica, sans-serif",
  mono:    "'Courier New', Courier, monospace",
};

/* ═══════════════════════════════════════════════════════════════
   STRUCTURAL PRIMITIVES
═══════════════════════════════════════════════════════════════ */

/** Full email wrapper — outer shell consistent across all templates */
const shell = (body) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Lagos APC</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${T.bg};font-family:${T.sans};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;word-break:break-word;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Lagos APC — Official Communication · All Progressives Congress, Lagos State Chapter &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${T.bg};">
    <tr>
      <td align="center" style="padding:40px 16px 48px;">

        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;background-color:${T.white};border-radius:4px;overflow:hidden;
                 box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          ${body}

        </table>
        <!--[if mso]></td></tr></table><![endif]-->

        <!-- Post-card note -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-family:${T.sans};font-size:11px;color:#A0AEC0;line-height:1.7;">
                All Progressives Congress · Lagos State Chapter · ${new Date().getFullYear()}<br/>
                Received this by mistake? Simply disregard — no action is needed.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

/* ─── Header variants ─────────────────────────────────────────────── */

/**
 * Standard green-band header with APC seal area
 * @param {string} eyebrow - small caps label above title
 * @param {string} title - main heading HTML
 */
const headerGreen = (eyebrow, title) => `
  <tr>
    <td style="background-color:${T.green};padding:0;">
      <!-- Top thin accent line -->
      <div style="height:4px;background:linear-gradient(90deg, #B7791F 0%, #F6E05E 50%, #B7791F 100%);"></div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:32px 40px 30px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <!-- APC eagle/text mark -->
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                    <tr>
                      <td style="background-color:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);
                                 border-radius:3px;padding:6px 14px;display:inline-block;">
                        <span style="font-family:${T.sans};font-size:9px;font-weight:800;letter-spacing:0.2em;
                                     text-transform:uppercase;color:rgba(255,255,255,0.9);">
                          APC · LAGOS STATE
                        </span>
                      </td>
                    </tr>
                  </table>
                  <!-- Eyebrow -->
                  <p style="margin:0 0 8px;font-family:${T.sans};font-size:10px;font-weight:700;
                             letter-spacing:0.18em;text-transform:uppercase;color:#86EFAC;">
                    ${eyebrow}
                  </p>
                  <!-- Title -->
                  <h1 style="margin:0;font-family:${T.serif};font-size:30px;font-weight:700;
                             color:${T.white};letter-spacing:-0.01em;line-height:1.15;">
                    ${title}
                  </h1>
                </td>
                <td width="60" align="right" valign="top" style="padding-top:4px;">
                  <!-- Monogram seal -->
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:52px;height:52px;border-radius:50%;
                                 border:2px solid rgba(255,255,255,0.3);
                                 background-color:rgba(255,255,255,0.1);
                                 text-align:center;vertical-align:middle;line-height:52px;">
                        <span style="font-family:${T.sans};font-size:11px;font-weight:900;
                                     color:${T.white};letter-spacing:0.04em;">APC</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;

/**
 * Dark header — used for security / system emails
 */
const headerDark = (eyebrow, title) => `
  <tr>
    <td style="background-color:${T.black};padding:0;">
      <div style="height:4px;background-color:${T.green};"></div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:32px 40px 30px;">
            <p style="margin:0 0 6px;font-family:${T.sans};font-size:9px;font-weight:700;
                       letter-spacing:0.2em;text-transform:uppercase;color:${T.green};">
              APC · LAGOS STATE
            </p>
            <p style="margin:0 0 8px;font-family:${T.sans};font-size:10px;font-weight:700;
                       letter-spacing:0.16em;text-transform:uppercase;color:#68D391;">
              ${eyebrow}
            </p>
            <h1 style="margin:0;font-family:${T.serif};font-size:28px;font-weight:700;
                       color:${T.white};letter-spacing:-0.01em;line-height:1.2;">
              ${title}
            </h1>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;

/* ─── Body section wrappers ───────────────────────────────────────── */

/** Standard padded section */
const section = (content, extraStyle = '') => `
  <tr>
    <td style="padding:36px 40px;${extraStyle}">
      ${content}
    </td>
  </tr>`;

/** Hairline divider */
const rule = `
  <tr>
    <td style="padding:0 40px;">
      <div style="height:1px;background-color:${T.border};"></div>
    </td>
  </tr>`;

/* ─── Content atoms ───────────────────────────────────────────────── */

/** Info line: icon · label · value — used in data summaries */
const infoRow = (icon, label, value) => value ? `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
    style="margin-bottom:10px;">
    <tr>
      <td width="28" valign="top" style="padding-top:1px;">
        <span style="font-size:15px;line-height:1;">${icon}</span>
      </td>
      <td valign="top">
        <span style="font-family:${T.sans};font-size:10px;font-weight:700;text-transform:uppercase;
                     letter-spacing:0.1em;color:${T.mutedText};display:block;margin-bottom:2px;">
          ${label}
        </span>
        <span style="font-family:${T.sans};font-size:14px;font-weight:600;color:${T.charcoal};">
          ${value}
        </span>
      </td>
    </tr>
  </table>` : '';

/** Callout box — colour variants: green | amber | red | neutral */
const callout = (content, variant = 'green') => {
  const map = {
    green:   { bg: T.greenLight, border: T.greenMid,    text: T.greenText },
    amber:   { bg: T.goldLight,  border: T.goldBorder,  text: T.amber     },
    red:     { bg: T.redLight,   border: T.redBorder,   text: T.red       },
    neutral: { bg: T.surface,    border: T.border,      text: T.bodyText  },
  };
  const { bg, border, text } = map[variant] || map.neutral;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:${bg};border:1px solid ${border};border-radius:4px;margin-bottom:20px;">
    <tr>
      <td style="padding:16px 20px;font-family:${T.sans};font-size:13px;color:${text};line-height:1.7;">
        ${content}
      </td>
    </tr>
  </table>`;
};

/** Primary CTA button */
const cta = (href, label) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="border-radius:3px;background-color:${T.green};">
        <a href="${href}" target="_blank"
           style="display:inline-block;padding:15px 36px;font-family:${T.sans};
                  font-size:14px;font-weight:700;color:${T.white};text-decoration:none;
                  letter-spacing:0.04em;border-radius:3px;line-height:1;">
          ${label}
        </a>
      </td>
    </tr>
  </table>`;

/** Step block for process flows */
const step = (num, title, body, isLast = false) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
    style="margin-bottom:${isLast ? '0' : '20px'};">
    <tr>
      <td width="40" valign="top">
        <div style="width:30px;height:30px;border-radius:50%;background-color:${num === 3 ? T.green : T.ink};
                    text-align:center;line-height:30px;
                    font-family:${T.sans};font-size:12px;font-weight:800;color:${T.white};">
          ${num}
        </div>
      </td>
      <td valign="top" style="padding-top:5px;">
        <p style="margin:0 0 3px;font-family:${T.sans};font-size:13px;font-weight:700;color:${T.ink};">
          ${title}
        </p>
        <p style="margin:0;font-family:${T.sans};font-size:13px;color:${T.mutedText};line-height:1.6;">
          ${body}
        </p>
      </td>
    </tr>
  </table>`;

/** Standard body paragraph */
const para = (content, style = '') =>
  `<p style="margin:0 0 16px;font-family:${T.sans};font-size:15px;line-height:1.75;color:${T.bodyText};${style}">${content}</p>`;

/** Signoff block */
const signoff = (name = 'Lagos State APC Secretariat') => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
    <tr>
      <td style="border-left:3px solid ${T.green};padding-left:14px;">
        <p style="margin:0 0 2px;font-family:${T.serif};font-size:16px;font-style:italic;
                   font-weight:700;color:${T.ink};">
          For a Greater Lagos,
        </p>
        <p style="margin:0;font-family:${T.sans};font-size:12px;font-weight:700;
                   letter-spacing:0.06em;text-transform:uppercase;color:${T.green};">
          ${name}
        </p>
      </td>
    </tr>
  </table>`;

/** Appointment detail summary card — only used in appointment emails */
const apptCard = (appt) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:${T.surface};border:1px solid ${T.border};border-radius:4px;
           border-left:4px solid ${T.green};">
    <tr>
      <td style="padding:20px 24px;">
        <p style="margin:0 0 14px;font-family:${T.sans};font-size:10px;font-weight:800;
                   letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
          Appointment Summary
        </p>
        ${infoRow('🔖', 'Reference No.', `#${appt._id.toString().slice(-6).toUpperCase()}`)}
        ${infoRow('📋', 'Purpose', appt.purpose)}
        ${appt.preferredDate ? infoRow('📅', 'Requested Date', appt.preferredDate) : ''}
        ${appt.preferredTime ? infoRow('🕐', 'Requested Time', appt.preferredTime) : ''}
        ${appt.organization  ? infoRow('🏢', 'Organisation',   appt.organization)  : ''}
      </td>
    </tr>
  </table>`;

/** Shared email footer row */
const footer = `
  <tr>
    <td style="background-color:${T.surface};border-top:1px solid ${T.border};padding:24px 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <p style="margin:0 0 4px;font-family:${T.sans};font-size:11px;color:${T.mutedText};line-height:1.6;">
              © ${new Date().getFullYear()} Lagos APC · All Progressives Congress, Lagos State Chapter.<br/>
              This email was generated by our member communications system.
            </p>
            <p style="margin:0;font-family:${T.sans};font-size:11px;color:#A0AEC0;">
              Questions? Write to&nbsp;<a href="mailto:info@apclagos.com"
                style="color:${T.green};text-decoration:none;font-weight:700;">info@apclagos.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;

/* ═══════════════════════════════════════════════════════════════
   EMAIL SERVICE CLASS
═══════════════════════════════════════════════════════════════ */
class EmailService {
  constructor() {
    const required = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
    const missing = required.filter((k) => !process.env[k]);
    if (missing.length) {
      logger.warn(`⚠️  Email service: missing env vars [${missing.join(', ')}] — emails will not send.`);
    }

    this.enabled = missing.length === 0;

    const port = parseInt(process.env.EMAIL_PORT, 10) || 587;

    this.transporter = nodemailer.createTransport({
      host:  process.env.EMAIL_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: process.env.EMAIL_IGNORE_TLS !== 'true' },
      connectionTimeout: 10_000,
      greetingTimeout:   10_000,
      socketTimeout:     15_000,
    });
  }

  async verify() {
    if (!this.enabled) return false;
    try {
      await this.transporter.verify();
      logger.info('✅ Email transporter connected and ready.');
      return true;
    } catch (err) {
      logger.error('❌ Email transporter verification failed:', err.message);
      return false;
    }
  }

  async send({ to, subject, html, text }) {
    if (!this.enabled) {
      logger.warn(`Email skipped (service not configured): "${subject}" → ${to}`);
      return false;
    }
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
      });
      logger.info(`📧 Sent → ${to} [${info.messageId}]`);
      return true;
    } catch (err) {
      logger.error(`📧 Failed → ${to} | Subject: "${subject}" | ${err.message}`);
      return false;
    }
  }

  /* ═══════════════════════════════════════════════════════
     1. WELCOME / MEMBERSHIP REGISTRATION
     Triggered: public user submits the Join form.
     Contains: personal welcome, their LGA/ward/interests,
               the 3-step verification process.
     Does NOT contain any appointment information.
  ═══════════════════════════════════════════════════════ */
  async sendWelcome(member) {
    const interests = member.interests?.length
      ? member.interests.join(' · ')
      : null;

    const html = shell(`
      ${headerGreen('Membership Registration', `Welcome to the Movement,<br/>${member.firstName}.`)}

      ${section(`
        ${para(`Your registration with the <strong>All Progressives Congress, Lagos State Chapter</strong>
          has been received and is now on file. Our team will be in touch with you shortly to
          complete the verification process.`)}
        ${para(`We are glad to have you. Together, we move Lagos forward.`, 'margin:0;')}
      `)}

      ${rule}

      <!-- Registration summary -->
      <tr>
        <td style="padding:32px 40px;">
          <p style="margin:0 0 16px;font-family:${T.sans};font-size:10px;font-weight:800;
                     letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
            Your Registration Details
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
            style="background-color:${T.surface};border:1px solid ${T.border};border-radius:4px;
                   border-left:4px solid ${T.green};">
            <tr>
              <td style="padding:20px 24px;">
                ${infoRow('📍', 'Local Government Area', member.lga)}
                ${member.ward    ? infoRow('🏘️',  'Ward',                member.ward)    : ''}
                ${interests      ? infoRow('🤝',  'Areas of Interest',   interests)      : ''}
                ${infoRow('🔄',  'Status', 'Registered — Awaiting Verification')}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      ${rule}

      <!-- What happens next -->
      <tr>
        <td style="padding:32px 40px;">
          <p style="margin:0 0 20px;font-family:${T.sans};font-size:10px;font-weight:800;
                     letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
            What Happens Next
          </p>
          ${step(1, 'LGA Coordinator Review',
            `Your details are forwarded to the ${member.lga} LGA coordinator for initial review.`)}
          ${step(2, 'Personal Verification',
            'A party representative will contact you by phone or email to confirm your information.')}
          ${step(3, 'Membership Activated',
            'Once verified, your membership is officially activated and you become part of the Lagos APC family.',
            true)}
        </td>
      </tr>

      ${rule}

      ${section(`
        ${para(`On behalf of the Lagos State Chapter, we thank you for stepping forward.
          Every member strengthens this movement and brings us closer to a greater Lagos.`)}
        ${signoff()}
      `)}

      ${footer}
    `);

    return this.send({
      to:      member.email,
      subject: `Welcome to Lagos APC, ${member.firstName} — Registration Confirmed`,
      html,
    });
  }

  /* ═══════════════════════════════════════════════════════
     2. PASSWORD RESET
     Triggered: admin requests a password reset.
  ═══════════════════════════════════════════════════════ */
  async sendPasswordReset(admin, resetURL) {
    const html = shell(`
      ${headerDark('Security Notice', 'Password Reset<br/>Request')}

      ${section(`
        ${para(`Hi <strong>${admin.name}</strong>, a password reset was requested for your
          Lagos APC admin account. If this was you, use the button below to set a new password.`)}

        ${callout(
          `<strong>⏱ &nbsp;This link expires in 10 minutes.</strong> If you miss this window,
           submit a new reset request from the login page.`,
          'amber'
        )}

        ${cta(resetURL, 'Reset My Password')}

        <p style="margin:20px 0 0;font-family:${T.sans};font-size:12px;color:${T.mutedText};line-height:1.6;">
          Button not working? Copy and paste this link into your browser:
        </p>
        <p style="margin:8px 0 0;font-family:${T.mono};font-size:11px;
                   color:${T.green};word-break:break-all;line-height:1.6;">
          ${resetURL}
        </p>
      `)}

      ${rule}

      ${section(`
        ${callout(`
          <strong>🛡 &nbsp;Did not request this?</strong><br/>
          If you did not initiate a password reset, your account may be at risk. Ignore this email —
          your password will remain unchanged. Contact your system administrator immediately if
          you suspect unauthorised access.
        `, 'red')}
      `)}

      ${footer}
    `);

    return this.send({
      to:      admin.email,
      subject: 'Password Reset Request — Lagos APC Admin Portal',
      html,
    });
  }

  /* ═══════════════════════════════════════════════════════
     3. APPOINTMENT — SUBMISSION CONFIRMATION
     Triggered: public user submits the appointment request form.
     Email is optional on the form; silently skips if absent.
  ═══════════════════════════════════════════════════════ */
  async sendAppointmentConfirmation(appt) {
    if (!appt.email) return false;

    const ref = appt._id.toString().slice(-6).toUpperCase();

    const html = shell(`
      ${headerGreen('Appointment Request', 'Your request has been<br/>received.')}

      ${section(`
        ${para(`Dear <strong>${appt.fullName}</strong>, thank you for reaching out to the
          <strong>Office of the State Chairman</strong>. Your appointment request has been
          logged and is now under review. You will be contacted within
          <strong>48 to 72 hours</strong> to confirm your preferred date and time.`)}
      `)}

      ${rule}

      <tr>
        <td style="padding:32px 40px;">
          ${apptCard(appt)}
        </td>
      </tr>

      ${rule}

      ${section(`
        ${callout(`
          <strong>⏳ &nbsp;What happens next?</strong><br/>
          Our office will review your request and contact you via phone or email to confirm
          or reschedule your preferred date. Please keep your phone accessible.
        `, 'amber')}
        ${signoff('Office of the State Chairman — Lagos APC')}
      `)}

      ${footer}
    `);

    return this.send({
      to:      appt.email,
      subject: `Appointment Request Received — Ref #${ref}`,
      html,
    });
  }

  /* ═══════════════════════════════════════════════════════
     4. APPOINTMENT — APPROVED
     Triggered: admin approves the appointment request.
  ═══════════════════════════════════════════════════════ */
  async sendAppointmentApproved(appt) {
    if (!appt.email) return false;

    const ref = appt._id.toString().slice(-6).toUpperCase();

    const html = shell(`
      ${headerGreen('Appointment Confirmed', 'Your appointment<br/>has been approved.')}

      ${section(`
        ${para(`Dear <strong>${appt.fullName}</strong>, we are pleased to confirm that your
          appointment request has been <strong style="color:${T.green};">approved</strong>
          by the Chairman's office. Please plan to arrive at least
          <strong>15 minutes before</strong> your scheduled time.`)}
      `)}

      ${rule}

      <tr>
        <td style="padding:32px 40px;">
          ${apptCard(appt)}
        </td>
      </tr>

      ${appt.adminNote ? `
      ${rule}
      <tr>
        <td style="padding:32px 40px;">
          <p style="margin:0 0 12px;font-family:${T.sans};font-size:10px;font-weight:800;
                     letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
            Note from the Office
          </p>
          ${callout(`💬 &nbsp;${appt.adminNote}`, 'green')}
        </td>
      </tr>` : ''}

      ${rule}

      ${section(`
        ${callout(`
          📍 &nbsp;<strong>APC Lagos State Secretariat</strong><br/>
          If you need to reschedule, please contact our office as early as possible so we
          can accommodate you.
        `, 'neutral')}
        ${signoff('Office of the State Chairman — Lagos APC')}
      `)}

      ${footer}
    `);

    return this.send({
      to:      appt.email,
      subject: `Appointment Confirmed ✓ — Ref #${ref}`,
      html,
    });
  }

  /* ═══════════════════════════════════════════════════════
     5. APPOINTMENT — REJECTED
     Triggered: admin rejects the appointment request.
  ═══════════════════════════════════════════════════════ */
  async sendAppointmentRejected(appt) {
    if (!appt.email) return false;

    const ref = appt._id.toString().slice(-6).toUpperCase();

    const html = shell(`
      ${headerGreen('Appointment Update', 'We are unable to accommodate<br/>your request at this time.')}

      ${section(`
        ${para(`Dear <strong>${appt.fullName}</strong>, thank you for your patience.
          After careful review, the Chairman's office is unable to accommodate your
          appointment request at this time.`)}
      `)}

      ${rule}

      <tr>
        <td style="padding:32px 40px;">
          ${apptCard(appt)}
        </td>
      </tr>

      ${appt.adminNote ? `
      ${rule}
      <tr>
        <td style="padding:32px 40px;">
          <p style="margin:0 0 12px;font-family:${T.sans};font-size:10px;font-weight:800;
                     letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
            Reason / Note
          </p>
          ${callout(appt.adminNote, 'red')}
        </td>
      </tr>` : ''}

      ${rule}

      ${section(`
        ${callout(`
          You are welcome to submit a new request at a later date. For urgent matters,
          please contact the <strong>APC Lagos State Secretariat</strong> directly.
        `, 'neutral')}
        ${signoff('Office of the State Chairman — Lagos APC')}
      `)}

      ${footer}
    `);

    return this.send({
      to:      appt.email,
      subject: `Appointment Update — Ref #${ref}`,
      html,
    });
  }
}

export default new EmailService();
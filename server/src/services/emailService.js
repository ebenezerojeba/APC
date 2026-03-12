
// import nodemailer from 'nodemailer';
// import logger from '../utils/logger.js';

// /* ═══════════════════════════════════════════════════════════════
//    DESIGN TOKENS
//    All values in one place — change here, reflects everywhere.
// ═══════════════════════════════════════════════════════════════ */
// const T = {
//   /* Brand */
//   green:       '#006B3F',   // Deep APC green
//   greenHover:  '#005533',
//   greenLight:  '#E8F5EE',
//   greenMid:    '#B8DFC9',
//   greenText:   '#004D2C',

//   /* Neutrals */
//   black:       '#0D0D0D',
//   ink:         '#1A1A2E',
//   charcoal:    '#2D3748',
//   bodyText:    '#4A5568',
//   mutedText:   '#718096',
//   border:      '#E2E8F0',
//   borderLight: '#F0F4F8',
//   bg:          '#F4F7F5',   /* slight green tint */
//   surface:     '#FAFBFA',
//   white:       '#FFFFFF',

//   /* Semantic */
//   gold:        '#B7791F',
//   goldLight:   '#FFFBEB',
//   goldBorder:  '#F6E05E',
//   amber:       '#92400E',

//   red:         '#9B1C1C',
//   redLight:    '#FFF5F5',
//   redBorder:   '#FEB2B2',

//   /* Typography */
//   serif:   "Georgia, 'Times New Roman', serif",
//   sans:    "'Helvetica Neue', Arial, Helvetica, sans-serif",
//   mono:    "'Courier New', Courier, monospace",
// };

// /* ═══════════════════════════════════════════════════════════════
//    STRUCTURAL PRIMITIVES
// ═══════════════════════════════════════════════════════════════ */

// /** Full email wrapper — outer shell consistent across all templates */
// const shell = (body) => `
// <!DOCTYPE html>
// <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//   <meta name="x-apple-disable-message-reformatting" />
//   <title>Lagos APC</title>
//   <!--[if mso]>
//   <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
//   <![endif]-->
// </head>
// <body style="margin:0;padding:0;background-color:${T.bg};font-family:${T.sans};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;word-break:break-word;">
//   <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Lagos APC — Official Communication · All Progressives Congress, Lagos State Chapter &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
//   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${T.bg};">
//     <tr>
//       <td align="center" style="padding:40px 16px 48px;">

//         <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
//         <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//           style="max-width:600px;background-color:${T.white};border-radius:4px;overflow:hidden;
//                  box-shadow:0 2px 12px rgba(0,0,0,0.08);">

//           ${body}

//         </table>
//         <!--[if mso]></td></tr></table><![endif]-->

//         <!-- Post-card note -->
//         <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
//           <tr>
//             <td style="padding:24px 0 0;text-align:center;">
//               <p style="margin:0;font-family:${T.sans};font-size:11px;color:#A0AEC0;line-height:1.7;">
//                 All Progressives Congress · Lagos State Chapter · ${new Date().getFullYear()}<br/>
//                 Received this by mistake? Simply disregard — no action is needed.
//               </p>
//             </td>
//           </tr>
//         </table>

//       </td>
//     </tr>
//   </table>
// </body>
// </html>`;

// /* ─── Header variants ─────────────────────────────────────────────── */

// /**
//  * Standard green-band header with APC seal area
//  * @param {string} eyebrow - small caps label above title
//  * @param {string} title - main heading HTML
//  */
// const headerGreen = (eyebrow, title) => `
//   <tr>
//     <td style="background-color:${T.green};padding:0;">
//       <!-- Top thin accent line -->
//       <div style="height:4px;background:linear-gradient(90deg, #B7791F 0%, #F6E05E 50%, #B7791F 100%);"></div>
//       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
//         <tr>
//           <td style="padding:32px 40px 30px;">
//             <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
//               <tr>
//                 <td>
//                   <!-- APC eagle/text mark -->
//                   <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
//                     <tr>
//                       <td style="background-color:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);
//                                  border-radius:3px;padding:6px 14px;display:inline-block;">
//                         <span style="font-family:${T.sans};font-size:9px;font-weight:800;letter-spacing:0.2em;
//                                      text-transform:uppercase;color:rgba(255,255,255,0.9);">
//                           APC · LAGOS STATE
//                         </span>
//                       </td>
//                     </tr>
//                   </table>
//                   <!-- Eyebrow -->
//                   <p style="margin:0 0 8px;font-family:${T.sans};font-size:10px;font-weight:700;
//                              letter-spacing:0.18em;text-transform:uppercase;color:#86EFAC;">
//                     ${eyebrow}
//                   </p>
//                   <!-- Title -->
//                   <h1 style="margin:0;font-family:${T.serif};font-size:30px;font-weight:700;
//                              color:${T.white};letter-spacing:-0.01em;line-height:1.15;">
//                     ${title}
//                   </h1>
//                 </td>
//                 <td width="60" align="right" valign="top" style="padding-top:4px;">
//                   <!-- Monogram seal -->
//                   <table role="presentation" cellpadding="0" cellspacing="0" border="0">
//                     <tr>
//                       <td style="width:52px;height:52px;border-radius:50%;
//                                  border:2px solid rgba(255,255,255,0.3);
//                                  background-color:rgba(255,255,255,0.1);
//                                  text-align:center;vertical-align:middle;line-height:52px;">
//                         <span style="font-family:${T.sans};font-size:11px;font-weight:900;
//                                      color:${T.white};letter-spacing:0.04em;">APC</span>
//                       </td>
//                     </tr>
//                   </table>
//                 </td>
//               </tr>
//             </table>
//           </td>
//         </tr>
//       </table>
//     </td>
//   </tr>`;

// /**
//  * Dark header — used for security / system emails
//  */
// const headerDark = (eyebrow, title) => `
//   <tr>
//     <td style="background-color:${T.black};padding:0;">
//       <div style="height:4px;background-color:${T.green};"></div>
//       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
//         <tr>
//           <td style="padding:32px 40px 30px;">
//             <p style="margin:0 0 6px;font-family:${T.sans};font-size:9px;font-weight:700;
//                        letter-spacing:0.2em;text-transform:uppercase;color:${T.green};">
//               APC · LAGOS STATE
//             </p>
//             <p style="margin:0 0 8px;font-family:${T.sans};font-size:10px;font-weight:700;
//                        letter-spacing:0.16em;text-transform:uppercase;color:#68D391;">
//               ${eyebrow}
//             </p>
//             <h1 style="margin:0;font-family:${T.serif};font-size:28px;font-weight:700;
//                        color:${T.white};letter-spacing:-0.01em;line-height:1.2;">
//               ${title}
//             </h1>
//           </td>
//         </tr>
//       </table>
//     </td>
//   </tr>`;

// /* ─── Body section wrappers ───────────────────────────────────────── */

// /** Standard padded section */
// const section = (content, extraStyle = '') => `
//   <tr>
//     <td style="padding:36px 40px;${extraStyle}">
//       ${content}
//     </td>
//   </tr>`;

// /** Hairline divider */
// const rule = `
//   <tr>
//     <td style="padding:0 40px;">
//       <div style="height:1px;background-color:${T.border};"></div>
//     </td>
//   </tr>`;

// /* ─── Content atoms ───────────────────────────────────────────────── */

// /** Info line: icon · label · value — used in data summaries */
// const infoRow = (icon, label, value) => value ? `
//   <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
//     style="margin-bottom:10px;">
//     <tr>
//       <td width="28" valign="top" style="padding-top:1px;">
//         <span style="font-size:15px;line-height:1;">${icon}</span>
//       </td>
//       <td valign="top">
//         <span style="font-family:${T.sans};font-size:10px;font-weight:700;text-transform:uppercase;
//                      letter-spacing:0.1em;color:${T.mutedText};display:block;margin-bottom:2px;">
//           ${label}
//         </span>
//         <span style="font-family:${T.sans};font-size:14px;font-weight:600;color:${T.charcoal};">
//           ${value}
//         </span>
//       </td>
//     </tr>
//   </table>` : '';

// /** Callout box — colour variants: green | amber | red | neutral */
// const callout = (content, variant = 'green') => {
//   const map = {
//     green:   { bg: T.greenLight, border: T.greenMid,    text: T.greenText },
//     amber:   { bg: T.goldLight,  border: T.goldBorder,  text: T.amber     },
//     red:     { bg: T.redLight,   border: T.redBorder,   text: T.red       },
//     neutral: { bg: T.surface,    border: T.border,      text: T.bodyText  },
//   };
//   const { bg, border, text } = map[variant] || map.neutral;
//   return `
//   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//     style="background-color:${bg};border:1px solid ${border};border-radius:4px;margin-bottom:20px;">
//     <tr>
//       <td style="padding:16px 20px;font-family:${T.sans};font-size:13px;color:${text};line-height:1.7;">
//         ${content}
//       </td>
//     </tr>
//   </table>`;
// };

// /** Primary CTA button */
// const cta = (href, label) => `
//   <table role="presentation" cellpadding="0" cellspacing="0" border="0">
//     <tr>
//       <td style="border-radius:3px;background-color:${T.green};">
//         <a href="${href}" target="_blank"
//            style="display:inline-block;padding:15px 36px;font-family:${T.sans};
//                   font-size:14px;font-weight:700;color:${T.white};text-decoration:none;
//                   letter-spacing:0.04em;border-radius:3px;line-height:1;">
//           ${label}
//         </a>
//       </td>
//     </tr>
//   </table>`;

// /** Step block for process flows */
// const step = (num, title, body, isLast = false) => `
//   <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
//     style="margin-bottom:${isLast ? '0' : '20px'};">
//     <tr>
//       <td width="40" valign="top">
//         <div style="width:30px;height:30px;border-radius:50%;background-color:${num === 3 ? T.green : T.ink};
//                     text-align:center;line-height:30px;
//                     font-family:${T.sans};font-size:12px;font-weight:800;color:${T.white};">
//           ${num}
//         </div>
//       </td>
//       <td valign="top" style="padding-top:5px;">
//         <p style="margin:0 0 3px;font-family:${T.sans};font-size:13px;font-weight:700;color:${T.ink};">
//           ${title}
//         </p>
//         <p style="margin:0;font-family:${T.sans};font-size:13px;color:${T.mutedText};line-height:1.6;">
//           ${body}
//         </p>
//       </td>
//     </tr>
//   </table>`;

// /** Standard body paragraph */
// const para = (content, style = '') =>
//   `<p style="margin:0 0 16px;font-family:${T.sans};font-size:15px;line-height:1.75;color:${T.bodyText};${style}">${content}</p>`;

// /** Signoff block */
// const signoff = (name = 'Lagos State APC Secretariat') => `
//   <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
//     <tr>
//       <td style="border-left:3px solid ${T.green};padding-left:14px;">
//         <p style="margin:0 0 2px;font-family:${T.serif};font-size:16px;font-style:italic;
//                    font-weight:700;color:${T.ink};">
//           For a Greater Lagos,
//         </p>
//         <p style="margin:0;font-family:${T.sans};font-size:12px;font-weight:700;
//                    letter-spacing:0.06em;text-transform:uppercase;color:${T.green};">
//           ${name}
//         </p>
//       </td>
//     </tr>
//   </table>`;

// /** Appointment detail summary card — only used in appointment emails */
// const apptCard = (appt) => `
//   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//     style="background-color:${T.surface};border:1px solid ${T.border};border-radius:4px;
//            border-left:4px solid ${T.green};">
//     <tr>
//       <td style="padding:20px 24px;">
//         <p style="margin:0 0 14px;font-family:${T.sans};font-size:10px;font-weight:800;
//                    letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
//           Appointment Summary
//         </p>
//         ${infoRow('🔖', 'Reference No.', `#${appt._id.toString().slice(-6).toUpperCase()}`)}
//         ${infoRow('📋', 'Purpose', appt.purpose)}
//         ${appt.preferredDate ? infoRow('📅', 'Requested Date', appt.preferredDate) : ''}
//         ${appt.preferredTime ? infoRow('🕐', 'Requested Time', appt.preferredTime) : ''}
//         ${appt.organization  ? infoRow('🏢', 'Organisation',   appt.organization)  : ''}
//       </td>
//     </tr>
//   </table>`;

// /** Shared email footer row */
// const footer = `
//   <tr>
//     <td style="background-color:${T.surface};border-top:1px solid ${T.border};padding:24px 40px;">
//       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
//         <tr>
//           <td>
//             <p style="margin:0 0 4px;font-family:${T.sans};font-size:11px;color:${T.mutedText};line-height:1.6;">
//               © ${new Date().getFullYear()} Lagos APC · All Progressives Congress, Lagos State Chapter.<br/>
//               This email was generated by our member communications system.
//             </p>
//             <p style="margin:0;font-family:${T.sans};font-size:11px;color:#A0AEC0;">
//               Questions? Write to&nbsp;<a href="mailto:info@apclagos.com"
//                 style="color:${T.green};text-decoration:none;font-weight:700;">info@apclagos.com</a>
//             </p>
//           </td>
//         </tr>
//       </table>
//     </td>
//   </tr>`;

// /* ═══════════════════════════════════════════════════════════════
//    EMAIL SERVICE CLASS
// ═══════════════════════════════════════════════════════════════ */
// class EmailService {
//   constructor() {
//     const required = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
//     const missing = required.filter((k) => !process.env[k]);
//     if (missing.length) {
//       logger.warn(`⚠️  Email service: missing env vars [${missing.join(', ')}] — emails will not send.`);
//     }

//     this.enabled = missing.length === 0;

//     const port = parseInt(process.env.EMAIL_PORT, 10) || 587;

//     this.transporter = nodemailer.createTransport({
//       host:  process.env.EMAIL_HOST,
//       port,
//       secure: port === 465,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: { rejectUnauthorized: process.env.EMAIL_IGNORE_TLS !== 'true' },
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
//       logger.error('❌ Email transporter verification failed:', err.message);
//       return false;
//     }
//   }

//   async send({ to, subject, html, text }) {
//     if (!this.enabled) {
//       logger.warn(`Email skipped (service not configured): "${subject}" → ${to}`);
//       return false;
//     }
//     try {
//       const info = await this.transporter.sendMail({
//         from: process.env.EMAIL_FROM,
//         to,
//         subject,
//         html,
//         text: text || html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
//       });
//       logger.info(`📧 Sent → ${to} [${info.messageId}]`);
//       return true;
//     } catch (err) {
//       logger.error(`📧 Failed → ${to} | Subject: "${subject}" | ${err.message}`);
//       return false;
//     }
//   }

//   /* ═══════════════════════════════════════════════════════
//      1. WELCOME / MEMBERSHIP REGISTRATION
//      Triggered: public user submits the Join form.
//      Contains: personal welcome, their LGA/ward/interests,
//                the 3-step verification process.
//      Does NOT contain any appointment information.
//   ═══════════════════════════════════════════════════════ */
//   async sendWelcome(member) {
//     const interests = member.interests?.length
//       ? member.interests.join(' · ')
//       : null;

//     const html = shell(`
//       ${headerGreen('Membership Registration', `Welcome to the Movement,<br/>${member.firstName}.`)}

//       ${section(`
//         ${para(`Your registration with the <strong>All Progressives Congress, Lagos State Chapter</strong>
//           has been received and is now on file. Our team will be in touch with you shortly to
//           complete the verification process.`)}
//         ${para(`We are glad to have you. Together, we move Lagos forward.`, 'margin:0;')}
//       `)}

//       ${rule}

//       <!-- Registration summary -->
//       <tr>
//         <td style="padding:32px 40px;">
//           <p style="margin:0 0 16px;font-family:${T.sans};font-size:10px;font-weight:800;
//                      letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
//             Your Registration Details
//           </p>
//           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
//             style="background-color:${T.surface};border:1px solid ${T.border};border-radius:4px;
//                    border-left:4px solid ${T.green};">
//             <tr>
//               <td style="padding:20px 24px;">
//                 ${infoRow('📍', 'Local Government Area', member.lga)}
//                 ${member.ward    ? infoRow('🏘️',  'Ward',                member.ward)    : ''}
//                 ${interests      ? infoRow('🤝',  'Areas of Interest',   interests)      : ''}
//                 ${infoRow('🔄',  'Status', 'Registered — Awaiting Verification')}
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>

//       ${rule}

//       <!-- What happens next -->
//       <tr>
//         <td style="padding:32px 40px;">
//           <p style="margin:0 0 20px;font-family:${T.sans};font-size:10px;font-weight:800;
//                      letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
//             What Happens Next
//           </p>
//           ${step(1, 'LGA Coordinator Review',
//             `Your details are forwarded to the ${member.lga} LGA coordinator for initial review.`)}
//           ${step(2, 'Personal Verification',
//             'A party representative will contact you by phone or email to confirm your information.')}
//           ${step(3, 'Membership Activated',
//             'Once verified, your membership is officially activated and you become part of the Lagos APC family.',
//             true)}
//         </td>
//       </tr>

//       ${rule}

//       ${section(`
//         ${para(`On behalf of the Lagos State Chapter, we thank you for stepping forward.
//           Every member strengthens this movement and brings us closer to a greater Lagos.`)}
//         ${signoff()}
//       `)}

//       ${footer}
//     `);

//     return this.send({
//       to:      member.email,
//       subject: `Welcome to Lagos APC, ${member.firstName} — Registration Confirmed`,
//       html,
//     });
//   }

//   /* ═══════════════════════════════════════════════════════
//      2. PASSWORD RESET
//      Triggered: admin requests a password reset.
//   ═══════════════════════════════════════════════════════ */
//   async sendPasswordReset(admin, resetURL) {
//     const html = shell(`
//       ${headerDark('Security Notice', 'Password Reset<br/>Request')}

//       ${section(`
//         ${para(`Hi <strong>${admin.name}</strong>, a password reset was requested for your
//           Lagos APC admin account. If this was you, use the button below to set a new password.`)}

//         ${callout(
//           `<strong>⏱ &nbsp;This link expires in 10 minutes.</strong> If you miss this window,
//            submit a new reset request from the login page.`,
//           'amber'
//         )}

//         ${cta(resetURL, 'Reset My Password')}

//         <p style="margin:20px 0 0;font-family:${T.sans};font-size:12px;color:${T.mutedText};line-height:1.6;">
//           Button not working? Copy and paste this link into your browser:
//         </p>
//         <p style="margin:8px 0 0;font-family:${T.mono};font-size:11px;
//                    color:${T.green};word-break:break-all;line-height:1.6;">
//           ${resetURL}
//         </p>
//       `)}

//       ${rule}

//       ${section(`
//         ${callout(`
//           <strong>🛡 &nbsp;Did not request this?</strong><br/>
//           If you did not initiate a password reset, your account may be at risk. Ignore this email —
//           your password will remain unchanged. Contact your system administrator immediately if
//           you suspect unauthorised access.
//         `, 'red')}
//       `)}

//       ${footer}
//     `);

//     return this.send({
//       to:      admin.email,
//       subject: 'Password Reset Request — Lagos APC Admin Portal',
//       html,
//     });
//   }

//   /* ═══════════════════════════════════════════════════════
//      3. APPOINTMENT — SUBMISSION CONFIRMATION
//      Triggered: public user submits the appointment request form.
//      Email is optional on the form; silently skips if absent.
//   ═══════════════════════════════════════════════════════ */
//   async sendAppointmentConfirmation(appt) {
//     if (!appt.email) return false;

//     const ref = appt._id.toString().slice(-6).toUpperCase();

//     const html = shell(`
//       ${headerGreen('Appointment Request', 'Your request has been<br/>received.')}

//       ${section(`
//         ${para(`Dear <strong>${appt.fullName}</strong>, thank you for reaching out to the
//           <strong>Office of the State Chairman</strong>. Your appointment request has been
//           logged and is now under review. You will be contacted within
//           <strong>48 to 72 hours</strong> to confirm your preferred date and time.`)}
//       `)}

//       ${rule}

//       <tr>
//         <td style="padding:32px 40px;">
//           ${apptCard(appt)}
//         </td>
//       </tr>

//       ${rule}

//       ${section(`
//         ${callout(`
//           <strong>⏳ &nbsp;What happens next?</strong><br/>
//           Our office will review your request and contact you via phone or email to confirm
//           or reschedule your preferred date. Please keep your phone accessible.
//         `, 'amber')}
//         ${signoff('Office of the State Chairman — Lagos APC')}
//       `)}

//       ${footer}
//     `);

//     return this.send({
//       to:      appt.email,
//       subject: `Appointment Request Received — Ref #${ref}`,
//       html,
//     });
//   }

//   /* ═══════════════════════════════════════════════════════
//      4. APPOINTMENT — APPROVED
//      Triggered: admin approves the appointment request.
//   ═══════════════════════════════════════════════════════ */
//   async sendAppointmentApproved(appt) {
//     if (!appt.email) return false;

//     const ref = appt._id.toString().slice(-6).toUpperCase();

//     const html = shell(`
//       ${headerGreen('Appointment Confirmed', 'Your appointment<br/>has been approved.')}

//       ${section(`
//         ${para(`Dear <strong>${appt.fullName}</strong>, we are pleased to confirm that your
//           appointment request has been <strong style="color:${T.green};">approved</strong>
//           by the Chairman's office. Please plan to arrive at least
//           <strong>15 minutes before</strong> your scheduled time.`)}
//       `)}

//       ${rule}

//       <tr>
//         <td style="padding:32px 40px;">
//           ${apptCard(appt)}
//         </td>
//       </tr>

//       ${appt.adminNote ? `
//       ${rule}
//       <tr>
//         <td style="padding:32px 40px;">
//           <p style="margin:0 0 12px;font-family:${T.sans};font-size:10px;font-weight:800;
//                      letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
//             Note from the Office
//           </p>
//           ${callout(`💬 &nbsp;${appt.adminNote}`, 'green')}
//         </td>
//       </tr>` : ''}

//       ${rule}

//       ${section(`
//         ${callout(`
//           📍 &nbsp;<strong>APC Lagos State Secretariat</strong><br/>
//           If you need to reschedule, please contact our office as early as possible so we
//           can accommodate you.
//         `, 'neutral')}
//         ${signoff('Office of the State Chairman — Lagos APC')}
//       `)}

//       ${footer}
//     `);

//     return this.send({
//       to:      appt.email,
//       subject: `Appointment Confirmed ✓ — Ref #${ref}`,
//       html,
//     });
//   }

//   /* ═══════════════════════════════════════════════════════
//      5. APPOINTMENT — REJECTED
//      Triggered: admin rejects the appointment request.
//   ═══════════════════════════════════════════════════════ */
//   async sendAppointmentRejected(appt) {
//     if (!appt.email) return false;

//     const ref = appt._id.toString().slice(-6).toUpperCase();

//     const html = shell(`
//       ${headerGreen('Appointment Update', 'We are unable to accommodate<br/>your request at this time.')}

//       ${section(`
//         ${para(`Dear <strong>${appt.fullName}</strong>, thank you for your patience.
//           After careful review, the Chairman's office is unable to accommodate your
//           appointment request at this time.`)}
//       `)}

//       ${rule}

//       <tr>
//         <td style="padding:32px 40px;">
//           ${apptCard(appt)}
//         </td>
//       </tr>

//       ${appt.adminNote ? `
//       ${rule}
//       <tr>
//         <td style="padding:32px 40px;">
//           <p style="margin:0 0 12px;font-family:${T.sans};font-size:10px;font-weight:800;
//                      letter-spacing:0.16em;text-transform:uppercase;color:${T.mutedText};">
//             Reason / Note
//           </p>
//           ${callout(appt.adminNote, 'red')}
//         </td>
//       </tr>` : ''}

//       ${rule}

//       ${section(`
//         ${callout(`
//           You are welcome to submit a new request at a later date. For urgent matters,
//           please contact the <strong>APC Lagos State Secretariat</strong> directly.
//         `, 'neutral')}
//         ${signoff('Office of the State Chairman — Lagos APC')}
//       `)}

//       ${footer}
//     `);

//     return this.send({
//       to:      appt.email,
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

     IMPORTANT: Always pass plain data — not a raw Mongoose document.
     The controller must call member.toObject() or extract fields before
     passing here, to avoid Mongoose getters/transforms causing silent failures.
  ═══════════════════════════════════════════════════════ */
  async sendWelcome(member) {
    // Defensively extract primitives — safe whether `member` is a plain object
    // or a Mongoose document (whose MongooseArray and virtual getters can misbehave
    // when interpolated into template literals or passed to Array.prototype.join).
    const firstName  = String(member.firstName  || '').trim();
    const email      = String(member.email      || '').trim();
    const lga        = String(member.lga        || '').trim();
    const ward       = member.ward ? String(member.ward).trim() : null;

    // Normalize interests: Mongoose stores this as a MongooseDocumentArray.
    // Calling Array.from() produces a plain JS array that .join() on safely.
    const rawInterests = member.interests;
    const interestsArr = Array.isArray(rawInterests)
      ? Array.from(rawInterests).map(String)
      : [];
    const interests = interestsArr.length ? interestsArr.join(' · ') : null;

    // Guard: without an email address there is nothing to send.
    if (!email) {
      logger.warn(`sendWelcome skipped — member has no email (id: ${member._id})`);
      return false;
    }

    logger.info(`sendWelcome → building HTML for ${firstName} <${email}> (${lga} LGA)`);

    let html;
    try {
      html = shell(`
        ${headerGreen('Membership Registration', `Welcome to the Movement,<br/>${firstName}.`)}

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
                  ${infoRow('📍', 'Local Government Area', lga)}
                  ${ward      ? infoRow('🏘️', 'Ward',               ward)      : ''}
                  ${interests ? infoRow('🤝', 'Areas of Interest',  interests) : ''}
                  ${infoRow('🔄', 'Status', 'Registered — Awaiting Verification')}
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
              `Your details are forwarded to the ${lga} LGA coordinator for initial review.`)}
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
    } catch (buildErr) {
      logger.error(`sendWelcome → HTML build failed for ${email}: ${buildErr.message}`);
      return false;
    }

    const result = await this.send({
      to:      email,
      subject: `Welcome to Lagos APC, ${firstName} — Registration Confirmed`,
      html,
    });

    if (!result) {
      logger.error(`sendWelcome → this.send() returned false for ${email} — check transporter config and logs above.`);
    }

    return result;
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
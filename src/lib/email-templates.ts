// Client Confirmation Email Template
export function clientEmailHtml({
  name,
  service,
  message,
}: {
  name: string
  service: string
  message: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've Received Your Message – Prime Counsel</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F6;font-family:'Georgia',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FAF9F6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e5e0d8;border-radius:8px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#0B1C3D;padding:40px 48px;text-align:center;">
              <p style="margin:0;font-family:'Georgia',serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;margin-bottom:12px;">Prime Counsel Limited</p>
              <h1 style="margin:0;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#ffffff;letter-spacing:2px;text-transform:uppercase;">We've Received<br/>Your Message</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">Dear <strong style="color:#0B1C3D;">${name}</strong>,</p>
              
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">
                Thank you for reaching out to Prime Counsel. We have received your enquiry and a member of our team will respond to you within <strong>1–2 business days</strong>.
              </p>

              <!-- Message Summary Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FAF9F6;border-left:3px solid #C9A84C;padding:0;margin:32px 0;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;font-family:Arial,sans-serif;font-weight:700;">Your Enquiry Summary</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px;">
                      <tr>
                        <td style="padding:6px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;width:100px;">Service</td>
                        <td style="padding:6px 0;font-size:14px;color:#0B1C3D;font-family:Arial,sans-serif;">${service || 'General Enquiry'}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;vertical-align:top;">Message</td>
                        <td style="padding:6px 0;font-size:14px;color:#0B1C3D;font-family:Arial,sans-serif;line-height:1.6;">${message}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 32px;font-size:15px;line-height:1.8;color:#4a4a4a;">
                In the meantime, feel free to explore our programmes and resources at 
                <a href="https://primecounsel.co.uk" style="color:#C9A84C;text-decoration:none;">primecounsel.co.uk</a>.
              </p>

              <p style="margin:0;font-size:15px;line-height:1.8;color:#4a4a4a;">
                With regards,<br/>
                <strong style="color:#0B1C3D;">The Prime Counsel Team</strong>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 48px;">
              <hr style="border:none;border-top:1px solid #e5e0d8;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 48px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;">
                Prime Counsel Limited
              </p>
              <p style="margin:0;font-size:12px;color:#b0b0b0;font-family:Arial,sans-serif;">
                <a href="mailto:info@primecounsel.co.uk" style="color:#C9A84C;text-decoration:none;">info@primecounsel.co.uk</a>
                &nbsp;·&nbsp;
                <a href="https://primecounsel.co.uk" style="color:#C9A84C;text-decoration:none;">primecounsel.co.uk</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#c0c0c0;font-family:Arial,sans-serif;">
                © ${new Date().getFullYear()} Prime Counsel Limited. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

// Admin Notification Email Template
export function adminEmailHtml({
  name,
  email,
  service,
  message,
}: {
  name: string
  email: string
  service: string
  message: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission – Prime Counsel</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f0f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0B1C3D;padding:28px 40px;">
              <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;margin-bottom:6px;">Prime Counsel Limited</p>
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:1px;">🔔 New Contact Submission</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:14px;color:#555;line-height:1.7;">
                A new enquiry has been submitted via the Prime Counsel website contact form. Details are below.
              </p>

              <!-- Details Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;">
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;width:120px;border-bottom:1px solid #e5e5e5;">Name</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;font-weight:600;border-bottom:1px solid #e5e5e5;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Email</td>
                  <td style="padding:14px 20px;font-size:14px;border-bottom:1px solid #e5e5e5;">
                    <a href="mailto:${email}" style="color:#0B1C3D;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Service</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;border-bottom:1px solid #e5e5e5;">${service || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;vertical-align:top;">Message</td>
                  <td style="padding:14px 20px;font-size:14px;color:#333;line-height:1.7;">${message}</td>
                </tr>
              </table>

              <p style="margin:28px 0 0;font-size:12px;color:#999;">
                Submitted on ${new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} UTC
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#FAF9F6;padding:20px 40px;border-top:1px solid #e5e5e5;">
              <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
                Prime Counsel Limited Internal Notification · Do not reply to this email
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

// Client Confirmation Email Template
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://primecounsel.co.uk'

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

  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    .logo-light-mode { display: none !important; }
    .logo-dark-mode { display: inline-block !important; }
    
    @media (prefers-color-scheme: dark) {
      .logo-light-mode { display: inline-block !important; }
      .logo-dark-mode { display: none !important; }
      .header-bg { background-color: #0B1C3D !important; }
      .header-title { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F6;font-family:'Georgia',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FAF9F6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e5e0d8;border-radius:8px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td class="header-bg" style="background-color:#ffffff;padding:40px 48px;text-align:center;">
              <a href="${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
                <!--<![endif]-->
              </a>
              <h1 class="header-title" style="margin:0;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#0B1C3D;letter-spacing:2px;text-transform:uppercase;">We've Received<br/>Your Message</h1>
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

  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    .logo-light-mode { display: none !important; }
    .logo-dark-mode { display: inline-block !important; }
    
    @media (prefers-color-scheme: dark) {
      .logo-light-mode { display: inline-block !important; }
      .logo-dark-mode { display: none !important; }
      .header-bg { background-color: #0B1C3D !important; }
      .header-title { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f0f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td class="header-bg" style="background-color:#ffffff;padding:28px 40px;">
              <a href="${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
                <!--<![endif]-->
              </a>
              <h1 class="header-title" style="margin:0;font-size:20px;font-weight:700;color:#0B1C3D;letter-spacing:1px;">🔔 New Contact Submission</h1>
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

// Client Mentorship Session Confirmation
export function clientSessionEmailHtml({
  name,
  productTitle,
  calendlyLink,
}: {
  name: string
  productTitle: string
  calendlyLink: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Session Has Been Confirmed – Prime Counsel</title>

  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    .logo-light-mode { display: none !important; }
    .logo-dark-mode { display: inline-block !important; }
    
    @media (prefers-color-scheme: dark) {
      .logo-light-mode { display: inline-block !important; }
      .logo-dark-mode { display: none !important; }
      .header-bg { background-color: #0B1C3D !important; }
      .header-title { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F6;font-family:'Georgia',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FAF9F6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e5e0d8;border-radius:8px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td class="header-bg" style="background-color:#ffffff;padding:40px 48px;text-align:center;">
              <a href="${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
                <!--<![endif]-->
              </a>
              <h1 class="header-title" style="margin:0;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#0B1C3D;letter-spacing:2px;text-transform:uppercase;">Session<br/>Confirmed</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">Dear <strong style="color:#0B1C3D;">${name}</strong>,</p>
              
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">
                This email serves as the official receipt for your payment for the <strong>${productTitle}</strong>. 
                This is a significant step towards achieving your strategic goals, and we are honoured to be part of your journey.
              </p>

              <!-- CTA Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0B1C3D;border-radius:4px;margin:32px 0;">
                <tr>
                  <td style="padding:40px;text-align:center;">
                    <p style="margin:0 0 20px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-family:Arial,sans-serif;font-weight:700;">Action Required</p>
                    <h2 style="margin:0 0 24px;font-family:'Georgia',serif;font-size:20px;color:#ffffff;font-weight:400;">Schedule Your Appointment</h2>
                    <a href="${calendlyLink}" style="display: inline-block; background-color: #C9A84C; color: #0B1C3D; font-weight: bold; text-decoration: none; padding: 16px 32px; border-radius: 4px; text-transform: uppercase; font-size: 13px; letter-spacing: 1px;">
                      Select a Date & Time
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">
                Please select a time that is convenient for you using the link above. Once scheduled, you will receive your final confirmation with the meeting details.
              </p>

              <p style="margin:0 0 32px;font-size:15px;line-height:1.8;color:#4a4a4a;">
                Should you have any questions ahead of our engagement, simply reply to this email.
              </p>

              <p style="margin:0;font-size:15px;line-height:1.8;color:#4a4a4a;">
                With regards,<br/>
                <strong style="color:#0B1C3D;">The Prime Counsel Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 48px;text-align:center;background-color:#FAF9F6;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;">
                Prime Counsel Limited
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

// Admin Payment Notification
export function adminSessionEmailHtml({
  name,
  email,
  productTitle,
  amount,
  currency,
  stripeId,
}: {
  name: string
  email: string
  productTitle: string
  amount: string
  currency: string
  stripeId: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Mentorship Booking – Prime Counsel</title>

  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    .logo-light-mode { display: none !important; }
    .logo-dark-mode { display: inline-block !important; }
    
    @media (prefers-color-scheme: dark) {
      .logo-light-mode { display: inline-block !important; }
      .logo-dark-mode { display: none !important; }
      .header-bg { background-color: #0B1C3D !important; }
      .header-title { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f0f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td class="header-bg" style="background-color:#ffffff;padding:28px 40px;">
              <a href="${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
                <!--<![endif]-->
              </a>
              <h1 class="header-title" style="margin:0;font-size:20px;font-weight:700;color:#0B1C3D;letter-spacing:1px;">New Mentorship Booking </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:14px;color:#555;line-height:1.7;">
                A new mentorship session has been purchased and paid for. Details are below.
              </p>

              <!-- Details Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;">
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;width:120px;border-bottom:1px solid #e5e5e5;">Client</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;font-weight:600;border-bottom:1px solid #e5e5e5;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Email</td>
                  <td style="padding:14px 20px;font-size:14px;border-bottom:1px solid #e5e5e5;">
                    <a href="mailto:${email}" style="color:#0B1C3D;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Session</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;border-bottom:1px solid #e5e5e5;">${productTitle}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Amount</td>
                  <td style="padding:14px 20px;font-size:16px;color:#0B1C3D;font-weight:700;border-bottom:1px solid #e5e5e5;">${currency} ${amount}</td>
                </tr>
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;">Reference</td>
                  <td style="padding:14px 20px;font-size:12px;color:#777;">${stripeId}</td>
                </tr>
              </table>

              <p style="margin:28px 0 0;font-size:12px;color:#999;">
                Processed via Stripe on ${new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#FAF9F6;padding:20px 40px;border-top:1px solid #e5e5e5;">
              <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
                Prime Counsel Limited Internal Notification
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


// Client Booking Confirmed Email (Fires after Calendly booking)
export function clientBookingConfirmedEmailHtml({
  name,
  eventName,
  startTime,
  endTime,
  timezone,
  meetingLocation,
  calendlyEventUrl,
}: {
  name: string
  eventName: string
  startTime: string
  endTime: string
  timezone: string
  meetingLocation: string
  calendlyEventUrl: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Session is Booked – Prime Counsel</title>

  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    .logo-light-mode { display: none !important; }
    .logo-dark-mode { display: inline-block !important; }
    
    @media (prefers-color-scheme: dark) {
      .logo-light-mode { display: inline-block !important; }
      .logo-dark-mode { display: none !important; }
      .header-bg { background-color: #0B1C3D !important; }
      .header-title { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F6;font-family:'Georgia',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FAF9F6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e5e0d8;border-radius:8px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td class="header-bg" style="background-color:#ffffff;padding:40px 48px;text-align:center;">
              <a href="${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
                <!--<![endif]-->
              </a>
              <h1 class="header-title" style="margin:0;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#0B1C3D;letter-spacing:2px;text-transform:uppercase;">Your Session<br/>is Booked</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">Dear <strong style="color:#0B1C3D;">${name}</strong>,</p>
              
              <p style="margin:0 0 32px;font-size:15px;line-height:1.8;color:#4a4a4a;">
                Your <strong>${eventName}</strong> with Prime Counsel has been successfully scheduled. 
                We look forward to connecting with you.
              </p>

              <!-- Appointment Details Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0B1C3D;border-radius:4px;margin:0 0 32px;">
                <tr>
                  <td style="padding:36px 40px;">
                    <p style="margin:0 0 24px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;font-family:Arial,sans-serif;font-weight:700;">Appointment Details</p>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:10px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;width:100px;vertical-align:top;">Session</td>
                        <td style="padding:10px 0;font-size:15px;color:#ffffff;font-family:'Georgia',serif;">${eventName}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;vertical-align:top;">Date</td>
                        <td style="padding:10px 0;font-size:15px;color:#ffffff;font-family:'Georgia',serif;">${startTime}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;vertical-align:top;">End Time</td>
                        <td style="padding:10px 0;font-size:15px;color:#ffffff;font-family:'Georgia',serif;">${endTime}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;vertical-align:top;">Timezone</td>
                        <td style="padding:10px 0;font-size:14px;color:#C9A84C;font-family:Arial,sans-serif;">${timezone}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;vertical-align:top;">Location</td>
                        <td style="padding:10px 0;font-size:14px;color:#C9A84C;font-family:Arial,sans-serif;">${meetingLocation}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Manage Booking Link -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 32px;">
                <tr>
                  <td style="text-align:center;padding:24px;background-color:#FAF9F6;border-radius:4px;border:1px solid #e5e0d8;">
                    <p style="margin:0 0 16px;font-size:13px;color:#777;font-family:Arial,sans-serif;">Need to reschedule or cancel?</p>
                    <a href="${calendlyEventUrl}" style="display:inline-block;background-color:#0B1C3D;color:#C9A84C;font-weight:bold;text-decoration:none;padding:12px 28px;border-radius:4px;text-transform:uppercase;font-size:12px;letter-spacing:1px;font-family:Arial,sans-serif;">
                      Manage Appointment
                    </a>
                  </td>
                </tr>
              </table>

              <!-- What to Expect -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-left:3px solid #C9A84C;margin:0 0 32px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;font-family:Arial,sans-serif;font-weight:700;">What To Expect</p>
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#4a4a4a;font-family:Arial,sans-serif;">
                      Please ensure you are in a quiet, comfortable environment ahead of your session. 
                      Review any notes or questions you wish to discuss. 
                      We recommend joining 2–3 minutes early to test your connection.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:15px;line-height:1.8;color:#4a4a4a;">
                With regards,<br/>
                <strong style="color:#0B1C3D;">The Prime Counsel Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 48px;text-align:center;background-color:#FAF9F6;border-top:1px solid #e5e0d8;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;">Prime Counsel Limited</p>
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

// Admin New Appointment Notification
export function adminBookingAlertEmailHtml({
  name,
  email,
  eventName,
  startTime,
  timezone,
  meetingLocation,
  calendlyEventUrl,
}: {
  name: string
  email: string
  eventName: string
  startTime: string
  timezone: string
  meetingLocation: string
  calendlyEventUrl: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Appointment Booked – Prime Counsel</title>

  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    .logo-light-mode { display: none !important; }
    .logo-dark-mode { display: inline-block !important; }
    
    @media (prefers-color-scheme: dark) {
      .logo-light-mode { display: inline-block !important; }
      .logo-dark-mode { display: none !important; }
      .header-bg { background-color: #0B1C3D !important; }
      .header-title { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f0f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td class="header-bg" style="background-color:#ffffff;padding:28px 40px;">
              <a href="${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
                <!--<![endif]-->
              </a>
              <h1 class="header-title" style="margin:0;font-size:20px;font-weight:700;color:#0B1C3D;letter-spacing:1px;">🗓 New Appointment Booked</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:14px;color:#555;line-height:1.7;">
                A client has selected their appointment time via Calendly. Full details below.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;">
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;width:120px;border-bottom:1px solid #e5e5e5;">Client</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;font-weight:600;border-bottom:1px solid #e5e5e5;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Email</td>
                  <td style="padding:14px 20px;font-size:14px;border-bottom:1px solid #e5e5e5;">
                    <a href="mailto:${email}" style="color:#0B1C3D;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Session</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;border-bottom:1px solid #e5e5e5;">${eventName}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Date & Time</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;font-weight:700;border-bottom:1px solid #e5e5e5;">${startTime} (${timezone})</td>
                </tr>
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Location</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;border-bottom:1px solid #e5e5e5;">${meetingLocation}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;">Calendly Link</td>
                  <td style="padding:14px 20px;font-size:12px;">
                    <a href="${calendlyEventUrl}" style="color:#0B1C3D;text-decoration:underline;">View / Manage Booking</a>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0;font-size:12px;color:#999;">
                Booked on ${new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
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

// Client Download Email
export function clientDownloadEmailHtml({
  name,
  productTitle,
  downloadUrl,
}: {
  name: string
  productTitle: string
  downloadUrl: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Secure Download – Prime Counsel</title>

  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    .logo-light-mode { display: none !important; }
    .logo-dark-mode { display: inline-block !important; }
    
    @media (prefers-color-scheme: dark) {
      .logo-light-mode { display: inline-block !important; }
      .logo-dark-mode { display: none !important; }
      .header-bg { background-color: #0B1C3D !important; }
      .header-title { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F6;font-family:'Georgia',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FAF9F6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e5e0d8;border-radius:8px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td class="header-bg" style="background-color:#ffffff;padding:40px 48px;text-align:center;">
              <a href="${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
                <!--<![endif]-->
              </a>
              <h1 class="header-title" style="margin:0;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#0B1C3D;letter-spacing:2px;text-transform:uppercase;">Secure<br/>Download</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">Dear <strong style="color:#0B1C3D;">${name}</strong>,</p>
              
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">
                Thank you for your purchase. Your payment for the <strong>${productTitle}</strong> has been successfully processed and your secure download is now ready.
              </p>

              <!-- CTA Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0B1C3D;border-radius:4px;margin:32px 0;">
                <tr>
                  <td style="padding:40px;text-align:center;">
                    <p style="margin:0 0 20px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-family:Arial,sans-serif;font-weight:700;">Single-Use Access</p>
                    <h2 style="margin:0 0 24px;font-family:'Georgia',serif;font-size:20px;color:#ffffff;font-weight:400;">Download Your File</h2>
                    <a href="${downloadUrl}" style="display: inline-block; background-color: #C9A84C; color: #0B1C3D; font-weight: bold; text-decoration: none; padding: 16px 32px; border-radius: 4px; text-transform: uppercase; font-size: 13px; letter-spacing: 1px;">
                      Access Download
                    </a>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-left:3px solid #C9A84C;margin:0 0 32px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;font-family:Arial,sans-serif;font-weight:700;">Important Security Notice</p>
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#4a4a4a;font-family:Arial,sans-serif;">
                      The button above contains a secure, single-use link. Once you download the file, the link will expire immediately to protect our intellectual property. Please do not share this link with anyone.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 32px;font-size:15px;line-height:1.8;color:#4a4a4a;">
                Should you experience any issues accessing your file, simply reply to this email for support.
              </p>

              <p style="margin:0;font-size:15px;line-height:1.8;color:#4a4a4a;">
                With regards,<br/>
                <strong style="color:#0B1C3D;">The Prime Counsel Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 48px;text-align:center;background-color:#FAF9F6;border-top:1px solid #e5e0d8;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9a9a;font-family:Arial,sans-serif;">Prime Counsel Limited</p>
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

// Admin Order Notification
export function adminOrderEmailHtml({
  name,
  email,
  productTitle,
  amount,
  currency,
  stripeId,
}: {
  name: string
  email: string
  productTitle: string
  amount: string
  currency: string
  stripeId: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Product Order – Prime Counsel</title>

  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    .logo-light-mode { display: none !important; }
    .logo-dark-mode { display: inline-block !important; }
    
    @media (prefers-color-scheme: dark) {
      .logo-light-mode { display: inline-block !important; }
      .logo-dark-mode { display: none !important; }
      .header-bg { background-color: #0B1C3D !important; }
      .header-title { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f0f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td class="header-bg" style="background-color:#ffffff;padding:28px 40px;">
              <a href="${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
                <!--<![endif]-->
              </a>
              <h1 class="header-title" style="margin:0;font-size:20px;font-weight:700;color:#0B1C3D;letter-spacing:1px;">New Product Order</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:14px;color:#555;line-height:1.7;">
                A product has been purchased and paid for. If applicable, the secure download link has been automatically dispatched.
              </p>

              <!-- Details Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;">
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;width:120px;border-bottom:1px solid #e5e5e5;">Client</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;font-weight:600;border-bottom:1px solid #e5e5e5;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Email</td>
                  <td style="padding:14px 20px;font-size:14px;border-bottom:1px solid #e5e5e5;">
                    <a href="mailto:${email}" style="color:#0B1C3D;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Product</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;border-bottom:1px solid #e5e5e5;">${productTitle}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Amount</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;font-weight:700;border-bottom:1px solid #e5e5e5;">${amount} ${currency}</td>
                </tr>
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;">Stripe Ref</td>
                  <td style="padding:14px 20px;font-size:11px;font-family:monospace;color:#666;">${stripeId}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#FAF9F6;padding:20px 40px;border-top:1px solid #e5e5e5;">
              <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
                Prime Counsel Limited Internal Notification • Do not reply
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

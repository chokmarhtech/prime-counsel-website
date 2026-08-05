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

// SPM 3.0 Admin Notification Email (fires on Stripe payment confirmed)
export function spmAdminNotificationEmailHtml({
  name,
  email,
  ticketType,
  ticketCode,
  amount,
  stripeId,
}: {
  name: string
  email: string
  ticketType: 'physical' | 'virtual'
  ticketCode: string
  amount: string
  stripeId: string
}) {
  const typeLabel = ticketType === 'physical' ? 'Physical Pass (In-Person) — £50' : 'Virtual Pass (Online) — £25'
  const badgeColor = ticketType === 'physical' ? '#C9A84C' : '#4C9AC9'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New SPM 3.0 Registration – Prime Counsel</title>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    @media (prefers-color-scheme: dark) {
      .bg-body { background-color: #04082B !important; }
      .container { background-color: #0B0F3A !important; border: 1px solid rgba(201, 168, 76, 0.2) !important; }
      .content-body { background-color: #0B0F3A !important; color: #ffffff !important; }
      .text-dark { color: #ffffff !important; }
      .text-navy { color: #C9A84C !important; }
      .text-muted { color: rgba(255, 255, 255, 0.6) !important; }
      .highlight-box { background-color: #12184E !important; border: 1px solid rgba(201, 168, 76, 0.3) !important; }
      .ticket-code-val { color: #C9A84C !important; }
      .detail-row { border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; }
      .row-bg { background-color: #12184E !important; }
      .footer-band { background-color: #04082B !important; border-top: 1px solid rgba(255, 255, 255, 0.05) !important; }
      .footer-text { color: rgba(255, 255, 255, 0.4) !important; }
      .hr-line { border-top: 1px solid rgba(255, 255, 255, 0.1) !important; }
    }
  </style>
</head>
<body class="bg-body" style="margin:0;padding:0;background-color:#FAF9F6;font-family:'Segoe UI',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="bg-body" style="background-color:#FAF9F6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" class="container" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e5e0d8;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.03);">

          <!-- Header (Dark Navy Band) -->
          <tr>
            <td style="background-color:#0B1C3D;padding:24px 40px;text-align:left;border-bottom:2px solid #C9A84C;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="https://primecounsel.co.uk/logos/logo-light.svg" alt="Prime Counsel" style="height:38px;width:auto;display:block;" />
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:2px;text-transform:uppercase;">SPM 3.0 ADMIN</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="content-body" style="padding:40px;background-color:#ffffff;color:#4a4a4a;font-size:15px;line-height:1.7;">
              <h1 class="text-navy" style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#0B1C3D;text-transform:uppercase;letter-spacing:1px;">New Registration Received</h1>
              <div class="hr-line" style="border-top:1px solid #C9A84C;margin-bottom:24px;width:100%;"></div>

              <p style="margin:0 0 20px;">
                A new registration payment has been confirmed for the <strong>Strategic Positioning Masterclass 3.0 (SPM 3.0)</strong>.
              </p>

              <!-- Ticket Code Highlight Box -->
              <div class="highlight-box" style="background-color:#F7F4EB;border:1px solid #E5DFD0;border-radius:8px;padding:20px;text-align:center;margin:24px 0;">
                <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;margin-bottom:6px;">Generated Ticket Code</div>
                <div class="ticket-code-val" style="font-size:28px;font-weight:700;color:#0B1C3D;font-family:monospace;letter-spacing:2px;margin-bottom:4px;">${ticketCode}</div>
                <div style="font-size:12px;font-weight:600;color:${badgeColor};text-transform:uppercase;letter-spacing:1px;">${typeLabel}</div>
              </div>

              <!-- Details Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:32px;border-collapse:collapse;border:1px solid #e5e0d8;border-radius:6px;overflow:hidden;">
                <tr class="detail-row row-bg" style="background-color:#FAF9F6;border-bottom:1px solid #e5e0d8;">
                  <td style="padding:14px 20px;font-weight:600;color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:130px;">Attendee</td>
                  <td class="text-dark" style="padding:14px 20px;color:#0B1C3D;font-weight:600;">${name}</td>
                </tr>
                <tr class="detail-row" style="border-bottom:1px solid #e5e0d8;">
                  <td style="padding:14px 20px;font-weight:600;color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</td>
                  <td class="text-dark" style="padding:14px 20px;color:#0B1C3D;font-weight:600;">
                    <a href="mailto:${email}" style="color:#0B1C3D;text-decoration:none;" class="text-dark">${email}</a>
                  </td>
                </tr>
                <tr class="detail-row row-bg" style="background-color:#FAF9F6;border-bottom:1px solid #e5e0d8;">
                  <td style="padding:14px 20px;font-weight:600;color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Amount Paid</td>
                  <td class="text-dark" style="padding:14px 20px;color:#0B1C3D;font-weight:600;">GBP ${amount}</td>
                </tr>
                <tr class="detail-row">
                  <td style="padding:14px 20px;font-weight:600;color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Stripe Ref</td>
                  <td class="text-dark" style="padding:14px 20px;color:#555;font-size:13px;font-family:monospace;">${stripeId}</td>
                </tr>
              </table>

              <p style="margin:0;font-size:12px;color:#999;" class="text-muted">
                Confirmed via Stripe webhook on ${new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} GMT
              </p>
            </td>
          </tr>

          <!-- Footer (Framed bottom band) -->
          <tr>
            <td class="footer-band" style="background-color:#FAF9F6;padding:20px 40px;border-top:1px solid #e5e0d8;text-align:center;">
              <p style="margin:0;font-size:11px;color:#aaa;" class="footer-text">
                Prime Counsel Limited Internal Notification · Do not reply directly to this email
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

export function spmConfirmationEmailHtml({
  name,
  ticketType,
  ticketCode,
}: {
  name: string
  ticketType: 'physical' | 'virtual'
  ticketCode: string
}) {
  const typeLabel = ticketType === 'physical' ? 'Physical Pass (In-Person)' : 'Virtual Pass (Online)'
  const price = ticketType === 'physical' ? '£50' : '£25'
  const venue = ticketType === 'physical' 
    ? 'Conference Centre, Aston University, B4 7ET' 
    : 'Online Link (Will be sent 3 days before event)'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your SPM 3.0 Registration Confirmation</title>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; }
    @media (prefers-color-scheme: dark) {
      .bg-body { background-color: #04082B !important; }
      .container { background-color: #0B0F3A !important; border-color: rgba(201, 168, 76, 0.2) !important; }
      .content-body { background-color: #0B0F3A !important; color: #ffffff !important; }
      .text-dark { color: #ffffff !important; }
      .text-navy { color: #C9A84C !important; }
      .text-muted { color: rgba(255, 255, 255, 0.7) !important; }
      .highlight-box { background-color: #12184E !important; border-color: rgba(201, 168, 76, 0.25) !important; }
      .ticket-code-val { color: #C9A84C !important; }
      .detail-row { border-color: rgba(255, 255, 255, 0.1) !important; }
      .footer-band { background-color: #04082B !important; border-top: 1px solid rgba(255, 255, 255, 0.05) !important; }
      .footer-text { color: rgba(255, 255, 255, 0.4) !important; }
      .hr-line { border-top: 1px solid rgba(255, 255, 255, 0.1) !important; }
    }
  </style>
</head>
<body class="bg-body" style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="bg-body" style="background-color: #FAF9F6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e5e0d8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          
          <!-- Header (Dark Navy Band) -->
          <tr>
            <td style="background-color: #0B1C3D; padding: 24px 40px; text-align: left; border-bottom: 2px solid #C9A84C;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <img src="https://primecounsel.co.uk/logos/logo-light.svg" alt="Prime Counsel" style="height: 38px; width: auto; display: block;" />
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 10px; font-weight: 700; color: #C9A84C; letter-spacing: 2px; text-transform: uppercase;">SPM 3.0</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="content-body" style="padding: 40px; background-color: #ffffff; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
              <h1 class="text-navy" style="margin: 0 0 8px; font-family: Georgia, serif; font-size: 26px; font-weight: 400; color: #0B1C3D; text-transform: uppercase; letter-spacing: 1px;">Registration Confirmed</h1>
              <div class="hr-line" style="border-top: 1px solid #C9A84C; margin-bottom: 24px; width: 100%;"></div>

              <p style="margin: 0 0 20px;">Dear <strong class="text-dark" style="color: #0B1C3D;">${name}</strong>,</p>
              
              <p style="margin: 0 0 24px;">
                Your seat at the <strong>Strategic Positioning Masterclass 3.0 (SPM 3.0)</strong> has been successfully secured. We are excited to support you in shifting your career from effort to leverage.
              </p>

              <!-- Ticket Code Highlight Box (Marvellex style) -->
              <div class="highlight-box" style="background-color: #F7F4EB; border: 1px solid #E5DFD0; border-radius: 8px; padding: 24px; text-align: center; margin: 32px 0;">
                <div style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; font-weight: 700; margin-bottom: 8px;">Your Unique Ticket Code</div>
                <div class="ticket-code-val" style="font-size: 32px; font-weight: 700; color: #0B1C3D; font-family: monospace; letter-spacing: 2px; margin-bottom: 6px;">${ticketCode}</div>
                <div style="font-size: 13px; font-weight: 600; color: #C9A84C; text-transform: uppercase; letter-spacing: 1px;">${typeLabel}</div>
              </div>

              <!-- Details Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px; border-collapse: collapse;">
                <tr class="detail-row" style="border-bottom: 1px solid #e5e0d8;">
                  <td style="padding: 12px 0; font-weight: 600; color: #9a9a9a; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Date</td>
                  <td class="text-dark" style="padding: 12px 0; color: #0B1C3D; font-weight: 600;">Saturday, 21st November 2026</td>
                </tr>
                <tr class="detail-row" style="border-bottom: 1px solid #e5e0d8;">
                  <td style="padding: 12px 0; font-weight: 600; color: #9a9a9a; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Time</td>
                  <td class="text-dark" style="padding: 12px 0; color: #0B1C3D; font-weight: 600;">10:00 AM – 4:00 PM (GMT)</td>
                </tr>
                <tr class="detail-row" style="border-bottom: 1px solid #e5e0d8;">
                  <td style="padding: 12px 0; font-weight: 600; color: #9a9a9a; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Venue</td>
                  <td class="text-dark" style="padding: 12px 0; color: #0B1C3D; font-weight: 600; line-height: 1.5;">${venue}</td>
                </tr>
                <tr class="detail-row">
                  <td style="padding: 12px 0; font-weight: 600; color: #9a9a9a; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Amount Paid</td>
                  <td class="text-dark" style="padding: 12px 0; color: #0B1C3D; font-weight: 600;">${price} GBP</td>
                </tr>
              </table>

              <!-- Important Checklist -->
              <div style="background-color: #FAF9F6; border-left: 3px solid #C9A84C; border-radius: 4px; padding: 20px 24px; margin-bottom: 32px;" class="highlight-box">
                <p style="margin: 0 0 12px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; font-weight: 700;">Important Checklist</p>
                <ul style="margin: 0; padding-left: 16px; font-size: 13px; line-height: 1.6; color: #555;" class="text-muted">
                  <li style="margin-bottom: 8px;">Please keep this ticket code safe. You will need to show it at the door (for physical attendees) or enter it to join the stream (for virtual attendees).</li>
                  <li>Virtual attendees: A secure link to join the stream along with onboarding instructions will be sent to this email address exactly 3 days before the event.</li>
                </ul>
              </div>

              <p style="margin: 0 0 8px; font-size: 14px;" class="text-muted">
                If you have any questions, please feel free to reach out to us at <a href="mailto:info@primecounsel.co.uk" style="color: #C9A84C; text-decoration: none;">info@primecounsel.co.uk</a>.
              </p>
            </td>
          </tr>

          <!-- Footer (Framed bottom band) -->
          <tr>
            <td class="footer-band" style="background-color: #FAF9F6; padding: 24px 40px; border-top: 1px solid #e5e0d8;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-size: 12px; color: #9a9a9a;" class="footer-text">
                    <a href="https://primecounsel.co.uk" style="color: #C9A84C; text-decoration: none; font-weight: 600;">primecounsel.co.uk</a>
                  </td>
                  <td align="right" style="font-size: 12px; color: #9a9a9a;" class="footer-text">
                    &copy; 2026 Prime Counsel Limited. All rights reserved.
                  </td>
                </tr>
              </table>
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

export function spmDripEmailHtml({
  name,
  ticketType,
  ticketCode,
  daysRemaining,
}: {
  name: string
  ticketType: 'physical' | 'virtual'
  ticketCode: string
  daysRemaining: number
}) {
  let subject = ''
  let heading = ''
  let bodyContent = ''

  const typeLabel = ticketType === 'physical' ? 'Physical Pass (In-Person)' : 'Virtual Pass (Online)'
  const venue = ticketType === 'physical' 
    ? 'Conference Centre, Aston University, B4 7ET' 
    : 'Online Live Stream Link'

  if (daysRemaining === 5) {
    subject = `5 Days to SPM 3.0: Ready to level up, ${name}?`
    heading = `Only 5 Days Left!`
    bodyContent = `
      We are officially 5 days away from the **Strategic Positioning Masterclass 3.0**. 
      Now is the time to start mentally shifting out of chronic hustle mode. In this one-day masterclass, Coach Ayoola will guide you through the exact secret systems required to thrive in the UK marketplace.
      <br/><br/>
      <strong>Preparation Tip:</strong> Write down your top three professional bottlenecks. We will address how to break through these ceilings directly during the masterclass.
    `
  } else if (daysRemaining === 3) {
    subject = `3 Days to SPM 3.0: Important Event & Access Info`
    heading = `3 Days Remaining!`
    bodyContent = `
      The countdown is getting closer! We are just 3 days away. 
      Here is the crucial entry information you need:
      <br/><br/>
      <strong>Your Ticket Code:</strong> <span style="font-family: monospace; font-weight: bold; color: #C9A84C;">${ticketCode}</span> (${typeLabel})
      <br/>
      <strong>Venue/Access:</strong> ${venue}
      ${ticketType === 'virtual' ? `<br/><strong>Live Stream Link:</strong> We will send your personal stream link in our next reminder. Keep your eyes on your inbox!` : ''}
      <br/><br/>
      Please plan to arrive/log in at least <strong>15 minutes early</strong> (9:45 AM GMT) to ensure smooth check-in.
    `
  } else if (daysRemaining === 1) {
    subject = `Tomorrow is the Day! SPM 3.0 Final Details`
    heading = `SPM 3.0 is Tomorrow!`
    bodyContent = `
      Tomorrow is the day we move from **Unseen &rarr; Obvious Choice**. 
      All systems are ready. The team is fully geared up to receive you.
      <br/><br/>
      <strong>Event Schedule:</strong><br/>
      • 09:45 AM - Registration & Networking<br/>
      • 10:00 AM - Session 1 Commences<br/>
      • 01:00 PM - Lunch & Networking<br/>
      • 02:00 PM - Session 2 & Fireside Q&A<br/>
      • 04:00 PM - Event Close
      <br/><br/>
      ${ticketType === 'virtual' ? `<strong>Your Stream Access Link:</strong> <a href="https://live.primecounsel.co.uk/spm3?code=${ticketCode}" style="color:#C9A84C; font-weight:bold;">Click here to join the live stream</a> (starts tomorrow at 9:45 AM)` : `<strong>Venue Reminder:</strong> Conference Centre, Aston University, B4 7ET. Free parking is available near the building.`}
    `
  } else if (daysRemaining === 0) {
    subject = `[Today] SPM 3.0 Starts at 10:00 AM! Join us`
    heading = `SPM 3.0 Starts Today!`
    bodyContent = `
      We start in just a few hours! Today is the day.
      Get ready for a highly practical, life-changing training day.
      <br/><br/>
      <strong>Access Ticket Code:</strong> <span style="font-family: monospace; font-weight: bold; color: #C9A84C;">${ticketCode}</span>
      <br/>
      ${ticketType === 'virtual' ? `<strong>Join Online:</strong> <a href="https://live.primecounsel.co.uk/spm3?code=${ticketCode}" style="color:#C9A84C; font-weight:bold;">Click here to join the live stream</a>` : `<strong>Arrival:</strong> Doors open at 9:45 AM GMT. See you soon!`}
    `
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #04082B; color: #ffffff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0B0F3A; border: 1px solid rgba(201, 168, 76, 0.2); border-radius: 12px; overflow: hidden; margin-top: 40px; margin-bottom: 40px; }
    .header { background-color: #04082B; padding: 40px; text-align: center; border-bottom: 2px solid #C9A84C; }
    .content { padding: 40px; }
    .highlight-box { background: rgba(201, 168, 76, 0.1); border-left: 4px solid #C9A84C; border-radius: 4px; padding: 20px; margin: 25px 0; }
    .footer { background-color: #04082B; padding: 20px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.05); }
    a { color: #C9A84C; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" style="height: 40px; width: auto;" />
      <h2 style="color: #C9A84C; font-size: 22px; text-transform: uppercase; letter-spacing: 2px; margin-top: 20px; margin-bottom: 0;">${heading}</h2>
    </div>
    <div class="content">
      <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Hi <strong>${name}</strong>,</p>
      
      <div style="font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.95);">
        ${bodyContent}
      </div>

      <div class="highlight-box">
        <p style="margin: 0; font-size: 14px; line-height: 1.6;">
          <strong>Your Registration Info:</strong><br/>
          • Ticket Code: <strong style="font-family: monospace;">${ticketCode}</strong><br/>
          • Pass Type: ${typeLabel}
        </p>
      </div>

      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 0; margin-top: 30px;">
        With warm regards,<br/>
        <strong>Coach Ayoola & The Prime Counsel Team</strong>
      </p>
    </div>
    <div class="footer">
      &copy; 2026 Prime Counsel Limited. All rights reserved.<br/>
      Conference Centre, Aston University, Birmingham
    </div>
  </div>
</body>
</html>
  `
}

export function adminDirectBookingEmailHtml({
  name,
  email,
  productTitle,
  amount,
  currency,
  bookingDate,
  bookingTime,
  stripeId,
  meetLink,
}: {
  name: string
  email: string
  productTitle: string
  amount: string
  currency: string
  bookingDate?: string
  bookingTime?: string
  stripeId: string
  meetLink?: string
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
    @media (prefers-color-scheme: dark) {
      .bg-body { background-color: #04082B !important; }
      .container { background-color: #0B0F3A !important; border: 1px solid rgba(201, 168, 76, 0.2) !important; }
      .content-body { background-color: #0B0F3A !important; color: #ffffff !important; }
      .text-dark { color: #ffffff !important; }
      .text-navy { color: #C9A84C !important; }
      .text-muted { color: rgba(255, 255, 255, 0.6) !important; }
      .highlight-box { background-color: #12184E !important; border: 1px solid rgba(201, 168, 76, 0.3) !important; }
      .ticket-code-val { color: #C9A84C !important; }
      .detail-row { border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; }
      .row-bg { background-color: #12184E !important; }
      .footer-band { background-color: #04082B !important; border-top: 1px solid rgba(255, 255, 255, 0.05) !important; }
      .footer-text { color: rgba(255, 255, 255, 0.4) !important; }
      .hr-line { border-top: 1px solid rgba(255, 255, 255, 0.1) !important; }
    }
  </style>
</head>
<body class="bg-body" style="margin:0;padding:0;background-color:#FAF9F6;font-family:'Segoe UI',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="bg-body" style="background-color:#FAF9F6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" class="container" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e5e0d8;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.03);">

          <!-- Header (Dark Navy Band) -->
          <tr>
            <td style="background-color:#0B1C3D;padding:24px 40px;text-align:left;border-bottom:2px solid #C9A84C;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="https://primecounsel.co.uk/logos/logo-light.svg" alt="Prime Counsel" style="height:38px;width:auto;display:block;" />
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:2px;text-transform:uppercase;">MENTORSHIP ADMIN</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="content-body" style="padding:40px;background-color:#ffffff;color:#4a4a4a;font-size:15px;line-height:1.7;">
              <h1 class="text-navy" style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#0B1C3D;text-transform:uppercase;letter-spacing:1px;">New Session Booked</h1>
              <div class="hr-line" style="border-top:1px solid #C9A84C;margin-bottom:24px;width:100%;"></div>

              <p style="margin:0 0 20px;">
                A new mentorship session has been booked and paid for directly. Details are below.
              </p>

              <!-- Appointment Details Highlight Box -->
              <div class="highlight-box" style="background-color:#F7F4EB;border:1px solid #E5DFD0;border-radius:8px;padding:20px;text-align:center;margin:24px 0;">
                <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;margin-bottom:6px;">Scheduled Date & Time</div>
                <div class="ticket-code-val" style="font-size:22px;font-weight:700;color:#0B1C3D;font-family:Georgia,serif;margin-bottom:4px;">${bookingDate} @ ${bookingTime} (GMT)</div>
                <div style="font-size:12px;font-weight:600;color:#C9A84C;text-transform:uppercase;letter-spacing:1px;">${productTitle}</div>
              </div>

              <!-- Details Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:32px;border-collapse:collapse;border:1px solid #e5e0d8;border-radius:6px;overflow:hidden;">
                <tr class="detail-row row-bg" style="background-color:#FAF9F6;border-bottom:1px solid #e5e0d8;">
                  <td style="padding:14px 20px;font-weight:600;color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:130px;">Client</td>
                  <td class="text-dark" style="padding:14px 20px;color:#0B1C3D;font-weight:600;">${name}</td>
                </tr>
                <tr class="detail-row" style="border-bottom:1px solid #e5e0d8;">
                  <td style="padding:14px 20px;font-weight:600;color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</td>
                  <td class="text-dark" style="padding:14px 20px;color:#0B1C3D;font-weight:600;">
                    <a href="mailto:${email}" style="color:#0B1C3D;text-decoration:none;" class="text-dark">${email}</a>
                  </td>
                </tr>
                <tr class="detail-row row-bg" style="background-color:#FAF9F6;border-bottom:1px solid #e5e0d8;">
                  <td style="padding:14px 20px;font-weight:600;color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Amount Paid</td>
                  <td class="text-dark" style="padding:14px 20px;color:#0B1C3D;font-weight:600;">${currency} ${amount}</td>
                </tr>
                ${meetLink ? `
                <tr class="detail-row" style="border-bottom:1px solid #e5e0d8;">
                  <td style="padding:14px 20px;font-weight:600;color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Meet Link</td>
                  <td class="text-dark" style="padding:14px 20px;color:#0B1C3D;font-weight:600;">
                    <a href="${meetLink}" style="color:#0B1C3D;text-decoration:underline;">Join Meeting</a>
                  </td>
                </tr>
                ` : ''}
                <tr class="detail-row">
                  <td style="padding:14px 20px;font-weight:600;color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Stripe Ref</td>
                  <td class="text-dark" style="padding:14px 20px;color:#555;font-size:13px;font-family:monospace;">${stripeId}</td>
                </tr>
              </table>

              <p style="margin:0;font-size:12px;color:#999;" class="text-muted">
                Confirmed via Stripe webhook on ${new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} GMT
              </p>
            </td>
          </tr>

          <!-- Footer (Framed bottom band) -->
          <tr>
            <td class="footer-band" style="background-color:#FAF9F6;padding:20px 40px;border-top:1px solid #e5e0d8;text-align:center;">
              <p style="margin:0;font-size:11px;color:#aaa;" class="footer-text">
                Prime Counsel Limited Internal Notification · Do not reply directly to this email
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

export function clientDirectBookingEmailHtml({
  name,
  productTitle,
  bookingDate,
  bookingTime,
  meetLink,
}: {
  name: string
  productTitle: string
  bookingDate?: string
  bookingTime?: string
  meetLink?: string
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
    @media (prefers-color-scheme: dark) {
      .bg-body { background-color: #04082B !important; }
      .container { background-color: #0B0F3A !important; border-color: rgba(201, 168, 76, 0.2) !important; }
      .content-body { background-color: #0B0F3A !important; color: #ffffff !important; }
      .text-dark { color: #ffffff !important; }
      .text-navy { color: #C9A84C !important; }
      .text-muted { color: rgba(255, 255, 255, 0.7) !important; }
      .highlight-box { background-color: #12184E !important; border-color: rgba(201, 168, 76, 0.25) !important; }
      .ticket-code-val { color: #C9A84C !important; }
      .detail-row { border-color: rgba(255, 255, 255, 0.1) !important; }
      .footer-band { background-color: #04082B !important; border-top: 1px solid rgba(255, 255, 255, 0.05) !important; }
      .footer-text { color: rgba(255, 255, 255, 0.4) !important; }
      .hr-line { border-top: 1px solid rgba(255, 255, 255, 0.1) !important; }
    }
  </style>
</head>
<body class="bg-body" style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="bg-body" style="background-color: #FAF9F6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e5e0d8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          
          <!-- Header (Dark Navy Band) -->
          <tr>
            <td style="background-color: #0B1C3D; padding: 24px 40px; text-align: left; border-bottom: 2px solid #C9A84C;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <img src="https://primecounsel.co.uk/logos/logo-light.svg" alt="Prime Counsel" style="height: 38px; width: auto; display: block;" />
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 10px; font-weight: 700; color: #C9A84C; letter-spacing: 2px; text-transform: uppercase;">MENTORSHIP</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="content-body" style="padding: 40px; background-color: #ffffff; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
              <h1 class="text-navy" style="margin: 0 0 8px; font-family: Georgia, serif; font-size: 26px; font-weight: 400; color: #0B1C3D; text-transform: uppercase; letter-spacing: 1px;">Booking Confirmed</h1>
              <div class="hr-line" style="border-top: 1px solid #C9A84C; margin-bottom: 24px; width: 100%;"></div>

              <p style="margin: 0 0 20px;">Dear <strong class="text-dark" style="color: #0B1C3D;">${name}</strong>,</p>
              
              <p style="margin: 0 0 24px;">
                This email serves as the official confirmation for your payment and booking for the <strong>${productTitle}</strong>. This is a significant step towards achieving your strategic goals, and we are honoured to be part of your journey.
              </p>

              <!-- Appointment Details Highlight Box -->
              <div class="highlight-box" style="background-color: #F7F4EB; border: 1px solid #E5DFD0; border-radius: 8px; padding: 24px; text-align: center; margin: 32px 0;">
                <div style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; font-weight: 700; margin-bottom: 8px;">Scheduled Date & Time</div>
                <div class="ticket-code-val" style="font-size: 22px; font-weight: 700; color: #0B1C3D; font-family: Georgia, serif; margin-bottom: 4px;">${bookingDate || 'TBD'} @ ${bookingTime || 'TBD'} (GMT)</div>
                <div style="font-size: 13px; font-weight: 600; color: #C9A84C; text-transform: uppercase; letter-spacing: 1px;">${productTitle}</div>
                ${meetLink ? `
                <div style="margin-top: 16px;">
                  <a href="${meetLink}" style="display: inline-block; background-color: #0B1C3D; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 4px; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">
                    Join Google Meet
                  </a>
                </div>
                ` : ''}
              </div>

              <p style="margin: 0 0 24px;" class="text-muted">
                Please join the room at your scheduled time. The host will admit you shortly after you join.
              </p>

              <p style="margin: 0 0 32px;" class="text-muted">
                Should you have any questions ahead of our engagement, simply reply to this email.
              </p>

              <p style="margin: 0;" class="text-muted">
                With warm regards,<br/>
                <strong style="color: #0B1C3D;" class="text-dark">The Prime Counsel Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer (Framed bottom band) -->
          <tr>
            <td class="footer-band" style="background-color: #FAF9F6; padding: 24px 40px; border-top: 1px solid #e5e0d8;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-size: 12px; color: #9a9a9a;" class="footer-text">
                    <a href="https://primecounsel.co.uk" style="color: #C9A84C; text-decoration: none; font-weight: 600;">primecounsel.co.uk</a>
                  </td>
                  <td align="right" style="font-size: 12px; color: #9a9a9a;" class="footer-text">
                    &copy; 2026 Prime Counsel Limited. All rights reserved.
                  </td>
                </tr>
              </table>
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


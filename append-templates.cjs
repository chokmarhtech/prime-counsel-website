const fs = require('fs');
const path = require('path');

const newTemplates = `
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
  return \`
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
              <a href="\${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="\${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="\${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
                <!--<![endif]-->
              </a>
              <h1 class="header-title" style="margin:0;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#0B1C3D;letter-spacing:2px;text-transform:uppercase;">Secure<br/>Download</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">Dear <strong style="color:#0B1C3D;">\${name}</strong>,</p>
              
              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#4a4a4a;">
                Thank you for your purchase. Your payment for the <strong>\${productTitle}</strong> has been successfully processed and your secure download is now ready.
              </p>

              <!-- CTA Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0B1C3D;border-radius:4px;margin:32px 0;">
                <tr>
                  <td style="padding:40px;text-align:center;">
                    <p style="margin:0 0 20px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-family:Arial,sans-serif;font-weight:700;">Single-Use Access</p>
                    <h2 style="margin:0 0 24px;font-family:'Georgia',serif;font-size:20px;color:#ffffff;font-weight:400;">Download Your File</h2>
                    <a href="\${downloadUrl}" style="display: inline-block; background-color: #C9A84C; color: #0B1C3D; font-weight: bold; text-decoration: none; padding: 16px 32px; border-radius: 4px; text-transform: uppercase; font-size: 13px; letter-spacing: 1px;">
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
                © \${new Date().getFullYear()} Prime Counsel Limited. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
\`
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
  return \`
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
              <a href="\${SITE_URL}" style="display:inline-block; margin-bottom:16px; text-decoration:none;">
                <!-- Light Mode Logo (Navy Text) -->
                <img src="\${SITE_URL}/logos/logo-dark.svg" alt="Prime Counsel" class="logo-dark-mode" style="height:48px;width:auto;border:0;display:inline-block;" />
                <!-- Dark Mode Logo (White Text) -->
                <!--[if !mso]><!---->
                <img src="\${SITE_URL}/logos/logo-light.svg" alt="Prime Counsel" class="logo-light-mode" style="height:48px;width:auto;border:0;display:none;" />
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
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;font-weight:600;border-bottom:1px solid #e5e5e5;">\${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Email</td>
                  <td style="padding:14px 20px;font-size:14px;border-bottom:1px solid #e5e5e5;">
                    <a href="mailto:\${email}" style="color:#0B1C3D;text-decoration:none;">\${email}</a>
                  </td>
                </tr>
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Product</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;border-bottom:1px solid #e5e5e5;">\${productTitle}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;border-bottom:1px solid #e5e5e5;">Amount</td>
                  <td style="padding:14px 20px;font-size:14px;color:#0B1C3D;font-weight:700;border-bottom:1px solid #e5e5e5;">\${amount} \${currency}</td>
                </tr>
                <tr style="background-color:#FAF9F6;">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:700;">Stripe Ref</td>
                  <td style="padding:14px 20px;font-size:11px;font-family:monospace;color:#666;">\${stripeId}</td>
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
\`
}
`;

const filePath = path.join(__dirname, 'src/lib/email-templates.ts');
fs.appendFileSync(filePath, newTemplates, 'utf-8');
console.log('Templates appended successfully!');

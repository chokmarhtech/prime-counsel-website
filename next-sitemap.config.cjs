const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://primecounsel.co.uk'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/spm-3/usher',
    '/spm-3/pass/*',
    '/booking-success',
    '/mentorship/success',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/spm-3/usher',
          '/spm-3/pass/*',
          '/booking-success',
          '/mentorship/success',
        ],
      },
    ],
    additionalSitemaps: [`${SITE_URL}/blog-sitemap.xml`],
  },
}

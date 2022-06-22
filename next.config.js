const nextTranslate = require('next-translate')
// /** @type {import('next').NextConfig} */
module.exports = nextTranslate({
  reactStrictMode: true,
  i18n: {
    locales: ['zh-Hant', 'zh-Hans', 'en', 'jp'],
    defaultLocale: 'zh-Hant'
  }
})

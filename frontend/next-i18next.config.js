const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi'],
  },
  localePath: path.resolve('./public/locales'), // 🔥 This is required for production
};

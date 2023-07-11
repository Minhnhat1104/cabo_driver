/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      '@base': path.resolve(__dirname, 'src/base'),
      '@assets': path.resolve(__dirname, 'src/base/assets'),
      '@theme': path.resolve(__dirname, 'src/base/theme'),
      '@authentication': path.resolve(__dirname, 'src/authentication'),
      '@PhoneLogin': path.resolve(__dirname, 'src/PhoneLogin'),
      '@Home': path.resolve(__dirname, 'src/Home'),
    },
  },
};

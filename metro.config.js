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
  extraNodeModules: {
    '@base': path.resolve(__dirname, 'src/base'),
    '@assets': path.resolve(__dirname, 'src/base'),
    '@theme': path.resolve(__dirname, 'src/base'),
    '@authentication': path.resolve(__dirname, 'src/authentication'),
  },
};

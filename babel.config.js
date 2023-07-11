module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@base': './src/base',
          '@assets': './src/base/assets',
          '@theme': './src/base/theme',
          '@authentication': './src/authentication',
          '@PhoneLogin': './src/PhoneLogin',
          '@Home': './src/Home',
        },
      },
    ],
  ],
};

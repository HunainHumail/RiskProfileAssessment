module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@utils': './src/utils',
          '@components': './src/components',
          '@screens': './src/screens',
          '@data': './src/data',
          '@stores': './src/stores',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

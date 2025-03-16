module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    ],
    // react-native-dotenv
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env.local',
        blocklist: null,
        allowlist: null,
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};

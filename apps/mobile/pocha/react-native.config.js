module.exports = {
  commands: require('@callstack/repack/commands'),

  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // Disable auto-linking for iOS to avoid font duplication issues
      },
    },
  },

  assets: ['node_modules/@ant-design/icons-react-native/fonts'],
};

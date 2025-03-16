const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      '@': path.resolve(__dirname, 'src'),
    },
    watchFolders: [path.resolve(__dirname, '../../..')],
  },
};

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const {assetExts, sourceExts} = config.resolver;

  config.resolver.assetExts = assetExts.filter(ext => ext !== 'svg');
  config.resolver.sourceExts = [...sourceExts, 'svg'];

  config.transformer = {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  return config;
})();
// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

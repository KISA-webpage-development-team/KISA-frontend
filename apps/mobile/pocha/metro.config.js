const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const extraNodeModules = {
  '@': path.resolve(__dirname, 'src'),
};

// Ensure Metro resolves all necessary node_modules
const watchFolders = [
  path.resolve(__dirname, '..', '..', '..'),
  path.resolve(__dirname, 'node_modules'),
];

const config = {
  resolver: {
    unstable_enableSymlinks: true,
    resolverMainFields: ['browser', 'main', 'module'],
    extraNodeModules,
  },
  watchFolders,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// [NOTE] here, we need to set up addresses for the remote apps
// by using ScriptManager.shared.addResolver

import {AppRegistry, Platform} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {name as appName} from './app.json';
import App from './App';

const resolveURL = Federated.createURLResolver({
  containers: {
    pocha: 'http://localhost:9000/[name][ext]',
  },
});

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});

AppRegistry.registerComponent(appName, () => App);

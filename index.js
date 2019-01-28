import {AppRegistry} from 'react-native';
import test from './src/Test';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => test);

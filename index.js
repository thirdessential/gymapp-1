/**
 * @format
 */
import 'react-native-gesture-handler';
import 'moment';
import 'moment/locale/en-in';

import {LogBox} from 'react-native';
// Have to do this to suppress a warning from some package
LogBox.ignoreLogs(['Picker']);
LogBox.ignoreLogs(['VirtualizedLists']); // Regretfully this has to be done
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

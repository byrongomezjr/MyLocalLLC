/**
 * My Local LLC - React Native App
 * Connecting local businesses with their community
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#b8c54e"
      />
      <RootNavigator />
    </>
  );
}

export default App;

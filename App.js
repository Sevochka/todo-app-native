import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'
import * as eva from '@eva-design/eva';
import HomeScreen from './components/HomeScreen'
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function App() {
  return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark }}>
          <StatusBar style="auto" />
          <View style={styles.container}>
            <HomeScreen />
          </View>
        </ApplicationProvider>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
});

import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Font } from 'expo';
import HomeScreen from './HomeScreen';
import SpentMoneyScreen from './SpentMoneyScreen';
import HistoryScreen from './HistoryScreen';

const Nav = createStackNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: {header: null} },
    SpentMoney: { screen: SpentMoneyScreen, navigationOptions: {header: null} },
    History: { screen: HistoryScreen, navigationOptions: {header: null} },
  },
  {
    navigationOptions: { headerVisible: false }
  },
  {
      initialRouteName: 'Home',
  }
);

export class App extends React.Component {
  render() {
    return (
    <SafeAreaView style = {{ flex: 1 }}>
      <View style = {styles.container}>
        <AppBar />
        <Nav />
        <Footer />
      </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    flexDirection: 'column',
  },
});

// AppRegistry.registerComponent('BudgetMe', () => App);
export default createAppContainer(Nav);
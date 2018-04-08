import React from 'react';
import { Text, Animated, Easing } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import LoginScreen from '../Containers/LoginScreen';
import SignupScreen from '../Containers/SignupScreen';
import ForgottenPasswordScreen from '../Containers/ForgottenPasswordScreen';
import Standings from '../Containers/Standings';
import PlayerStats from '../Containers/PlayerStats';
import TeamStats from '../Containers/TeamStats';
import Leaders from '../Containers/Leaders';
import DrawerContainer from '../Containers/DrawerContainer';

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

// drawer stack
const DrawerStack = DrawerNavigator({
    standings: { screen: Standings },
    playerStats: { screen: PlayerStats },
    teamStats: { screen: TeamStats },
    leaders: {screen: Leaders},
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer
});

const drawerButton = (navigation) =>
  <Text
    style={{padding: 5, color: 'white'}}
    onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
  }>Menu</Text>


const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#4C3E54'},
    title: 'Welcome!',
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation)
  })
})

// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
  signupScreen: { screen: SignupScreen },
  forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: '#E73536'},
    title: 'You are not logged in',
    headerTintColor: 'white'
  }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig
});

export default PrimaryNav

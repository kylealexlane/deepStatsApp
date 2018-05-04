import React from 'react';
import { Text, Animated, Easing } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import LoginScreen from '../Containers/LoginScreen';
import SignupScreen from '../Containers/SignupScreen';
import ForgottenPasswordScreen from '../Containers/ForgottenPasswordScreen';
import Standings from '../Containers/Standings';
import PlayerStats from '../Containers/PlayerStats';
import TeamStats from '../Containers/TeamStats';
import Leaders from '../Containers/Leaders';
import PlayerDashboard from '../Containers/playerInfo/PlayerDashboard';
import GeneralShooting from '../Containers/playerInfo/GeneralShooting';
import DrawerContainer from '../Containers/DrawerContainer';
import { colors } from '../styles/commonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

// drawer stack
// const DrawerStack = DrawerNavigator({
//     standings: { screen: Standings },
//     playerStats: { screen: PlayerStats },
//     teamStats: { screen: TeamStats },
//     leaders: {screen: Leaders},
// }, {
//   gesturesEnabled: false,
//   contentComponent: DrawerContainer,
//     drawerWidth: 250,
//
// });

const PlayerStatsStack = StackNavigator({
    home: { screen: PlayerStats },
    playerDashboard: { screen: PlayerDashboard },
    generalShooting: { screen: GeneralShooting },
},{
    navigationOptions: {
        headerStyle: {borderBottomWidth: 0},
        // title: 'Test',
        // headerTintColor: 'white',
    }
});

const TabStack = TabNavigator(
    {
        standings: { screen: Standings },
        playerStats: { screen: PlayerStatsStack },
        teamStats: { screen: TeamStats },
        leaders: {screen: Leaders},
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'standings') {
                    iconName = `ios-stats${focused ? '' : '-outline'}`;
                } else if (routeName === 'playerStats') {
                    iconName = `ios-search${focused ? '' : '-outline'}`;
                } else if (routeName === 'teamStats') {
                    iconName = `ios-people${focused ? '' : '-outline'}`;
                } else if (routeName === 'leaders') {
                    iconName = `ios-star${focused ? '' : '-outline'}`;
                }
                // if (routeName === 'standings') {
                //     iconName = `sort-ascending`;
                // } else if (routeName === 'playerStats') {
                //     iconName = `human-greeting`;
                // } else if (routeName === 'teamStats') {
                //     iconName = `account-multiple`;
                // } else if (routeName === 'leaders') {
                //     iconName = 'trophy-award';
                // }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={30} color={tintColor} />;
            },
        tabBarLabel: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let label;
                if (routeName === 'standings') {
                    label = `Standings`;
                } else if (routeName === 'playerStats') {
                    label = `Players`;
                } else if (routeName === 'teamStats') {
                    label = `Teams`;
                } else if (routeName === 'leaders') {
                    label = 'Leaders';
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return `${label}`;
            },
        }),
        tabBarOptions: {
            activeTintColor: colors.greyLight,
            inactiveTintColor: colors.greyBase,
            activeBackgroundColor: colors.greyDarkest,
            inactiveBackgroundColor: colors.greyDarkest,
            style: {
                borderWidth: 0,
                // borderTopColor: colors.black,
                borderTopColor: colors.black,
                borderTopWidth: 1,
                padding: 3,
                backgroundColor: colors.greyDarkest
            },
            tabStyle: {
                borderWidth: 0,
                // borderTopColor: colors.black,
                borderTopColor: 'transparent',
            }
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);


// const drawerButton = (navigation) =>
//   <Text
//     style={{padding: 5, color: colors.baseText}}
//     onPress={() => {
//       // Coming soon: navigation.navigate('DrawerToggle')
//       // https://github.com/react-community/react-navigation/pull/2492
//       if (navigation.state.index === 0) {
//         navigation.navigate('DrawerOpen')
//       } else {
//         navigation.navigate('DrawerClose')
//       }
//     }
//   }>Menu</Text>


// const DrawerNavigation = StackNavigator({
//   DrawerStack: { screen: DrawerStack }
// }, {
//   headerMode: 'float',
//     navigationOptions: ({navigation}) => ({
//     headerStyle: {backgroundColor: colors.greyDarkest},
//     title: 'Welcome!',
//     headerTintColor: 'white',
//     gesturesEnabled: false,
//     headerLeft: drawerButton(navigation)
//   })
// })

// login stack
// const LoginStack = StackNavigator({
//   loginScreen: { screen: LoginScreen },
//   signupScreen: { screen: SignupScreen },
//   forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
// }, {
//   headerMode: 'screen',
//   navigationOptions: {
//     headerStyle: {backgroundColor: '#E73536'},
//     title: 'You are not logged in',
//     headerTintColor: 'white'
//   }
// });

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  tabStack: { screen: TabStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  // title: 'Main',
  initialRouteName: 'tabStack',
  transitionConfig: noTransitionConfig,
});

export default PrimaryNav

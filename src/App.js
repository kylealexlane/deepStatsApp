import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './Redux/index';
/*
* Both of the following files work for react-navigation
* Routes will always be added and supported by modifying
* the AppNavigation file.  Special redux actions/reducers
* will be handled in Redux Navigation
*   // use this to use react-navigation no redux
*   import AppNavigation from './Navigation/AppNavigation'
*
*   // use this to use react-navigation with redux
*   import ReduxNavigation from './Navigation/ReduxNavigation'
*/

// We're going to use navigation with redux
import AppNavigation from './Navigation/AppNavigation';

// create our store
const store = createStore();


export default class DeepStatsApp extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AppNavigation />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
// import React from 'react';
// import { Button, Image, View, Text, StyleSheet } from 'react-native';
// import { DrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
// import StandingsDivision from "./screens/StandingsDivision";
// import StandingsConference from "./screens/StandingsConference";
//
// // // class HomeScreen extends React.Component {
// // //     static navigationOptions = ({ navigation }) => {
// // //         const params = navigation.state.params || {};
// // //
// // //         return {
// // //             headerTitle: <LogoTitle />,
// // //             headerLeft: (
// // //                 <Button
// // //                     onPress={() => navigation.navigate('MyModal')}
// // //                     title="Info"
// // //                     color="#fff"
// // //                 />
// // //             ),
// // //             headerRight: (
// // //                 <Button onPress={params.increaseCount} title="+1" color="#fff" />
// // //             ),
// // //         };
// // //     };
// // //
// // //     componentWillMount() {
// // //         this.props.navigation.setParams({ increaseCount: this._increaseCount });
// // //     }
// // //
// // //     state = {
// // //         count: 0,
// // //     };
// // //
// // //     _increaseCount = () => {
// // //         this.setState({ count: this.state.count + 1 });
// // //     };
// // //
// // //     render() {
// // //         return (
// // //             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// // //                 <Text>Home Screen</Text>
// // //                 <Text>Count: {this.state.count}</Text>
// // //                 <Button
// // //                     title="Go to Details"
// // //                     onPress={() => {
// // //                         /* 1. Navigate to the Details route with params */
// // //                         this.props.navigation.navigate('Details', {
// // //                             itemId: 86,
// // //                             otherParam: 'First Details',
// // //                         });
// // //                     }}
// // //                 />
// // //             </View>
// // //         );
// // //     }
// // // }
// // //
// // // class DetailsScreen extends React.Component {
// // //     static navigationOptions = ({ navigation, navigationOptions }) => {
// // //         const { params } = navigation.state;
// // //
// // //         return {
// // //             title: params ? params.otherParam : 'A Nested Details Screen',
// // //             /* These values are used instead of the shared configuration! */
// // //             headerStyle: {
// // //                 backgroundColor: navigationOptions.headerTintColor,
// // //             },
// // //             headerTintColor: navigationOptions.headerStyle.backgroundColor,
// // //         };
// // //     };
// // //
// // //     render() {
// // //         /* 2. Read the params from the navigation state */
// // //         const { params } = this.props.navigation.state;
// // //         const itemId = params ? params.itemId : null;
// // //         const otherParam = params ? params.otherParam : null;
// // //
// // //         return (
// // //             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// // //                 <Text>Details Screen</Text>
// // //                 <Text>itemId: {JSON.stringify(itemId)}</Text>
// // //                 <Text>otherParam: {JSON.stringify(otherParam)}</Text>
// // //                 <Button
// // //                     title="Update the title"
// // //                     onPress={() =>
// // //                         this.props.navigation.setParams({ otherParam: 'Updated!' })}
// // //                 />
// // //                 <Button
// // //                     title="Go to Details... again"
// // //                     onPress={() => this.props.navigation.navigate('Details')}
// // //                 />
// // //                 <Button
// // //                     title="Go back"
// // //                     onPress={() => this.props.navigation.goBack()}
// // //                 />
// // //             </View>
// // //         );
// // //     }
// // // }
// //
// // class ModalScreen extends React.Component {
// //     render() {
// //         return (
// //             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //                 <Text style={{ fontSize: 30 }}>This is a modal!</Text>
// //                 <Button
// //                     onPress={() => this.props.navigation.goBack()}
// //                     title="Dismiss"
// //                 />
// //             </View>
// //         );
// //     }
// // }
// // //
// // // const MainStack = StackNavigator(
// // //     {
// // //         Home: {
// // //             screen: HomeScreen,
// // //         },
// // //         Details: {
// // //             screen: DetailsScreen,
// // //         },
// // //     },
// // //     {
// // //         initialRouteName: 'Home',
// // //         navigationOptions: {
// // //             headerStyle: {
// // //                 backgroundColor: '#f4511e',
// // //             },
// // //             headerTintColor: '#fff',
// // //             headerTitleStyle: {
// // //                 fontWeight: 'bold',
// // //             },
// // //         },
// // //     }
// // // );
// //
// // const RootStack = StackNavigator(
// //     {
// //         Main: {
// //             screen: Standings,
// //         },
// //         MyModal: {
// //             screen: ModalScreen,
// //         },
// //     },
// //     {
// //         mode: 'modal',
// //         headerMode: 'none',
// //     }
// // );
// //
// // export default class App extends React.Component {
// //     render() {
// //         return <RootStack />;
// //     }
// // }
// class MyHomeScreen extends React.Component {
//     static navigationOptions = {
//         drawerLabel: 'Home',
//         drawerIcon: ({ tintColor }) => (
//             <Image
//                 source={require('./data/exampleData/playerImages/stephenCurry.png')}
//                 style={[styles.icon, {tintColor: tintColor}]}
//             />
//         ),
//     };
//
//     render() {
//         return (
//             <Button
//                 onPress={() => this.props.navigation.navigate('DrawerToggle')}
//                 title="Go to notifications"
//                 style={{backgroundColor: 'blue'}}
//             />
//         );
//     }
// }
//
// class MyNotificationsScreen extends React.Component {
//     static navigationOptions = {
//         drawerLabel: 'Notifications',
//         drawerIcon: ({ tintColor }) => (
//             <Image
//                 source={require('./data/exampleData/playerImages/stephenCurry.png')}
//                 style={[styles.icon, {tintColor: tintColor}]}
//             />
//         ),
//     };
//
//     render() {
//         return (
//             <Button
//                 onPress={() => this.props.navigation.goBack()}
//                 title="Go back home"
//             />
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     icon: {
//         width: 24,
//         height: 24,
//     },
// });
//
// const DeepStats = DrawerNavigator(
//     {
//         Home: {
//             screen: StandingsConference,
//         },
//         Details: {
//             screen: StandingsDivision,
//         },
//     },
//     {
//         initialRouteName: 'Home',
//             navigationOptions: {
//         headerStyle: {
//             backgroundColor: 'orange',
//         },
//         headerTintColor: '#fff',
//             headerTitleStyle: {
//             fontWeight: 'bold',
//         },
//     },
// });
//
// export default class DeepStatsApp extends React.Component {
//     render() {
//         return <DeepStats />;
//     }
// }

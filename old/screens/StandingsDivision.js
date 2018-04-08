import React from 'react';
import {Button, Image, View, Text, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
            title: 'Division Standings',
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
            drawerLabel: 'Notifications',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../data/exampleData/playerImages/stephenCurry.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        };
    };

    render() {
        /* 2. Read the params from the navigation state */
        const { params } = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        const otherParam = params ? params.otherParam : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Button
                    title="Update the title"
                    onPress={() =>
                        this.props.navigation.setParams({ otherParam: 'Updated!' })}
                />
                <Button
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    onPress={() => this.props.navigation.navigate('DrawerToggle')}
                    title="navbar toggle"
                    style={{backgroundColor: 'blue'}}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

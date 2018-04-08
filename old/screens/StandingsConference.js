import React from 'react';
import {Button, Image, View, Text, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LogoTitle from '../components/Logo';

export default class StandingsConference extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: 'Conference Standings',
            headerLeft: (
                <Button
                    onPress={() => navigation.navigate('MyModal')}
                    title="Info"
                    color="#fff"
                />
            ),
            headerRight: (
                <Button onPress={params.increaseCount} title="+1" color="#fff" />
            ),
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../data/exampleData/playerImages/stephenCurry.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        };
    };

    componentWillMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    state = {
        count: 0,
    };

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    };



    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Text>Count: {this.state.count}</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        this.props.navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'First Details',
                        });
                    }}
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

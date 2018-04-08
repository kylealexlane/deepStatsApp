import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('../../spiro.png')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { List} from 'react-native-elements'
import { colors, } from '../../styles/commonStyles'

export default class VerticalSeperator extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={styles.seperator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seperator: {
        height: '90%',
        backgroundColor: colors.greyBase,
        width: 1
    }
});
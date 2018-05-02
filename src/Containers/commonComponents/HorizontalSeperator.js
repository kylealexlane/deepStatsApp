import React, { Component } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { List} from 'react-native-elements'
import { colors, } from '../../styles/commonStyles'

export default class HorizontalSeperator extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={[styles.seperator, this.props.containerStyles ? this.props.containerStyles : null ]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seperator: {
        width: '90%',
        backgroundColor: colors.greyBase,
        height: 1
    }
});
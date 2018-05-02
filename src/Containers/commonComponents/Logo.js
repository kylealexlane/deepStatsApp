import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { List} from 'react-native-elements'
import { colors, appFonts } from '../../styles/commonStyles'

export default class Logo extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Text style={[this.props.textStyles ? this.props.textStyles : [{...appFonts.lgBold}], this.props.textStyles.color ? this.props.textStyles.color : { color: colors.white }]}>
                <Text>D</Text>
                <Text style={{ color: colors.highlight }}>ee</Text>
                <Text>p</Text>
            </Text>
        );
    }
}
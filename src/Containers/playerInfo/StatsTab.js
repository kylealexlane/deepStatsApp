import React, { Component } from 'react'
import {
    AppRegistry,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ListView,
    SafeAreaView,
    Image,
} from 'react-native'
import { nbaId, year } from '../../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts } from '../../styles/commonStyles'
import { round } from "../../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'

import VerticalSeperator from '../commonComponents/VerticalSeperator'

export default class StatsTab extends React.Component {
    constructor(props){
        super(props);
        this.state ={
        }
    }

    render() {
        console.log('props', this.props);
        const currentYearStats = this.props.parentState.playerStats[0].rowSet[this.props.parentState.playerStats[0].rowSet.length-1];
        const numGames = currentYearStats[6];
        return (
            <View style={styles.statsContainer}>
                <View style={[styles.statsRowContainer]}>
                    <Text style={[styles.mainTextColor, styles.statsTextLarge]}>{currentYearStats[1]}</Text>
                </View>
                <View style={[styles.statsRowContainer, { paddingTop: 10 }]}>
                    <View style={[styles.statsRowSubContainer]}>
                        <Text>
                            <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                                GP
                            </Text>
                        </Text>
                        <Text>
                            <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                                {currentYearStats[6]}
                            </Text>
                        </Text>
                    </View>

                    <VerticalSeperator/>

                    <View style={[styles.statsRowSubContainer]}>
                        <Text>
                            <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                                MPG
                            </Text>
                        </Text>
                        <Text>
                            <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                                {currentYearStats[8]}
                            </Text>
                        </Text>
                    </View>

                    <VerticalSeperator/>


                    <View style={[styles.statsRowSubContainer]}>
                        <Text>
                            <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                                PPG
                            </Text>
                        </Text>
                        <Text>
                            <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                                {currentYearStats[26]}
                            </Text>
                        </Text>
                    </View>

                    <VerticalSeperator/>


                    <View style={[styles.statsRowSubContainer]}>
                        <Text>
                            <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                                APG
                            </Text>
                        </Text>
                        <Text>
                            <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                                {currentYearStats[21]}
                            </Text>
                        </Text>
                    </View>

                    <VerticalSeperator/>

                    <View style={[styles.statsRowSubContainer]}>
                        <Text>
                            <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                                FG%
                            </Text>
                        </Text>
                        <Text>
                            <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                                {currentYearStats[11]}
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statsTabContainer: {
        backgroundColor: 'green',
    },
    container: {
        flex:1,
        backgroundColor: colors.greyDarkest
    },
    headerContainer: {
        width: '100%',
        height: 200,
        overflow: 'hidden'
    },
    headerBackgroundLogo: {
        width: windowSize.width*2,
        height: windowSize.width*2,
        opacity: 0.1,
        alignSelf: 'center',
        position: 'absolute',
        top: -(windowSize.width)+100
    },
    linearGradient: {
        width: '100%',
        height: 200,
    },
    mainTextColor: {
        color: colors.greyLightest,
    },
    statsSubTextColor: {
        color: colors.greyBase
    },
    subTextColor: {
        color: colors.greyLighter,
    },
    largeText: {
        ...appFonts.xxlBold
    },
    mediumText: {
        ...appFonts.xlBold
    },
    tabText: {
        ...appFonts.lgRegular,
        color: colors.greyLightest
    },
    tabTextSelected: {
        borderBottomWidth: 1,
        borderBottomColor: colors.highlight
    },
    tabContainer: {
        flex: 0,
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16
    },
    statsTextLarge: {
        ...appFonts.lgBold
    },
    statsRowContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20
    },
    statsRowSubContainer: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftBorder: {
        borderLeftWidth: 1,
        borderColor: colors.greyBase
    },
    rightBorder: {
        borderRightWidth: 1,
        borderColor: colors.greyBase
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderColor: colors.greyBase
    },
    topBorder: {
      borderTopWidth: 1,
      borderColor: colors.greyBase
    },
    statsTextSmaller: {
        ...appFonts.mdRegular
    },
});
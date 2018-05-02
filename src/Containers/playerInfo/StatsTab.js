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
    Picker
} from 'react-native'
import { nbaId, year } from '../../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts } from '../../styles/commonStyles'
import { round } from "../../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import moment from 'moment'

import VerticalSeperator from '../commonComponents/VerticalSeperator'
import HorizontalSeperator from "../commonComponents/HorizontalSeperator"
import Logo from '../commonComponents/Logo'

export default class StatsTab extends React.Component {
    constructor(props){
        super(props);
        this.state ={
        }
    }

    render() {
        console.log('props', this.props);
        const currentYearStats = this.props.parentState.playerStats[0].rowSet[this.props.parentState.playerStats[0].rowSet.length-1];
        const careerStats = this.props.parentState.playerStats[1].rowSet[0];
        const numGames = currentYearStats[6];
        return (
            <View style={styles.statsContainer}>
                <View style={[styles.statsRowContainer]}>
                    <View style={{flex: 0}}>
                        <Text style={[styles.statsHighlightTextColor, styles.statsTextLarge, {...appFonts.xlBold}]}>{currentYearStats[1]}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', flex: 1}}>
                        <EntypoIcon name="select-arrows" size={20} color={colors.highlight} />
                        {/*<Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>(Per Game)</Text>*/}
                    </View>
                    <View>
                        <MaterialCommunityIcon name="chevron-right" size={30} color={colors.highlight} />
                    </View>
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
                                GS
                            </Text>
                        </Text>
                        <Text>
                            <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                                {currentYearStats[7]}
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
                                TEAM
                            </Text>
                        </Text>
                        <Text>
                            <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                                {currentYearStats[4]}
                            </Text>
                        </Text>
                    </View>

                    <VerticalSeperator/>


                    <View style={[styles.statsRowSubContainer]}>
                        <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                            AGE
                        </Text>
                        <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                            {currentYearStats[5]}
                        </Text>
                    </View>
                </View>

                <View style={{paddingTop: 10}}/>
                <HorizontalSeperator containerStyles={{width: '100%'}}/>

                <View style={[styles.statsRowContainer, { paddingTop: 10 }]}>
                    <View style={[styles.statsRowSubContainer]}>
                        <Text>
                            <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                                PTS
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
                                AST
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
                                REB
                            </Text>
                        </Text>
                        <Text>
                            <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                                {currentYearStats[20]}
                            </Text>
                        </Text>
                    </View>

                    <VerticalSeperator/>

                    <View style={[styles.statsRowSubContainer]}>
                        <Text>
                            <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                                STL
                            </Text>
                        </Text>
                        <Text>
                            <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                                {currentYearStats[22]}
                            </Text>
                        </Text>
                    </View>

                    <VerticalSeperator/>

                    <View style={[styles.statsRowSubContainer]}>
                        <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                            BLK
                        </Text>
                        <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                            {currentYearStats[23]}
                        </Text>
                    </View>
                </View>










                <View style={[styles.statsRowContainer, styles.darkBorderTop]}>
                    <Text style={[styles.statsHighlightTextColor, styles.statsTextLarge]}>
                        Shooting
                    </Text>
                    <View style={[styles.statsRowSubContainer]}>
                        <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                            FT%
                        </Text>
                        <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                            {currentYearStats[17]}
                        </Text>
                    </View>
                    <View style={[styles.statsRowSubContainer]}>
                        <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                            3%
                        </Text>
                        <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                            {currentYearStats[14]}
                        </Text>
                    </View>
                    <View style={[styles.statsRowSubContainer]}>
                        <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                            FG%
                        </Text>
                        <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                            {currentYearStats[11]}
                        </Text>
                    </View>
                    <View>
                        <MaterialCommunityIcon name="chevron-right" size={30} color={colors.highlight} />
                    </View>
                </View>


                <View style={[styles.statsRowContainer, styles.darkBorderTop]}>
                    <Text style={[styles.statsHighlightTextColor, styles.statsTextLarge]}>
                        Career
                    </Text>
                    <View style={[styles.statsRowSubContainer]}>
                        <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                            PTS
                        </Text>
                        <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                            {careerStats[23]}
                        </Text>
                    </View>
                    <View style={[styles.statsRowSubContainer]}>
                        <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                            AST
                        </Text>
                        <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                            {currentYearStats[18]}
                        </Text>
                    </View>
                    <View style={[styles.statsRowSubContainer]}>
                        <Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>
                            BLK
                        </Text>
                        <Text style={[styles.mainTextColor, styles.statsTextLarge]}>
                            {currentYearStats[20]}
                        </Text>
                    </View>
                    <View>
                        <MaterialCommunityIcon name="chevron-right" size={30} color={colors.highlight} />
                    </View>
                </View>


                <View style={[styles.statsRowContainer, styles.darkBorderTop]}>
                    <Text>
                        <Text style={[styles.statsSubTextColor, styles.statsTextLarge]}>
                            Deep{' '}
                        </Text>
                        <Text style={[styles.statsHighlightTextColor, styles.statsTextLarge]}>
                            Rebounding
                        </Text>
                    </Text>
                    <View>
                        <MaterialCommunityIcon name="chevron-right" size={30} color={colors.highlight} />
                    </View>
                </View>

                <View style={[styles.statsRowContainer, styles.darkBorderTop]}>
                    <Text>
                        <Text style={[styles.statsSubTextColor, styles.statsTextLarge]}>
                            Deep{' '}
                        </Text>
                        <Text style={[styles.statsHighlightTextColor, styles.statsTextLarge]}>
                            Defense
                        </Text>
                    </Text>
                    <View>
                        <MaterialCommunityIcon name="chevron-right" size={30} color={colors.highlight} />
                    </View>
                </View>

                <View style={[styles.statsRowContainer, styles.darkBorderTop]}>
                    <Text>
                        <Text style={[styles.statsSubTextColor, styles.statsTextLarge]}>
                            Deep{' '}
                        </Text>
                        <Text style={[styles.statsHighlightTextColor, styles.statsTextLarge]}>
                            Shooting Locations
                        </Text>
                    </Text>
                    <View>
                        <MaterialCommunityIcon name="chevron-right" size={30} color={colors.highlight} />
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
    statsHighlightTextColor: {
        color: colors.highlight
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
    darkBorderTop: {
        borderTopColor: colors.black,
        borderTopWidth: 1,
        paddingTop: 12,
        marginTop: 12
    }
});
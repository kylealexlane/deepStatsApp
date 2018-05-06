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
    // ListView,
    SafeAreaView,
    Image,
} from 'react-native'
import { nbaId, year } from '../../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts, containerStyle } from '../../styles/commonStyles'
import { playerPic, hexToRgbA, capitalizeFirstLetter, swapInArray, colorLuminance } from "../../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import EntypoIcon from 'react-native-vector-icons/Entypo'


import RNPickerSelect from 'react-native-picker-select';

import { Table, TableWrapper, Row } from 'react-native-table-component';

import StatsTab from './StatsTab';

import GeneralTable from '../commonComponents/GeneralTable'

export default class GeneralShooting extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            // title: params ? params.playerName : 'Shooting',
            title: 'Shooting',

            headerStyle: {
                backgroundColor: params.playerTeamShort ? hexToRgbA(teamColors[params.playerTeamShort].primary, 1) : colors.greyDarkest,
                // borderBottomColor: params.playerTeamShort ? teamColors[params.playerTeamShort].secondary : colors.greyDarkest
                borderBottomColor: 'transparent'

            },
            headerTitleStyle: {
                ...appFonts.lgBold,
                color: colors.white
            },
            // headerTintColor: params.playerTeamShort ? teamColors[params.playerTeamShort].secondary : colors.white,
            headerTintColor: colors.white,

            // headerBackground:  <Image
            //     style={styles.headerBackgroundLogo}
            //     source={{uri: params ? params.teamImageURI : ''}}
            // />,
            headerTransparent: false,
        }
    };

    constructor(props) {
        super(props);
        this.inputRefs = {};
        console.log('passedParams', this.props.navigation.state.params);
        this.state = {
            // tableHeadOverall: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
            tableHeadOverall: ['TYPE', 'FREQ', 'FGM', 'FGA', 'FG%', 'EFG%', '2FREQ', 'FG2M', 'FG2A', 'FG2%', '3FREQ', 'FG3M', 'FG3A', 'FG3%',],
            tableDataOverall: [],
            widthArrOverall: [120, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],

            tableHeadShotClock: ['TYPE', 'FREQ', 'FGM', 'FGA', 'FG%', 'EFG%', '2FREQ', 'FG2M', 'FG2A', 'FG2%', '3FREQ', 'FG3M', 'FG3A', 'FG3%',],
            tableDataShotClock: [],
            widthArrShotClock: [120, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],

            tableHeadDribble: ['TYPE', 'FREQ', 'FGM', 'FGA', 'FG%', 'EFG%', '2FREQ', 'FG2M', 'FG2A', 'FG2%', '3FREQ', 'FG3M', 'FG3A', 'FG3%',],
            tableDataDribble: [],
            widthArrDribble: [120, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],

            tableHeadClosestD: ['TYPE', 'FREQ', 'FGM', 'FGA', 'FG%', 'EFG%', '2FREQ', 'FG2M', 'FG2A', 'FG2%', '3FREQ', 'FG3M', 'FG3A', 'FG3%',],
            tableDataClosestD: [],
            widthArrClosestD: [145, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],

            seasonSelected: this.props.navigation.state.params.seasonSelected,
            seasons: this.props.navigation.state.params.seasons,
        }
    }

    componentWillMount() {
        console.log('id', this.props.navigation.state.params.playerId);
        console.log('teamId', this.props.navigation.state.params.teamId);
        this.fetchNewData(this.state.seasonSelected);
    }

    fetchNewData(season) {
        return fetch(`https://stats.nba.com/stats/playerdashptshots/?perMode=PerGame&leagueId=00&season=${season[1]}&seasonType=Regular+Season&playerId=${this.props.navigation.state.params.playerId}&teamId=${season[3]}&outcome=&location=&month=0&seasonSegment=&dateFrom=&dateTo=&opponentTeamId=0&vsConference=&vsDivision=&gameSegment=&period=0&lastNGames=0`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('response!', responseJson);
                // console.log(responseJson.resultSets[0].rowSet.length-1[4]);
                let data = responseJson.resultSets[1].rowSet;
                data.push(responseJson.resultSets[0].rowSet[0]);
                const newData = data.map((dataRow, index) => {
                    return dataRow.slice(5);
                });

                let shotClockData = responseJson.resultSets[2].rowSet;
                const newShotClockData = shotClockData.map((dataRow, index) => {
                    return dataRow.slice(5);
                });


                let dribbleData = responseJson.resultSets[3].rowSet;
                const newDribbleData = dribbleData.map((dataRow, index) => {
                    return dataRow.slice(5);
                });


                let closestD = responseJson.resultSets[4].rowSet;
                const newClosestD = closestD.map((dataRow, index) => {
                    return dataRow.slice(5);
                });


                this.setState({
                    tableDataOverall: newData,
                    tableDataShotClock: newShotClockData,
                    tableDataDribble: newDribbleData,
                    tableDataClosestD: newClosestD,
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        const state = this.state;
        const tableDataOverall = state.tableDataOverall;
        console.log('seasonSelected', this.state.seasonSelected);
        const firstLast = this.props.navigation.state.params.playerName.split(" ");
        return (
            <ScrollView style={styles.container}>
                <View style={styles.selectorContainer}>
                    <View style={{flex: 0}}>
                        {/*<Text style={[styles.statsHighlightTextColor, styles.statsTextLarge, {...appFonts.xlBold}]}>{currentYearStats[1]}</Text>*/}
                        <RNPickerSelect
                            placeholder={{
                            }}
                            items={this.state.seasons}
                            onValueChange={(value, index) => {
                                this.fetchNewData(value);
                                this.setState({
                                    seasonSelected: value,
                                    seasonSelectedLabel: this.state.seasons[index].label
                                });
                            }}
                            // onUpArrow={() => {
                            //     this.inputRefs.name.focus();
                            // }}
                            // onDownArrow={() => {
                            //     this.inputRefs.picker2.togglePicker();
                            // }}
                            hideIcon={true}
                            // placeholderColor={colors.highlight}
                            style={{ ...pickerSelectStyles }}
                            value={this.state.seasonSelected}
                            ref={(el) => {
                                this.inputRefs.picker = el;
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', flex: 1}}>
                        <EntypoIcon name="select-arrows" size={20} color={teamColors[this.props.navigation.state.params.playerTeamShort].primary} onPress={() => {
                            console.log('toggling');
                            this.inputRefs.picker.togglePicker();
                        }}/>
                        {/*<Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>(Per Game)</Text>*/}
                    </View>
                </View>
                <View style={[{paddingHorizontal: 16, paddingVertical: 16, justifyContent: 'flex-start', flexDirection: 'row'}]}>
                    {/*<View style={[containerStyle.rowContainer, {paddingHorizontal: 8, paddingVertical: 16, justifyContent: 'center'}]}>*/}
                    <View style={[styles.displayContainer, {alignItems: 'flex-start'}]}>
                        <Text style={styles.besideSelectorSecondaryText}>{firstLast[0].toUpperCase()}</Text>
                        <Text style={styles.besideSelectorText}>{firstLast[1].toUpperCase()}</Text>
                    </View>
                    <View style={styles.displayContainer}>
                        <Text style={styles.besideSelectorSecondaryText}>GP</Text>
                        <Text style={styles.besideSelectorText}>{this.state.seasonSelected[7]}</Text>
                    </View>
                    <View style={styles.displayContainer}>
                        <Text style={styles.besideSelectorSecondaryText}>TEAM</Text>
                        <Text style={styles.besideSelectorText}>{this.state.seasonSelected[4]}</Text>
                    </View>
                </View>
                <GeneralTable
                    showSwipeIcon={true}
                    title={'GENERAL'}
                    headerRow={this.state.tableHeadOverall}
                    rowsData={this.state.tableDataOverall}
                    widthArr={this.state.widthArrOverall}
                    titleStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  hexToRgbA(teamColors[this.props.navigation.state.params.playerTeamShort].primary, 1) : colors.greyDarkest }}
                    headerStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  colorLuminance(teamColors[this.props.navigation.state.params.playerTeamShort].primary, -0.5) : colors.greyDarkest }}
                />
                <GeneralTable
                    containerStyle={styles.tableContainer}
                    showSwipeIcon={true}
                    title={'SHOT CLOCK'}
                    headerRow={this.state.tableHeadShotClock}
                    rowsData={this.state.tableDataShotClock}
                    widthArr={this.state.widthArrShotClock}
                    titleStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  hexToRgbA(teamColors[this.props.navigation.state.params.playerTeamShort].primary, 1) : colors.greyDarkest }}
                    headerStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  colorLuminance(teamColors[this.props.navigation.state.params.playerTeamShort].primary, -0.5) : colors.greyDarkest }}
                />
                <GeneralTable
                    containerStyle={styles.tableContainer}
                    showSwipeIcon={true}
                    title={'DRIBBLES'}
                    headerRow={this.state.tableHeadDribble}
                    rowsData={this.state.tableDataDribble}
                    widthArr={this.state.widthArrDribble}
                    titleStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  hexToRgbA(teamColors[this.props.navigation.state.params.playerTeamShort].primary, 1) : colors.greyDarkest }}
                    headerStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  colorLuminance(teamColors[this.props.navigation.state.params.playerTeamShort].primary, -0.5) : colors.greyDarkest }}
                />
                <GeneralTable
                    containerStyle={styles.tableContainer}
                    showSwipeIcon={true}
                    title={'CLOSEST DEFENDER'}
                    headerRow={this.state.tableHeadClosestD}
                    rowsData={this.state.tableDataClosestD}
                    widthArr={this.state.widthArrClosestD}
                    titleStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  hexToRgbA(teamColors[this.props.navigation.state.params.playerTeamShort].primary, 1) : colors.greyDarkest }}
                    headerStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  colorLuminance(teamColors[this.props.navigation.state.params.playerTeamShort].primary, -0.5) : colors.greyDarkest }}
                />
                <View style={styles.blankView}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingVertical: 30, backgroundColor: colors.baseBackground },
    header: { height: 30, backgroundColor: colors.greyDarkest },
    text: { textAlign: 'center', ...appFonts.smRegular, color: colors.mainTextColor },
    dataWrapper: { marginTop: -1 },
    row: { height: 20, backgroundColor: colors.baseBackground },
    secondaryRow: {
        backgroundColor: colors.secondaryBackground
    },
    headerBackgroundLogo: {
        width: windowSize.width*2,
        // height: windowSize.width*2,
        opacity: 0.1,
        alignSelf: 'center',
        // position: 'absolute',
        // top: -(windowSize.width)+100
    },
    tableContainer: {
        marginTop: 30
    },
    blankView: {
        height: 50
    },
    nameText: {
        ...appFonts.xxxlBold,
        color: colors.mainTextColor,
        textAlign: 'center'
    },
    selectorContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16
    },
    displayContainer: {
        flex: 1,
        flexDirection: 'column',
        // flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    besideSelectorText: {
        color: colors.mainTextColor,
        ...appFonts.xlBold
    },
    besideSelectorSecondaryText: {
        color: colors.secondaryText,
        ...appFonts.lgBold
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        ...appFonts.xxlBold,
        color: colors.mainTextColor,
    },
    // placeholderColor: { color: 'red' },
});
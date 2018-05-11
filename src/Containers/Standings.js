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
    FlatList,
    Image,
    ActivityIndicator,
} from 'react-native'
import { nbaId, year } from '../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts } from '../styles/commonStyles'
import {playerPic, hexToRgbA, capitalizeFirstLetter, colorLuminance} from "../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import moment from 'moment'
import SVGImage from 'react-native-svg-image'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

import GameScore from './commonComponents/GameScore'

import GeneralTable from './commonComponents/GeneralTable'

import StatsTab from './playerInfo/StatsTab';
import VerticalSeperator from "./commonComponents/VerticalSeperator";

export default class Scores extends React.Component {
    static navigationOptions = {
        // header: null,

        // title: 'Standings',

        headerStyle: {
            backgroundColor: colors.mainAccent,
            // borderBottomColor: params.playerTeamShort ? teamColors[params.playerTeamShort].secondary : colors.greyDarkest
            borderBottomColor: colors.mainAccent,
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
    };

    constructor(props){
        super(props);
        this.fetchOverallStandings = this.fetchOverallStandings.bind(this);
        this.renderTabHeader = this.renderTabHeader.bind(this);
        this.state ={
            teams: [],
            loading: false,
            error: false,
            tableHeadOverall: ['TEAM', 'WINS', 'LOSSES', 'WIN%', 'GB', 'FG%', 'EFG%', '2FREQ', 'FG2M', 'FG2A', 'FG2%', '3FREQ', 'FG3M', 'FG3A'],
            tableDataOverall: [],
            widthArrOverall: [120, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
            arrayOfConferences: [],
            tabSelected: 'Conference'
        }
    }

    componentDidMount() {
        this.fetchOverallStandings();
    }

    fetchOverallStandings() {
        this.setState({ loading: true, error: false });
        return fetch(`https://ca.global.nba.com/stats2/season/conferencestanding.json?locale=en`)
        // return fetch(`https://ca.global.nba.com/stats2/scores/gamedaystatus.json?gameDate=${date}&locale=en&tz=${tz}`)
            .then((response) =>
                response.json())
            .then((responseJson) => {
                console.log('response from gameday3', responseJson);
                if(responseJson.payload.standingGroups && responseJson.payload.standingGroups.length > 0) {
                    const teams = responseJson.payload.standingGroups;
                    const season = responseJson.payload.season.statsSeasonYearDisplay;
                    console.log('teatssss', teams);
                    // const streak = obj.isWinStreak ? `won ${obj.streak}` : `lost ${obj.streak}`;
                    let arrayOfConferences = [];
                    teams.forEach((obj) => {
                        let arrayOfTeamsInConference = [];
                        const displayHeader = obj.displayConference;

                        obj.teams.forEach((teamObj)=>{
                            const {profile, standings} = teamObj;
                            const arrayOfTeamInfo = [
                                `${standings.confRank} ${profile.displayAbbr}`,
                                standings.wins,
                                standings.losses,
                                standings.winPct,
                                standings.confGamesBehind
                            ];
                            arrayOfTeamsInConference[standings.confRank-1] = arrayOfTeamInfo;
                            console.log('arrayOfTeamsInConference',arrayOfTeamsInConference);
                        });
                        arrayOfConferences.push( arrayOfTeamsInConference );
                    });
                    this.setState({
                        arrayOfConferences,
                        loading: false
                    });
                } else {
                    this.setState({ error: true, loading: false, teams: [] });
                }
            })
            .catch((error) =>{
                console.error(error);
                this.setState({ loading: false });
                this.setState({ error: true });
            });
    }

    showLoadingIndicator() {
        return (
            <ActivityIndicator
                size="large"
                color={colors.mainAccent}
                animating={this.state.loading}
                style={styles.activityIndicator}
            />
        );
    }

    renderTabHeader(title, position) {
        const isTabSelected = this.state.tabSelected === title;
        console.log(title, this.state.tabSelected);
        return(
            <View style={[
                styles.tabHeaderContainer,
                isTabSelected && styles.selectedTabContainer
            ]}>
                <Text style={[
                    styles.tabHeaderText,
                    isTabSelected && styles.selectedTabText
                ]}>{title}</Text>
            </View>
        );
    }


    render() {
        console.log('state', this.state.arrayOfConferences);
        return (
            <SafeAreaView style={{flex:1, backgroundColor: colors.baseBackground }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.mainAccent}
                />
                <View style={styles.container}>
                    <View style={styles.chooseDateBar}>
                        {/*<MaterialIcons*/}
                            {/*name={'chevron-left'}*/}
                            {/*size={30}*/}
                            {/*color={colors.white}*/}
                            {/*style={styles.iconStyle}*/}
                            {/*onPress={this.moveDateDown}*/}
                        {/*/>*/}
                        {/*<View style={styles.rowContainer}>*/}
                            {/*<Text style={styles.dateText}>{this.getCurrentDateDisplay()}</Text>*/}
                            {/*<Octicons*/}
                                {/*name={'calendar'}*/}
                                {/*size={20}*/}
                                {/*color={colors.white}*/}
                                {/*style={styles.iconStyle}*/}
                                {/*onPress={this.launchCalendar}*/}
                            {/*/>*/}
                        {/*</View>*/}
                        {/*<MaterialIcons*/}
                            {/*name={'chevron-right'}*/}
                            {/*size={30}*/}
                            {/*color={colors.white}*/}
                            {/*style={styles.iconStyle}*/}
                            {/*onPress={this.moveDateUp}*/}
                        {/*/>*/}
                        {this.renderTabHeader('Conference', 'center')}
                        {this.renderTabHeader('Division', 'center')}
                        {this.renderTabHeader('Overall', 'center')}

                    </View>
                    {this.state.loading ? this.showLoadingIndicator() :
                        this.state.arrayOfConferences.length > 1 &&
                        <GeneralTable
                            showHideIcon={true}
                            errorMessage={this.state.error ? 'Data not available' : ''}
                            title={'EAST'}
                            headerRow={this.state.tableHeadOverall}
                            rowsData={this.state.arrayOfConferences[0]}
                            widthArr={this.state.widthArrOverall}
                            titleStyle={{ backgroundColor: hexToRgbA(colors.mainAccent, 1) }}
                            headerStyle={{ backgroundColor: hexToRgbA(colors.mainAccent, 1) }}
                        />
                    }

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.baseBackground,
    },
    chooseDateBar: {
        width: '100%',
        // paddingTop: 8,
        // paddingHorizontal: 1,
        backgroundColor: colors.mainAccent,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    dateText: {
        ...appFonts.lgMedium,
        color: colors.white,
        marginRight: 8
    },
    rowContainer: {
        flexDirection: 'row'
    },
    tabHeaderContainer: {
        flex: 1,
        backgroundColor: colors.mainAccent,
        paddingVertical: 8
    },
    tabHeaderText: {
        ...appFonts.mdRegular,
        color: colors.greyBase,
        textAlign: 'center',
    },
    selectedTabContainer: {
        // backgroundColor: colors.mainAccent,
        // borderTopRightRadius: 4,
        // borderTopLeftRadius: 4
    },
    selectedTabText: {
        ...appFonts.mdRegular,
        color: colors.white,
        textAlign: 'center'
    },
    activityIndicator: {
        marginTop: 32,
    },
    flatList: {
        // paddingBottom: 200
    },
    noGamesText: {
        ...appFonts.mdMedium,
        color: colors.secondaryText,
        textAlign: 'center',
        marginTop: 32
    }
});

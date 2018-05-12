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
import PageTitle from './commonComponents/PageTitle'

import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';


import StatsTab from './playerInfo/StatsTab';
import VerticalSeperator from "./commonComponents/VerticalSeperator";

export default class Standings extends React.Component {
    static navigationOptions = {
        // header: null,

        title: 'Standings',

        headerStyle: {
            height: 0,
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
        this.fetchStandings = this.fetchStandings.bind(this);
        this.renderTabHeader = this.renderTabHeader.bind(this);
        this.state ={
            teams: [],
            loading: false,
            error: false,
            tableHeadOverall: ['TEAM', 'W', 'L', 'WIN%', 'PF', 'PA', 'DIFF', 'GB', 'CONF', 'HOME', 'ROAD', 'O>500','LAST10', 'STREAK' ],
            arrayOfDivisions: [],
            arrayOverall: [],
            widthArrOverall: [80, 50, 50, 60, 60, 50, 50, 50, 70, 70, 70, 70, 70, 70 ],
            arrayOfConferences: [],
            arrayOfDivisions: [],
            tabSelected: 'Conference'
        }
    }

    componentDidMount() {
        this.fetchStandings(this.state.tabSelected);
    }

    fetchStandings(tabSelected) {
        this.setState({ loading: true, error: false });
        let urlKey = 'conferencestanding';
        if(tabSelected === 'Division'){
            urlKey = 'divisionstanding';
        }
        return fetch(`https://ca.global.nba.com/stats2/season/${urlKey}.json?locale=en`)
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
                    let arrayOfDivisions = [];
                    teams.forEach((obj) => {
                        let arrayOfTeamsInGroup = [];
                        const displayHeader = obj.displayConference;

                        obj.teams.forEach((teamObj)=>{
                            const {profile, standings} = teamObj;
                            let rank = standings.confRank
                            if(tabSelected === 'Division'){
                                rank = standings.divRank;
                            }
                            const arrayOfTeamInfo = [
                                `${rank}.   ${profile.displayAbbr}`,
                                standings.wins,
                                standings.losses,
                                standings.winPct,
                                standings.pointsFor,
                                standings.pointsAgainst,
                                standings.pointsDiff,
                                standings.confGamesBehind,
                                `${standings.confWin}-${standings.confLoss}`,
                                `${standings.homeWin}-${standings.homeLoss}`,
                                `${standings.roadWin}-${standings.roadLoss}`,
                                `${standings.oppover500Win}-${standings.oppover500Loss}`,
                                standings.last10,
                                standings.streak
                            ];
                            if(tabSelected === 'Division'){
                                arrayOfTeamsInGroup[standings.divRank-1] = arrayOfTeamInfo;
                            } else {
                                arrayOfTeamsInGroup[standings.confRank-1] = arrayOfTeamInfo;
                            }
                            console.log('arrayOfTeamsInGroup',arrayOfTeamsInGroup);
                        });
                        tabSelected === 'Division' ? arrayOfDivisions.push( arrayOfTeamsInGroup): arrayOfConferences.push( arrayOfTeamsInGroup );
                    });
                    this.setState({
                        arrayOfConferences,
                        arrayOfDivisions,
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
            <TouchableOpacity
                style={[
                styles.tabHeaderContainer,
                isTabSelected && styles.selectedTabContainer
                ]}
                onPress={()=>this.pressTab(title)}
            >
                <Text style={[
                    styles.tabHeaderText,
                    isTabSelected && styles.selectedTabText
                ]}>{title}</Text>
            </TouchableOpacity>
        );
    }

    pressTab(tabSelected){
        this.setState({ tabSelected: tabSelected});
        this.fetchStandings(tabSelected);
    }

    showDivisionTables() {
        return(
            <View>
                <GeneralTable
                    containerStyle={styles.tableContainer}
                    showHideIcon={true}
                    errorMessage={this.state.error ? 'Data not available' : ''}
                    title={'ATLANTIC'}
                    headerRow={this.state.tableHeadOverall}
                    rowsData={this.state.arrayOfDivisions[0]}
                    widthArr={this.state.widthArrOverall}
                    titleStyle={{ backgroundColor: colorLuminance(colors.mainAccent, 0.5), height: 40}}
                    headerStyle={{ backgroundColor: colorLuminance(colors.mainAccent, -0.1), height: 30 }}
                />
                <GeneralTable
                    containerStyle={styles.tableContainer}
                    showHideIcon={true}
                    errorMessage={this.state.error ? 'Data not available' : ''}
                    title={'CENTRAL'}
                    headerRow={this.state.tableHeadOverall}
                    rowsData={this.state.arrayOfDivisions[1]}
                    widthArr={this.state.widthArrOverall}
                    titleStyle={{ backgroundColor: colorLuminance(colors.mainAccent, 0.5), height: 40}}
                    headerStyle={{ backgroundColor: colorLuminance(colors.mainAccent, -0.1), height: 30 }}
                />
                <GeneralTable
                    containerStyle={styles.tableContainer}
                    showHideIcon={true}
                    errorMessage={this.state.error ? 'Data not available' : ''}
                    title={'SOUTHEAST'}
                    headerRow={this.state.tableHeadOverall}
                    rowsData={this.state.arrayOfDivisions[2]}
                    widthArr={this.state.widthArrOverall}
                    titleStyle={{ backgroundColor: colorLuminance(colors.mainAccent, 0.5), height: 40}}
                    headerStyle={{ backgroundColor: colorLuminance(colors.mainAccent, -0.1), height: 30 }}
                />
                <GeneralTable
                    containerStyle={styles.tableContainer}
                    showHideIcon={true}
                    errorMessage={this.state.error ? 'Data not available' : ''}
                    title={'NORTHWEST'}
                    headerRow={this.state.tableHeadOverall}
                    rowsData={this.state.arrayOfDivisions[3]}
                    widthArr={this.state.widthArrOverall}
                    titleStyle={{ backgroundColor: colorLuminance(colors.mainAccent, 0.5), height: 40}}
                    headerStyle={{ backgroundColor: colorLuminance(colors.mainAccent, -0.1), height: 30 }}
                />
                <GeneralTable
                    containerStyle={styles.tableContainer}
                    showHideIcon={true}
                    errorMessage={this.state.error ? 'Data not available' : ''}
                    title={'PACIFIC'}
                    headerRow={this.state.tableHeadOverall}
                    rowsData={this.state.arrayOfDivisions[4]}
                    widthArr={this.state.widthArrOverall}
                    titleStyle={{ backgroundColor: colorLuminance(colors.mainAccent, 0.5), height: 40}}
                    headerStyle={{ backgroundColor: colorLuminance(colors.mainAccent, -0.1), height: 30 }}
                />
                <GeneralTable
                    containerStyle={styles.tableContainer}
                    showHideIcon={true}
                    errorMessage={this.state.error ? 'Data not available' : ''}
                    title={'SOUTHWEST'}
                    headerRow={this.state.tableHeadOverall}
                    rowsData={this.state.arrayOfDivisions[5]}
                    widthArr={this.state.widthArrOverall}
                    titleStyle={{ backgroundColor: colorLuminance(colors.mainAccent, 0.5), height: 40}}
                    headerStyle={{ backgroundColor: colorLuminance(colors.mainAccent, -0.1), height: 30 }}
                />
            </View>
        );
    }

    showConferenceTables() {
        return(<View>
            <GeneralTable
                containerStyle={styles.tableContainer}
                showHideIcon={true}
                errorMessage={this.state.error ? 'Data not available' : ''}
                title={'EAST'}
                headerRow={this.state.tableHeadOverall}
                rowsData={this.state.arrayOfConferences[0]}
                widthArr={this.state.widthArrOverall}
                titleStyle={{ backgroundColor: colors.highlight, height: 40 }}
                headerStyle={{ backgroundColor: colors.mainAccent, height: 30 }}
            />
            <GeneralTable
                containerStyle={styles.tableContainer}
                showHideIcon={true}
                errorMessage={this.state.error ? 'Data not available' : ''}
                title={'WEST'}
                headerRow={this.state.tableHeadOverall}
                rowsData={this.state.arrayOfConferences[1]}
                widthArr={this.state.widthArrOverall}
                titleStyle={{ backgroundColor: colors.highlight, height: 40 }}
                headerStyle={{ backgroundColor: colors.mainAccent, height: 30 }}
            />
        </View>);
    }


    render() {
        console.log('state', this.state);
        return (
            <SafeAreaView style={{flex:1, backgroundColor: colors.baseBackground }}>
                <StatusBar
                    barStyle="light-content"
                />
                <PageTitle
                    title={'Standings'}
                />
                <View style={styles.chooseDateBar}>
                    {this.renderTabHeader('Conference', 'center')}
                    {this.renderTabHeader('Division', 'center')}
                    {this.renderTabHeader('Overall', 'center')}
                </View>
                <ScrollView
                    style={styles.container}
                >
                    {this.state.loading ? this.showLoadingIndicator() :
                        (this.state.arrayOfConferences.length > 0 || this.state.arrayOfDivisions.length > 0) &&
                        <View>
                            {this.state.tabSelected === 'Division' ?
                                this.showDivisionTables()
                            :
                                this.showConferenceTables()
                            }
                        </View>
                    }

                </ScrollView>
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
        // paddingBottom: 8,
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
        paddingVertical: 8,
    },
    tabHeaderText: {
        ...appFonts.mdRegular,
        color: colors.white,
        textAlign: 'center',
        opacity: 0.6
    },
    selectedTabContainer: {
        backgroundColor: colors.mainAccent,
        // borderTopRightRadius: 8,
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 4,
        // borderTopLeftRadius: 4
    },
    selectedTabText: {
        color: colors.white,
        ...appFonts.mdRegular,
        textAlign: 'center',
        opacity: 1
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
    },
    tableContainer: {
        paddingTop: 16
    }
});

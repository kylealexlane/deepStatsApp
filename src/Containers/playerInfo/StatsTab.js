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
import {colorLuminance, round} from "../../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import moment from 'moment'

import VerticalSeperator from '../commonComponents/VerticalSeperator'
import HorizontalSeperator from "../commonComponents/HorizontalSeperator"
import Logo from '../commonComponents/Logo'

import RNPickerSelect from 'react-native-picker-select';
import Carousel from 'react-native-snap-carousel';
import PlayerHistoryGraph from '../commonComponents/PlayerHistoryGraph';

import GeneralTable from '../commonComponents/GeneralTable'


export default class StatsTab extends React.Component {
    constructor(props){
        super(props);
        this.navigateToGeneralShooting = this.navigateToGeneralShooting.bind(this);
        // this.navigateToCareerStats = this.navigateToCareerStats.bind(this);
        this.generateSeasonTableData = this.generateSeasonTableData.bind(this);
        this.inputRefs = {};

        this.state ={
            seasons: [
            ],
            carouselData: [],
            seasonSelected: this.props.parentState.playerStats[0].rowSet[this.props.parentState.playerStats[0].rowSet.length -1],
            teamIdArray: [],
            // seasonSelected: null,

            // seasonSelectedLabel: this.props.parentState.playerStats[0].rowSet[this.props.parentState.playerStats[0].rowSet.length -1][1],
            // seasonSelectedLabel: null,

            seasonTableHeaders: ['SEASON', 'TEAM', 'AGE', 'GP', 'GS', 'MIN', 'FGM', 'FGA', 'FG%', 'FG3M', 'FG3A', 'FG3%','FTM', 'FTA', 'FT%', 'OREB', 'DREB', 'REB', 'AST','STL', 'BLK', 'TOV', 'PF', 'PTS' ],
            seasonTableData: [],
            postSeasonTableData: [],
            collegeSeasonTableData: [],
            seasonWidthArr: [80, 50, 50, 60, 60, 50, 50, 50, 70, 70, 70, 70, 70, 70, 50, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70 ],
        }
    }

    componentWillMount() {
        const { playerStats } = this.props.parentState;
        this.putSeasonsInArray();
        this.generateSeasonTableData(playerStats[2].rowSet, [...playerStats[3].rowSet[0]], 'postSeasonTableData', false);
        if (playerStats[6].rowSet.length > 0){
            this.generateSeasonTableData(playerStats[6].rowSet, [...playerStats[7].rowSet[0]], 'collegeSeasonTableData', false);
        }
        if (playerStats[8].rowSet.length > 0){
            this.generateSeasonTableData(playerStats[8].rowSet, [...playerStats[9].rowSet[0]], 'preSeasonTableData', false);
        }
        if (playerStats[10].rowSet.length > 0){
            this.generateSeasonTableData(playerStats[10].rowSet, [], 'seasonRankingTableData', false);
        }
        this.generateCarouselData(this.state.seasonSelected);
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('nexttt',nextState);
        console.log(this.state);
        if(nextState.seasonSelected[1] !== this.state.seasonSelected[1]) {
            this.generateCarouselData(nextState.seasonSelected);
        }
        if(nextState.seasons !== this.state.seasons) {
            this.generateSeasonTableData(nextState.seasons, [...this.props.parentState.playerStats[1].rowSet[0]], 'seasonTableData', true);
        }
    }

    generateSeasonTableData(seasons, careerSeason, labelInState, withValue) {
        let seasonDataForTable = [];
        console.log(seasons);
        console.log(careerSeason);
        if (seasons && seasons.length > 0) {
            const seasonCopy = JSON.parse(JSON.stringify( seasons ));
            seasonCopy.forEach((row) => {
                let s = row;
                if(withValue) {
                    s = row.value;
                }
                s.splice(0, 1);
                console.log('1', s);
                s.splice(1, 2);
                console.log(s);
                seasonDataForTable.push(s);
            });
            if(careerSeason.length > 0) {
                careerSeason.splice(0, 3);
                seasonDataForTable.push(['CAREER', '', ''].concat(careerSeason));
            }
            this.setState({ [labelInState]: seasonDataForTable });
        }
    }

    putSeasonsInArray() {
        let previousYear = 0;
        let newSeasons = this.state.seasons;
        let newTeamIdArray = [];
        this.props.parentState.playerStats[0].rowSet.forEach((season, index) => {
            let year = season[1];
            let teamId = season[3];
            if ( (this.props.parentState.playerStats[0].rowSet[index - 1]  && year === this.props.parentState.playerStats[0].rowSet[index - 1][1]) || (this.props.parentState.playerStats[0].rowSet[index + 1] && year === this.props.parentState.playerStats[0].rowSet[index + 1][1])) {
                year += ' (' + season[4] + ')';
            }
            console.log('season', season);
            console.log('teamId', teamId);
            console.log(season);
            newTeamIdArray.push(teamId);
            newSeasons.push({ label: year, value: season });
            console.log('newSeasons', newSeasons);
            // previousYear = year;
        });
        this.generateSeasonTableData(newSeasons, [...this.props.parentState.playerStats[1].rowSet[0]], 'seasonTableData', true);
        this.setState({
            seasons: newSeasons,
            teamIdArray: newTeamIdArray
        });
    }

    navigateToGeneralShooting() {
        console.log('props when moving', this.props);
        this.props.navigation.push('generalShooting', {
            seasons: this.state.seasons,
            seasonSelected: this.state.seasonSelected,
            playerId: this.props.navigation.state.params.playerId,
            // teamId: this.props.parentState.playerBio[0].rowSet[0][16],
            teamIdArray: this.state.teamIdArray,
            playerName: this.props.parentState.playerBio[0].rowSet[0][3],
            playerTeamShort: this.props.parentState.playerStats[0].rowSet[this.props.parentState.currentTeamIndex][4],
            teamImageURI: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${this.props.parentState.playerStats[0].rowSet[this.props.parentState.currentTeamIndex][4]}.png`
        });
    }

    // navigateToCareerStats() {
    //     console.log('moving to career', this.props);
    //     this.props.navigation.push('careerStats', {
    //         playerStats: this.props.parentState.playerStats,
    //         seasons: this.state.seasons,
    //         seasonSelected: this.state.seasonSelected,
    //         playerId: this.props.navigation.state.params.playerId,
    //         // teamId: this.props.parentState.playerBio[0].rowSet[0][16],
    //         teamIdArray: this.state.teamIdArray,
    //         playerName: this.props.parentState.playerBio[0].rowSet[0][3],
    //         playerTeamShort: this.props.parentState.playerStats[0].rowSet[this.props.parentState.currentTeamIndex][4],
    //         teamImageURI: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${this.props.parentState.playerStats[0].rowSet[this.props.parentState.currentTeamIndex][4]}.png`
    //     });
    // }

    generateCarouselData(seasonSelected) {
        const currentYearStats = [...seasonSelected];
        console.log('currentYearStatsss', currentYearStats);
        console.log('parentState', this.props.parentState.playerStats);
        const seasonTotalsReg = [...this.props.parentState.playerStats[0].rowSet];
        let shootingDataFG = [];
        let shootingData3FG = [];
        let shootingDataFT = [];
        let offReb = [];
        let defReb = [];
        let reb = [];
        let assists = [];
        let steals = [];
        let blocks = [];
        let tov = [];
        let fouls = [];
        let pts = [];
        seasonTotalsReg.forEach((season) => {
            shootingDataFG.push({value: season[11]*100, label: season[1].substring(2)});
            shootingData3FG.push({value: season[14]*100, label: season[1].substring(2)});
            shootingDataFT.push({value: season[17]*100, label: season[1].substring(2)});
            offReb.push({value: season[18], label: season[1].substring(2)});
            defReb.push({value: season[19], label: season[1].substring(2)});
            reb.push({value: season[20], label: season[1].substring(2)});
            assists.push({value: season[21], label: season[1].substring(2)});
            steals.push({value: season[22], label: season[1].substring(2)});
            blocks.push({value: season[23], label: season[1].substring(2)});
            tov.push({value: season[24], label: season[1].substring(2)});
            fouls.push({value: season[25], label: season[1].substring(2)});
            pts.push({value: season[26], label: season[1].substring(2)});
        });
        const seasonRankingsReg = this.props.parentState.playerStats[10];
        const carouselData = [
            {
                title: 'Scoring',
                headers: ['PTS', 'AST'],
                headersData: [currentYearStats[26], currentYearStats[21]],
                dataY: [0, 30],
                graphDataColor: colors.graphColor1,
                graphData2Color: colors.graphColor2,
                graphData3Color: colors.graphColor3,
                graphData: [...pts],
                graphData2: [...assists],
            },
            {
                title: 'Shooting',
                headers: ['FT%', 'FG%', 'FG3%'],
                // headersData: [(currentYearStats[11]*100).toFixed(1), (currentYearStats[14]*100).toFixed(1), (currentYearStats[17]*100).toFixed(1)],
                headersData: [(currentYearStats[17]*100).toFixed(1), (currentYearStats[11]*100).toFixed(1), (currentYearStats[14]*100).toFixed(1)],
                dataY: [0, 100],
                graphDataColor: colors.graphColor1,
                graphData2Color: colors.graphColor2,
                graphData3Color: colors.graphColor3,
                graphData2: [...shootingDataFG],
                graphData3: [...shootingData3FG],
                graphData: [...shootingDataFT],
                onPress: this.navigateToGeneralShooting
            },
            {
                title: 'Rebounding',
                headers: ['REB', 'DREB', 'OREB'],
                headersData: [currentYearStats[20], currentYearStats[19], currentYearStats[18]],
                dataY: [0, 20],
                graphDataColor: colors.graphColor1,
                graphData2Color: colors.graphColor2,
                graphData3Color: colors.graphColor3,
                graphData: [...reb],
                graphData2: [...defReb],
                graphData3: [...offReb],
            },
            {
                title: 'Possession',
                headers: ['TOV', 'STL'],
                headersData: [currentYearStats[24], currentYearStats[22]],
                dataY: [0, 5],
                graphDataColor: colors.graphColor1,
                graphData2Color: colors.graphColor2,
                graphData3Color: colors.graphColor3,
                graphData: [...tov],
                graphData2: [...steals],
            },
        ];
        this.setState({ carouselData });
    }


    _renderItem ({item, index}) {
        return (
            <TouchableOpacity
                style={{paddingTop: 16, marginLeft: 16}}
                onPress={item.onPress}
            >
                <PlayerHistoryGraph
                    item={item}
                    index={index}
                />
            </TouchableOpacity>
        );
    }


    render() {
        console.log('render', this.props.parentState);
        const primaryColor = teamColors[this.props.parentState.playerStats[0].rowSet[this.props.parentState.currentTeamIndex][4]].primary;
        // const currentYearStats = this.props.parentState.playerStats[0].rowSet[this.state.seasonIndex];
        const currentYearStats = this.state.seasonSelected;
        const careerStats = this.props.parentState.playerStats[1].rowSet[0];
        const sliderWidth = windowSize.width;
        const itemWidth = windowSize.width* 0.7;
        return (
            <View style={styles.statsContainer}>
                <View style={[styles.statsRowContainer]}>
                    <View style={{flex: 0}}>
                        {/*<Text style={[styles.statsHighlightTextColor, styles.statsTextLarge, {...appFonts.xlBold}]}>{currentYearStats[1]}</Text>*/}
                        <RNPickerSelect
                            placeholder={{
                            }}
                            items={this.state.seasons}
                            onValueChange={(value, index) => {
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
                            // placeholderColor={primaryColor}
                            style={{ ...pickerSelectStyles }}
                            value={this.state.seasonSelected}
                            ref={(el) => {
                                this.inputRefs.picker = el;
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', flex: 1}}>
                        <EntypoIcon name="select-arrows" size={20} color={primaryColor} onPress={() => {
                            console.log('toggling');
                            this.inputRefs.picker.togglePicker();
                        }}/>
                    </View>
                    {/*<Text style={[styles.statsSubTextColor, styles.statsTextSmaller]}>(Per Game)</Text>*/}
                    {/*<View>*/}
                        {/*<MaterialCommunityIcon name="chevron-right" size={20} color={colors.highlight} />*/}
                    {/*</View>*/}
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
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.carouselData}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    loop={true}
                    activeSlideAlignment={'start'}
                    inactiveSlideOpacity={0.5}
                    inactiveSlideScale={0.8}
                    inactiveSlideShift={0}
                />
                <View style={[styles.statsRowContainerNoPadding]}>
                    <GeneralTable
                        // containerStyle={styles.tableContainer}
                        showHideIcon={true}
                        errorMessage={''}
                        title={'SEASONS'}
                        headerRow={this.state.seasonTableHeaders}
                        rowsData={this.state.seasonTableData}
                        widthArr={this.state.seasonWidthArr}
                        titleStyle={{ backgroundColor: primaryColor, height: 40, width: windowSize.width }}
                        headerStyle={{ backgroundColor: colorLuminance(primaryColor, -0.4), height: 30 }}
                    />
                </View>
                <View style={styles.statsRowContainerNoPadding}>
                    <GeneralTable
                        // containerStyle={styles.tableContainer}
                        showHideIcon={true}
                        errorMessage={''}
                        title={'SEASON RANKINGS'}
                        headerRow={this.state.seasonTableHeaders}
                        rowsData={this.state.seasonRankingTableData}
                        widthArr={this.state.seasonWidthArr}
                        titleStyle={{ backgroundColor: primaryColor, height: 40, width: windowSize.width }}
                        headerStyle={{ backgroundColor: colorLuminance(primaryColor, -0.4), height: 30 }}
                    />
                </View>
                <View style={styles.statsRowContainerNoPadding}>
                    <GeneralTable
                        // containerStyle={styles.tableContainer}
                        showHideIcon={true}
                        errorMessage={''}
                        title={'POST SEASONS'}
                        headerRow={this.state.seasonTableHeaders}
                        rowsData={this.state.postSeasonTableData}
                        widthArr={this.state.seasonWidthArr}
                        titleStyle={{ backgroundColor: primaryColor, height: 40, width: windowSize.width }}
                        headerStyle={{ backgroundColor: colorLuminance(primaryColor, -0.4), height: 30 }}
                    />
                </View>
                <View style={styles.statsRowContainerNoPadding}>
                    <GeneralTable
                        // containerStyle={styles.tableContainer}
                        showHideIcon={true}
                        errorMessage={''}
                        title={'PRE SEASON'}
                        headerRow={this.state.seasonTableHeaders}
                        rowsData={this.state.preSeasonTableData}
                        widthArr={this.state.seasonWidthArr}
                        titleStyle={{ backgroundColor: primaryColor, height: 40, width: windowSize.width }}
                        headerStyle={{ backgroundColor: colorLuminance(primaryColor, -0.4), height: 30 }}
                    />
                </View>
                <View style={styles.statsRowContainerNoPadding}>
                    <GeneralTable
                        // containerStyle={styles.tableContainer}
                        showHideIcon={true}
                        errorMessage={''}
                        title={'COLLEGE'}
                        headerRow={this.state.seasonTableHeaders}
                        rowsData={this.state.collegeSeasonTableData}
                        widthArr={this.state.seasonWidthArr}
                        titleStyle={{ backgroundColor: primaryColor, height: 40, width: windowSize.width }}
                        headerStyle={{ backgroundColor: colorLuminance(primaryColor, -0.4), height: 30 }}
                    />
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
        backgroundColor: colors.baseBackground
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
        color: colors.baseText,
    },
    statsSubTextColor: {
        color: colors.secondaryText
    },
    statsHighlightTextColor: {
        color: colors.highlight
    },
    subTextColor: {
        color: colors.secondaryText,
    },
    largeText: {
        ...appFonts.xxlBold
    },
    mediumText: {
        ...appFonts.xlBold
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
        // paddingHorizontal: 16
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
        paddingTop: 20,
        paddingHorizontal: 16
    },
    statsRowContainerNoPadding: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 0
    },
    statsRowSubContainer: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftBorder: {
        borderLeftWidth: 1,
        borderColor: colors.greyLight
    },
    rightBorder: {
        borderRightWidth: 1,
        borderColor: colors.greyLight
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderColor: colors.greyLight
    },
    topBorder: {
      borderTopWidth: 1,
      borderColor: colors.greyLight
    },
    statsTextSmaller: {
        ...appFonts.smRegular
    },
    darkBorderTop: {
        borderTopColor: colors.greyLight,
        borderTopWidth: 1,
        paddingTop: 12,
        marginTop: 12
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginLeft: 0,
        ...appFonts.xlBold,
        color: colors.baseText,
    },
    // placeholderColor: { color: 'red' },
});
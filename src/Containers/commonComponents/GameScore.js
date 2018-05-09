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
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts, fontSize } from '../../styles/commonStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import { BarChart, Labels } from 'react-native-svg-charts'

import SVGImage from 'react-native-svg-image'


export default class GameScore extends React.Component {
    constructor(props){
        super(props);
        this.renderBottomText = this.renderBottomText.bind(this);
        this.state ={
        }
    }

    renderBottomText(team, boxscore) {
        // if (parseInt(boxscore.status) <= 1) {
            return (<Text style={styles.recordText}>{team.matchup.wins}-{team.matchup.losses}</Text>);
        // }
    }

    renderMiddleView(item, leader) {
        const {boxscore, profile, broadcasters, homeTeam, awayTeam} = item;

        let fgpctLeader = 'none';
        if(homeTeam.score.fgpct > awayTeam.score.fgpct) {
            fgpctLeader = 'home';
        } else if (homeTeam.score.fgpct < awayTeam.score.fgpct) {
            fgpctLeader = 'away';
        }

        let asstLeader = 'none';
        if(homeTeam.score.assists > awayTeam.score.assists) {
            asstLeader = 'home';
        } else if (homeTeam.score.assists < awayTeam.score.assists) {
            asstLeader = 'away';
        }

        let rebLeader = 'none';
        if(homeTeam.score.assists > awayTeam.score.assists) {
            rebLeader = 'home';
        } else if (homeTeam.score.assists < awayTeam.score.assists) {
            rebLeader = 'away';
        }


        const data   = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ];
        let name = 'TBD';
        if(broadcasters[0] && broadcasters[0].name) {
            name = broadcasters[0].name;
        }
        console.log(profile);
        const date = new Date(0);
        console.log(profile.utcMillis);
        date.setUTCMilliseconds(profile.utcMillis);
        if (boxscore.status === '1' || boxscore.status === '0') {
            return(
                <Text>
                    <Text style={styles.timeText}>{moment(date.toString()).format('h:mm a')}</Text>
                    <Text style={styles.timeText}>  </Text>
                    <Text style={styles.timeText}>{name}</Text>
                </Text>
            );
        }
        return(
            <View style={styles.columnContainer}>
                {/*<Text>*/}
                    {/*<Text style={styles.timeText}>{moment(date.toString()).format('h:mm a')}</Text>*/}
                    {/*<Text style={styles.timeText}>  </Text>*/}
                    {/*<Text style={styles.timeText}>{name}</Text>*/}
                {/*</Text>*/}
                <View style={styles.graphRow}>
                    <Text style={[styles.scoresText, leader==='home' && styles.boldScoreText]}>{boxscore.homeScore}</Text>
                    <Text style={[styles.scoresText, styles.underlineScore]}>  -  </Text>
                    <Text style={[styles.scoresText, leader==='away' && styles.boldScoreText]}>{boxscore.awayScore}</Text>
                </View>
                <View style={styles.graphRow}>
                    <Text style={[styles.otherStatsText, fgpctLeader==='home' && styles.otherStatsTextBold]}>{homeTeam.score.fgpct}</Text>
                    <Text style={[styles.scoresMiddleText]}>    FG%    </Text>
                    <Text style={[styles.otherStatsText, fgpctLeader==='away' && styles.otherStatsTextBold]}>{awayTeam.score.fgpct}</Text>
                </View>
                <View style={styles.graphRow}>
                    <Text style={[styles.otherStatsText, asstLeader==='home' && styles.otherStatsTextBold]}>{homeTeam.score.assists}</Text>
                    <Text style={[styles.scoresMiddleText]}>    ASST    </Text>
                    <Text style={[styles.otherStatsText, asstLeader==='away' && styles.otherStatsTextBold]}>{awayTeam.score.assists}</Text>
                </View>
                <View style={styles.graphRow}>
                    <Text style={[styles.otherStatsText, rebLeader==='home' && styles.otherStatsTextBold]}>{homeTeam.score.rebs}</Text>
                    <Text style={[styles.scoresMiddleText]}>    REB    </Text>
                    <Text style={[styles.otherStatsText, rebLeader==='away' && styles.otherStatsTextBold]}>{awayTeam.score.rebs}</Text>
                </View>
            </View>
        );
    }

    render() {
        console.log('item', this.props.item);
        const {homeTeam, awayTeam, boxscore, profile, broadcasters} = this.props.item;
        let leader = 'none';
        let borderColor = 'transparent';
        if(boxscore.homeScore > boxscore.awayScore) {
            leader = 'home';
            borderColor = teamColors[homeTeam.profile.abbr].primary;
        } else if (boxscore.homeScore < boxscore.awayScore) {
            leader = 'away';
            borderColor = teamColors[awayTeam.profile.abbr].primary;
        }
        return (
            <View style={[ leader === 'home' && styles.shadowLeft, leader === 'away' && styles.shadowRight]}>
                <View style={[styles.overallContainer, leader === 'home' && {borderLeftColor: colors.mainAccent}, leader === 'away' && {borderRightColor: colors.mainAccent}]}>
                    <View style={styles.columnContainer}>
                        <SVGImage
                            style={styles.teamLogo}
                            source={{uri: `https://ca.global.nba.com/media/img/teams/00/logos/${homeTeam.profile.abbr}_logo.svg`}}
                        />
                        {this.renderBottomText(homeTeam, boxscore)}
                    </View>
                    <View>
                        {this.renderMiddleView(this.props.item, leader)}
                    </View>
                    <View style={styles.columnContainer}>
                        <SVGImage
                            style={styles.teamLogo}
                            source={{uri: `https://ca.global.nba.com/media/img/teams/00/logos/${awayTeam.profile.abbr}_logo.svg`}}
                        />
                        {this.renderBottomText(awayTeam, boxscore)}
                        </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    overallContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.baseBackground,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 32,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        shadowRadius: 5,
        shadowColor: colors.greyDarkest,
        shadowOpacity: 0.2,
        shadowOffset: {width: 2,height: 2},
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: 'transparent',

    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamLogo: {
        height: 70,
        width: 70,
        backgroundColor: colors.baseBackground,
        borderColor: colors.baseBackground
    },
    recordText: {
        ...appFonts.smRegular,
        color: colors.secondaryText
    },
    timeText: {
        ...appFonts.smRegular,
        color: colors.baseText
    },
    secondaryText: {
        color: colors.secondaryText
    },
    graphRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        // width: 300,
        backgroundColor: 'transparent',
        // paddingTop: 8
        // height: 100
    },
    scoresText: {
        ...appFonts.xxxlRegular,
        color: colors.secondaryText
    },
    underlineScore: {
        color: colors.secondaryText,
    },
    scoresMiddleText: {
        ...appFonts.xxsRegular,
        color: colors.secondaryText
    },
    otherStatsText: {
        ...appFonts.xsRegular,
        color: colors.secondaryText
    },
    otherStatsTextBold: {
        color: colors.baseText,
        ...appFonts.xsBold
    },
    shadowLeft: {
        shadowRadius: 2,
        shadowColor: colors.mainAccent,
        shadowOpacity: 0.1,
        shadowOffset: {width: -windowSize.width * 0.7, height: 2},
    },
    shadowRight: {
        shadowRadius: 2,
        shadowColor: colors.mainAccent,
        shadowOpacity: 0.1,
        shadowOffset: {width: windowSize.width * 0.7, height: 2},
    },
    boldScoreText: {
        color: colors.baseText,
        ...appFonts.xxxlBold
    }
});
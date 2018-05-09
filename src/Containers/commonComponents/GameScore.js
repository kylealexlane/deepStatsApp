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

    renderMiddleView(item) {
        const {boxscore, profile, broadcasters, homeTeam, awayTeam} = item;
        let leader = 'none';
        if(boxscore.homeScore > boxscore.awayScore) {
            leader = 'home';
        } else if (boxscore.homeScore < boxscore.awayScore) {
            leader = 'away';
        }
        // const fillHome = teamColors[homeTeam.profile.abbr].primary;
        const fillHome = colors.mainAccent;
        // const fillAway = teamColors[awayTeam.profile.abbr].primary;
        const fillAway = colors.mainAccent

        let dataHome = [];
        let dataAway = [];

        dataAway.push(boxscore.homeScore);
        dataAway.push(boxscore.awayScore);
        dataAway.push(boxscore.homeScore);

        dataHome.push(boxscore.homeScore * -1);
        dataHome.push(boxscore.awayScore * -1);
        dataHome.push(boxscore.homeScore * -1);

        console.log('homeScore', dataHome);
        // const CUT_OFF = 200;
        // const Labels = ({  x, y, bandwidth, data }) => (
        //     dataHome.map((value, index) => (
        //         <Text
        //             key={ index }
        //             x={ value > CUT_OFF ? x(0) + 10 : x(value) - 10 }
        //             y={ y(index) + (bandwidth / 2) }
        //             fontSize={ 3 }
        //             fill={ value > CUT_OFF ? 'white' : 'black' }
        //             alignmentBaseline={ 'middle' }
        //         >
        //             {value}
        //         </Text>
        //     ))
        // );


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
                    <Text style={styles.timeText, styles.secondaryText}>  </Text>
                    <Text style={styles.timeText}>{name}</Text>
                </Text>
            );
        }
        return(
            <View style={styles.columnContainer}>
                <Text>
                    <Text style={styles.timeText}>{moment(date.toString()).format('h:mm a')}</Text>
                    <Text style={styles.timeText, styles.secondaryText}>  </Text>
                    <Text style={styles.timeText}>{name}</Text>
                </Text>
                <View style={styles.graphRow}>
                    <Text style={[styles.scoresText, leader==='away' && styles.underlineScore]}>{boxscore.homeScore}</Text>
                    <Text style={[styles.scoresText, styles.secondaryText]}>  -  </Text>
                    <Text style={[styles.scoresText, leader==='home' && styles.underlineScore]}>{boxscore.awayScore}</Text>

                    {/*<BarChart*/}
                        {/*style={{ height: 40, width: windowSize.width * 0.2 }}*/}
                        {/*data={ dataHome }*/}
                        {/*svg={{ fill: fillHome }}*/}
                        {/*// contentInset={{ top: 16, bottom: 16 }}*/}
                        {/*horizontal={true}*/}
                        {/*gridMin={0}*/}
                    {/*>*/}
                        {/*/!*<Labels />*!/*/}
                    {/*</BarChart>*/}
                    {/*<BarChart*/}
                        {/*style={{ flex: 1, height: 40, width: windowSize.width * 0.2 }}*/}
                        {/*data={ dataAway }*/}
                        {/*svg={{ fill: fillAway }}*/}
                        {/*// contentInset={{ top: 16, bottom: 16 }}*/}
                        {/*horizontal={true}*/}
                        {/*gridMin={0}*/}
                    {/*>*/}
                    {/*</BarChart>*/}

                </View>
            </View>
        );
    }

    render() {
        console.log('item', this.props.item);
        const {homeTeam, awayTeam, boxscore, profile, broadcasters} = this.props.item;
        return (
            <View style={styles.overallContainer}>
                <View style={styles.columnContainer}>
                    <SVGImage
                        style={styles.teamLogo}
                        source={{uri: `https://ca.global.nba.com/media/img/teams/00/logos/${homeTeam.profile.abbr}_logo.svg`}}
                    />
                    {this.renderBottomText(homeTeam, boxscore)}
                </View>
                <View>
                    {this.renderMiddleView(this.props.item)}
                </View>
                <View style={styles.columnContainer}>
                    <SVGImage
                        style={styles.teamLogo}
                        source={{uri: `https://ca.global.nba.com/media/img/teams/00/logos/${awayTeam.profile.abbr}_logo.svg`}}
                    />
                    {this.renderBottomText(awayTeam, boxscore)}
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
        paddingHorizontal: 16,
        marginTop: 32,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.greyLightest,
        shadowRadius: 3,
        shadowColor: colors.greyDarkest,
        shadowOpacity: 0.15,
        shadowOffset: {width: 2,height: 2}

    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamLogo: {
        height: 60,
        width: 60,
        backgroundColor: colors.greyDarkest
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
        paddingTop: 8
        // height: 100
    },
    scoresText: {
        ...appFonts.xlBold,
        color: colors.mainTextColor
    },
    underlineScore: {
        color: colors.secondaryText
    }
});
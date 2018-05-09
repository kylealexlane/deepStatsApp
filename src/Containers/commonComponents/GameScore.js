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
import { colors, teamColors, windowSize, appFonts } from '../../styles/commonStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'


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

    renderMiddleView(boxscore, profile, broadcasters) {
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
            <View>
                <Text>
                    <Text style={styles.timeText}>{moment(date.toString()).format('h:mm a')}</Text>
                    <Text style={styles.timeText, styles.secondaryText}>  </Text>
                    <Text style={styles.timeText}>{name}</Text>
                </Text>
                <View>
                    
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
                    {this.renderMiddleView(boxscore, profile, broadcasters)}
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
    }
});
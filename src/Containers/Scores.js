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
} from 'react-native'
import { nbaId, year } from '../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts } from '../styles/commonStyles'
import { playerPic, hexToRgbA, capitalizeFirstLetter } from "../helpers/Helpers"
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


import StatsTab from './playerInfo/StatsTab';
import VerticalSeperator from "./commonComponents/VerticalSeperator";

export default class Scores extends React.Component {
    static navigationOptions = {
        // header: null,

        title: 'Scores',

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
        this.getCurrentDateDisplay = this.getCurrentDateDisplay.bind(this);
        this.moveDateUp = this.moveDateUp.bind(this);
        this.moveDateDown = this.moveDateDown.bind(this);
        this.launchCalendar = this.launchCalendar.bind(this);
        this.hideCalendar = this.hideCalendar.bind(this);
        this.state ={
            currentDate: moment().format('YYYY[-]MM[-]DD'),
            showCalendar: false,
            games: []
        }
    }

    componentDidMount() {
        this.fetchForDate(this.state.currentDate);
    }

    fetchForDate(date) {
        const tz = '-5';
        return fetch(`https://ca.global.nba.com/stats2/scores/daily.json?countryCode=CA&gameDate=${date}&locale=en&tz=${tz}`)
        // return fetch(`https://ca.global.nba.com/stats2/scores/gamedaystatus.json?gameDate=${date}&locale=en&tz=${tz}`)
            .then((response) =>
                response.json())
            .then((responseJson) => {
                console.log('response from gameday3', responseJson);
                let games = [];
                if(responseJson.payload.date && responseJson.payload.date.games.length > 0) {
                    games = responseJson.payload.date.games;
                }
                this.setState({
                    games
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    getCurrentDateDisplay() {
        console.log('getting');
        const displayDate = this.state.currentDate;
        if (displayDate === moment().format('YYYY[-]MM[-]DD')) {
            return 'Today'
        } else if (displayDate === moment().add(1, 'days').format('YYYY[-]MM[-]DD')) {
            return 'Tomorrow'
        } else if (displayDate === moment().subtract(1, 'days').format('YYYY[-]MM[-]DD')){
            return 'Yesterday'
        }
        return moment(displayDate).format('MMMM D YYYY');
    }

    moveDateUp() {
        this.changeDate(moment(this.state.currentDate).add(1, 'days'));
    }

    moveDateDown() {
        this.changeDate(moment(this.state.currentDate).subtract(1, 'days'));
    }

    changeDate(date) {
        this.setState({
            currentDate: date.format('YYYY[-]MM[-]DD')
        });
        this.fetchForDate(date.format('YYYY[-]MM[-]DD'));
    }

    launchCalendar() {
        this.setState({ showCalendar: !this.state.showCalendar });
    }

    hideCalendar() {
        this.setState({ showCalendar: false });
    }

    showCalendarModal() {
        return(
            <View style={styles.calendarModal}>
                <Calendar
                    current={this.state.currentDate}
                    minDate={moment().subtract(3650, 'days').format('YYYY[-]MM[-]DD')}
                    maxDate={moment().add(365, 'days').format('YYYY[-]MM[-]DD')}
                    onDayPress={(day) => {
                        console.log(day);
                        this.changeDate(moment(day.dateString));
                        this.hideCalendar();
                    }}
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    monthFormat={'MMM yyyy'}
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    hideArrows={false}
                    renderArrow={(direction) => (<MaterialIcons
                        name={`chevron-${direction}`}
                        size={30}
                        color={colors.yellow}
                        style={styles.iconStyle}
                    />)}
                    hideExtraDays={true}
                    disableMonthChange={false}
                    firstDay={1}
                    hideDayNames={false}
                    showWeekNumbers={false}
                    onPressArrowLeft={substractMonth => substractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                />
            </View>
        );
    }

    _onPressItem() {
        console.log('pressed!!');
    }

    _renderItem = ({item}) => (
        <GameScore
            id={item.id}
            onPressItem={this._onPressItem}
            item={item}
            title={item.title}
        />
    );

    render() {
        console.log(this.state.games);
        return (
            <SafeAreaView style={{flex:1, backgroundColor: colors.baseBackground }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.mainAccent}
                />
                <View style={styles.container}>
                    <View style={styles.chooseDateBar}>
                        <MaterialIcons
                            name={'chevron-left'}
                            size={30}
                            color={colors.white}
                            style={styles.iconStyle}
                            onPress={this.moveDateDown}
                        />
                        <View style={styles.rowContainer}>
                            <Text style={styles.dateText}>{this.getCurrentDateDisplay()}</Text>
                            <Octicons
                                name={'calendar'}
                                size={20}
                                color={colors.white}
                                style={styles.iconStyle}
                                onPress={this.launchCalendar}
                            />
                        </View>
                        <MaterialIcons
                            name={'chevron-right'}
                            size={30}
                            color={colors.white}
                            style={styles.iconStyle}
                            onPress={this.moveDateUp}
                        />
                    </View>
                    {this.state.showCalendar && this.showCalendarModal()}
                    <FlatList
                        // ItemSeparatorComponent={Platform.OS !== 'android' && ({highlighted}) => (
                        //     <View style={[style.separator, highlighted && {marginLeft: 0}]} />
                        //     )}
                        data={this.state.games}
                        renderItem={this._renderItem}
                    />
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
        paddingVertical: 8,
        backgroundColor: colors.mainAccent,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    calendarModal: {
        position: 'absolute',
        width: windowSize.width,
        backgroundColor: 'yellow',
        zIndex: 1000
    }
});
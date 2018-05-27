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
import TeamTab from './GameInfoComponents/TeamTab'

import GeneralTable from './commonComponents/GeneralTable'
import PageTitle from './commonComponents/PageTitle'

import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';


import StatsTab from './playerInfo/StatsTab';
import VerticalSeperator from "./commonComponents/VerticalSeperator";

export default class GameInfo extends React.Component {
  static navigationOptions = {
    // header: null,

    title: '',

    headerStyle: {
      // height: 0,
      backgroundColor: colors.mainAccent,
      // borderBottomColor: params.playerTeamShort ? teamColors[params.playerTeamShort].secondary : colors.greyDarkest
      borderBottomColor: colors.mainAccent,
    },
    // headerTitleStyle: {
    //   ...appFonts.lgBold,
    //   color: colors.white
    // },
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
    this.showTeamTab = this.showTeamTab.bind(this);
    // this.renderTabHeader = this.renderTabHeader.bind(this);
    this.state ={
      teams: [],
      loading: false,
      error: false,
      tableHeadOverall: ['TEAM', 'W', 'L', 'WIN%', 'PF', 'PA', 'DIFF', 'GB', 'CONF', 'HOME', 'ROAD', 'O>500','LAST10', 'STREAK' ],
      arrayOverall: [],
      widthArrOverall: [80, 50, 50, 60, 60, 50, 50, 50, 70, 70, 70, 70, 70, 70 ],
      arrayOfConferences: [],
      arrayOfDivisions: [],
      tabSelected: 'Teams'
    }
  }

  componentDidMount() {
    console.log('game info props', this.props);
    // this.fetchStandings(this.state.tabSelected);
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
  }

  showTeamTab() {
    return(
      <TeamTab parentProps={this.props.navigation.state.params} />
    )
  }

  render() {
    const props = this.props.navigation.state.params;
    return (
      <SafeAreaView style={{flex:1, backgroundColor: colors.baseBackground }}>
        <StatusBar
          barStyle="light-content"
        />
        <ScrollView
          style={styles.container}
        >
          <GameScore
            id={props.id}
            item={props.item}
            title={props.item.title}
            navigation={props.navigation}
            fromGameInfo={true}
          />
          <View style={styles.chooseDateBar}>
            {this.renderTabHeader('Teams', 'center')}
            {this.renderTabHeader('Players', 'center')}
            {this.renderTabHeader('Game Log', 'center')}
          </View>
          {this.state.loading ? this.showLoadingIndicator() :
            <View>
              {this.state.tabSelected === 'Teams' ?
                this.showTeamTab()
                :
                this.showTeamTab()
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
    // backgroundColor: colors.mainAccent,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row'
  },
  tabHeaderContainer: {
    flex: 1,
    // backgroundColor: colors.mainAccent,
    paddingVertical: 8,
  },
  tabHeaderText: {
    ...appFonts.mdRegular,
    color: colors.baseText,
    textAlign: 'center',
    opacity: 0.6
  },
  selectedTabContainer: {
    marginVertical: 8,
  },
  selectedTabText: {
    color: colors.baseText,
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

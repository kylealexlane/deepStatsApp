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
import { nbaId, year } from '../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts } from '../styles/commonStyles'
import { playerPic, hexToRgbA, capitalizeFirstLetter } from "../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'

import StatsTab from './playerInfo/StatsTab';
import VerticalSeperator from "./commonComponents/VerticalSeperator";

export default class Standings extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            currentDate: ''
        }
    }
  static navigationOptions = {
    // drawerLabel: 'Standings',
    // drawerIcon: () => (
    //   <Image
    //     source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
    //     style={{width: 30, height: 30, borderRadius: 15}}
    //   />
    // )
  };

  componentDidMount() {
      return fetch(`https://ca.global.nba.com/stats2/scores/gamedaystatus.json?locale=en&tz=-5`)
      // return fetch('https://stats.nba.com/stats/commonallplayers/?leagueId=00&season=2015-16&isOnlyCurrentSeason=1')
          .then((response) =>
              response.json())
          .then((responseJson) => {
              this.fetchForDate('2018-05-05');
              console.log('response from gameday', responseJson);
              this.setState({
                  // dataSource: this.state.dataSource.cloneWithRows(responseJson.resultSets[0].rowSet),
              });
          })
          .catch((error) =>{
              console.error(error);
          });
  }

  fetchForDate(date) {
      const tz = '-5';
      console.log(`https://ca.global.nba.com/stats2/scores/gamedaystatus.json?gameDate=${date}&locale=en&tz=${tz}`);
      return fetch(`https://ca.global.nba.com/stats2/scores/daily.json?countryCode=CA&gameDate=${date}&locale=en&tz=${tz}`)
      // return fetch(`https://ca.global.nba.com/stats2/scores/gamedaystatus.json?gameDate=${date}&locale=en&tz=${tz}`)
          .then((response) =>
            response.json())
          .then((responseJson) => {
              console.log('response from gameday3', responseJson);
              this.setState({
                  // dataSource: this.state.dataSource.cloneWithRows(responseJson.resultSets[0].rowSet),
              });
          })
          .catch((error) =>{
              console.error(error);
          });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Conference Standings</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyDarkest,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

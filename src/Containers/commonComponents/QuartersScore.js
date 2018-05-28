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

const heightOfBar = 4;
const middleSeperator = 8;


export default class QuartersScore extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    }
  }

  renderQuarters(homeTeam, awayTeam) {
    return(
      <View style={styles.rowContainer}>
        {this.renderQuarter('', homeTeam.profile.abbr, awayTeam.profile.abbr)}
        {this.renderQuarter('Q1', homeTeam.score.q1Score, awayTeam.score.q1Score)}
        {this.renderQuarter('Q2', homeTeam.score.q2Score, awayTeam.score.q2Score)}
        {this.renderQuarter('Q3', homeTeam.score.q3Score, awayTeam.score.q3Score)}
        {this.renderQuarter('Q4', homeTeam.score.q4Score, awayTeam.score.q4Score)}
        {this.renderQuarter(' ', homeTeam.score.score, awayTeam.score.score)}
      </View>
    );
  }

  renderQuarter(header, first, second) {
    return(
      <View style={styles.columnContainer}>
        <Text style={styles.qHeaderText}>{header}</Text>
        <Text style={[styles.qScoreText, ((first < second) || header==='') && styles.qScoreTextLarger ]}>{first}</Text>
        <Text style={[styles.qScoreText, ((second < first) || header==='') && styles.qScoreTextLarger ]}>{second}</Text>
      </View>);
  }

  render() {

    return (
      <View style={[styles.overallContainer, this.props.container]}>
        {this.renderQuarters(this.props.gameInfo.homeTeam, this.props.gameInfo.awayTeam)}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  overallContainer: {
    width: '70%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  qScoreText: {
    ...appFonts.smRegular,
    color: colors.secondaryText
  },
  qHeaderText: {
    ...appFonts.xxsRegular,
    color: colors.secondaryText
  },
  columnContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  qScoreTextLarger: {
    ...appFonts.smBold,
    color: colors.baseText
  }

});
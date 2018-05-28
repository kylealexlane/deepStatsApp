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


export default class TwoBarsCompare extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    }
  }


  render() {
    console.log('props TwoBarsCompare', this.props);
    console.log('windowSize', windowSize.width);
    const total = this.props.rightStat + this.props.leftStat;
    console.log(total);
    const leftWidth = (windowSize.width - (this.props.margins)) * (this.props.leftStat/total) - (middleSeperator/2);
    const rightWidth = (windowSize.width - (this.props.margins)) * (this.props.rightStat/total) - (middleSeperator/2);
    console.log('left', leftWidth);
    console.log('right', rightWidth);
    const leftSmaller = this.props.leftStat < this.props.rightStat;
    const rightSmaller = this.props.rightStat < this.props.leftStat;

    return (
      <View style={[styles.overallContainer, this.props.container]}>
        <View style={styles.rowForHeaders}>
          <Text style={[styles.numberHeadingText, leftSmaller && styles.secondaryText]}>{this.props.leftStatLabel || this.props.leftStat}</Text>
          <Text style={styles.headingText}>{this.props.title}</Text>
          <Text style={[styles.numberHeadingText, rightSmaller && styles.secondaryText]}>{this.props.rightStatLabel ||this.props.rightStat}</Text>
        </View>
        <View style={styles.rowForBars}>
          <View style={[styles.barLeft, { width: leftWidth, backgroundColor: this.props.leftBackground || colors.mainAccent }]} />
          <View style={[ styles.barLeft, { width: middleSeperator} ]}/>
          <View style={[styles.barRight, { width: rightWidth, backgroundColor: this.props.rightBackground || colors.highlight }] } />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overallContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: '100%'
  },
  rowForBars: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowForHeaders: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4
  },
  barLeft: {
    height: heightOfBar,
  },
  barRight: {
    height: heightOfBar,
  },
  headingText: {
    ...appFonts.smRegular,
    color: colors.secondaryText
  },
  numberHeadingText: {
    ...appFonts.smBold,
    color: colors.baseText
  },
  secondaryText: {
    color: colors.secondaryText,
    ...appFonts.smRegular
  }

});
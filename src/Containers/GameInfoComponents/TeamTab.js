import React, { Component } from "react";
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
  Image
} from "react-native";
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import {
  colors,
  teamColors,
  windowSize,
  appFonts,
  fontSize
} from "../../styles/commonStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { BarChart, Labels } from "react-native-svg-charts";
import TwoBarsCompare from "../commonComponents/TwoBarsCompare";

import SVGImage from "react-native-svg-image";

export default class TeamTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("props team tab", this.props);
    const awayScore = this.props.parentProps.item.awayTeam.score;
    const homeScore = this.props.parentProps.item.homeTeam.score;
    const awayColor =
      teamColors[this.props.parentProps.item.awayTeam.profile.abbr].primary;
    const homeColor =
      teamColors[this.props.parentProps.item.homeTeam.profile.abbr].primary;

    return (
      <View style={styles.overallContainer}>
        {/*<FlatList*/}
          {/*data={teamStats}*/}
          {/*// keyExtractor={this._keyExtractor}*/}
          {/*renderItem={this._renderItem}*/}
        {/*/>*/}
        <QuartersScore gameInfo={this.props.parentProps.item} />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.fastBreakPoints}
          rightStat={awayScore.fastBreakPoints}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Fast Break Points'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.pointsInPaint}
          rightStat={awayScore.pointsInPaint}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Points In Paint'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.pointsOffTurnovers}
          rightStat={awayScore.pointsOffTurnovers}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Points Off Turnovers'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.fgm}
          leftStatLabel={`${homeScore.fgm}/${homeScore.fga}`}
          rightStat={awayScore.fgm}
          rightStatLabel={`${awayScore.fgm}/${awayScore.fga}`}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Field Goals'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.fgpct}
          rightStat={awayScore.fgpct}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Field Goal %'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.assists}
          rightStat={awayScore.assists}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Assists'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.rebs}
          rightStat={awayScore.rebs}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Rebounds'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.steals}
          rightStat={awayScore.steals}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Steals'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.turnovers}
          rightStat={awayScore.turnovers}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Turnovers'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.fouls}
          rightStat={awayScore.fouls}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Fouls'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.fta}
          rightStat={awayScore.fta}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Free Throw Attempts'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.ftm}
          leftStatLabel={`${homeScore.ftm}/${homeScore.fta}`}
          rightStat={awayScore.ftm}
          rightStatLabel={`${awayScore.ftm}/${awayScore.fta}`}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Free Throws'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.ftpct}
          rightStat={awayScore.ftpct}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={'Free Throw %'}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          leftStat={homeScore.biggestLead}
          rightStat={awayScore.biggestLead}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Biggest Lead"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overallContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  overallBarContainer: {
    paddingTop: 12
  }
});

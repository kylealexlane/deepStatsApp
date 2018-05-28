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
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.fga}
          leftStat={awayScore.fga}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Field Goals Attempted"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.fgm}
          leftStat={awayScore.fgm}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Field Goals Made"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.fgpct}
          leftStat={awayScore.fgpct}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Field Goal %"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.assists}
          leftStat={awayScore.assists}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Assists"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.rebs}
          leftStat={awayScore.rebs}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Rebounds"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.steals}
          leftStat={awayScore.steals}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Steals"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.turnovers}
          leftStat={awayScore.turnovers}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Turnovers"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.fouls}
          leftStat={awayScore.fouls}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Fouls"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.fta}
          leftStat={awayScore.fta}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Free Throw Attempts"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.ftm}
          leftStat={awayScore.ftm}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Free Throws Made"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.ftpct}
          leftStat={awayScore.ftpct}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Free Throw %"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.fastBreakPoints}
          leftStat={awayScore.fastBreakPoints}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Fast Break Points"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.pointsInPaint}
          leftStat={awayScore.pointsInPaint}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Points In Paint"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.pointsOffTurnovers}
          leftStat={awayScore.pointsOffTurnovers}
          leftBackground={homeColor}
          rightBackground={awayColor}
          margins={32}
          title={"Points Off Turnovers"}
        />
        <TwoBarsCompare
          container={styles.overallBarContainer}
          rightStat={homeScore.biggestLead}
          leftStat={awayScore.biggestLead}
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

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
  Image,
  ActivityIndicator
} from "react-native";
import { nbaId, year } from "../../config/commonVariables";
import PropTypes from "prop-types";
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import {
  colors,
  teamColors,
  windowSize,
  appFonts
} from "../../styles/commonStyles";
import {
  playerPic,
  hexToRgbA,
  capitalizeFirstLetter
} from "../../helpers/Helpers";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import SVGImage from "react-native-svg-image";

import StatsTab from "./StatsTab";
import VerticalSeperator from "../commonComponents/VerticalSeperator";

export default class PlayerDashboard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      // headerTintColor: params.playerTeamShort ? teamColors[params.playerTeamShort].primary : 'transparent',
      headerTintColor: colors.white,
      headerTransparent: true
    };
  };

  constructor(props) {
    super(props);
    this.showLoadingIndicator = this.showLoadingIndicator.bind(this);
    this.state = {
      isLoading: true,
      isLoadingBio: true,
      playerBio: [],
      playerStats: [],
      seasonIndex: 0,
      currentTeamIndex: 0,
      firstName: "",
      lastName: "",
      selectedTab: "stats"
    };
  }

  componentDidMount() {
    return fetch(
      `https://stats.nba.com/stats/playerprofilev2/?playerId=${
        this.props.navigation.state.params.playerId
      }&leagueId=${nbaId}&perMode=PerGame`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.loadPlayerBio();
        this.setState({
          isLoading: false,
          // playerBio: responseJson.resultSets[0].rowSet,
          playerStats: responseJson.resultSets,
          seasonIndex: responseJson.resultSets[0].rowSet.length - 1,
          currentTeamIndex:
            responseJson.resultSets[0].rowSet[
              responseJson.resultSets[0].rowSet.length - 1
            ][4] === "TOT"
              ? responseJson.resultSets[0].rowSet.length - 2
              : responseJson.resultSets[0].rowSet.length - 1
        });
        this.props.navigation.setParams({
          playerTeamShort:
            responseJson.resultSets[0].rowSet[
              responseJson.resultSets[0].rowSet.length - 1
            ][4] === "TOT"
              ? responseJson.resultSets[0].rowSet[
                  responseJson.resultSets[0].rowSet.length - 2
                ][4]
              : responseJson.resultSets[0].rowSet[
                  responseJson.resultSets[0].rowSet.length - 1
                ][4]
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  loadPlayerBio() {
    return fetch(
      `https://stats.nba.com/stats/commonplayerinfo/?playerId=${
        this.props.navigation.state.params.playerId
      }&leagueId=${nbaId}`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoadingBio: false,
          playerBio: responseJson.resultSets,
          firstName: responseJson.resultSets[0].rowSet[0][1],
          lastName: responseJson.resultSets[0].rowSet[0][2]
          // playerStats: responseJson.resultSets,
          // seasonIndex: responseJson.resultSets[0].rowSet.length-1
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  showSelectedTab() {
    if (this.state.selectedTab === "stats") {
      return (
        <View style={styles.statsContainer}>
          <StatsTab
            parentState={this.state}
            navigation={this.props.navigation}
          />
        </View>
      );
    } else if (this.state.selectedTab === "bio") {
      const primaryColor =
        teamColors[
          this.state.playerStats[0].rowSet[this.state.currentTeamIndex][4]
        ].primary;
      const heightArray = this.state.playerBio[0].rowSet[0][10].split("-");
      const weight = this.state.playerBio[0].rowSet[0][11];
      const school = this.state.playerBio[0].rowSet[0][7];
      const birthday = moment(
        this.state.playerBio[0].rowSet[0][6],
        moment.ISO_8601
      ).format("MMM Do YYYY");
      const age = moment(
        this.state.playerBio[0].rowSet[0][6],
        moment.ISO_8601
      ).fromNow(true);
      const country = this.state.playerBio[0].rowSet[0][8];
      const draftYear = this.state.playerBio[0].rowSet[0][26];
      const drafRound = this.state.playerBio[0].rowSet[0][27];
      const draftNumber = this.state.playerBio[0].rowSet[0][28];

      return (
        <View style={styles.bioContainer}>
          <View style={styles.bioRowContainer}>
            <View style={styles.bioRowSubContainer}>
              <Ionicons
                name={"ios-body-outline"}
                size={30}
                color={primaryColor}
              />
            </View>

            <View style={styles.bioRowSubContainerWide}>
              <View style={styles.bioRowSubSubColumn}>
                <Text style={[styles.subTextColor, styles.bioTextSmaller]}>
                  Height
                </Text>
                <Text>
                  <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                    {heightArray[0]}
                  </Text>
                  <Text style={[styles.subTextColor, styles.bioTextSmaller]}>
                    ft
                  </Text>
                  <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                    {heightArray[1]}
                  </Text>
                  <Text style={[styles.subTextColor, styles.bioTextSmaller]}>
                    in
                  </Text>
                </Text>
              </View>
              <View style={styles.bioRowSubSubColumn}>
                <Text style={[styles.subTextColor, styles.bioTextSmaller]}>
                  Weight
                </Text>{" "}
                <Text>
                  <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                    {weight}
                  </Text>
                  <Text style={[styles.subTextColor, appFonts.lgRegular]}>
                    lbs
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bioRowContainer}>
            <View style={styles.bioRowSubContainer}>
              <FontAwesome
                name={"birthday-cake"}
                size={24}
                color={primaryColor}
              />
            </View>
            <View style={styles.bioRowSubContainerWide}>
              <View style={styles.bioRowSubSubColumn}>
                <Text style={[styles.bioSubTextColor, styles.bioTextSmaller]}>
                  Age{" "}
                </Text>
                <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                  {age}
                </Text>
              </View>
              <View style={styles.bioRowSubSubColumn}>
                <Text style={[styles.bioSubTextColor, styles.bioTextSmaller]}>
                  Born
                </Text>
                <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                  {birthday}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bioRowContainer}>
            <View style={styles.bioRowSubContainer}>
              <MaterialIcons
                name={"format-list-numbered"}
                size={30}
                color={primaryColor}
              />
            </View>
            <View style={styles.bioRowSubContainerWide}>
              <View style={styles.bioRowSubSubColumn}>
                <Text style={[styles.bioSubTextColor, styles.bioTextSmaller]}>
                  Drafted
                </Text>
                <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                  {draftYear}
                </Text>
              </View>
              <View style={styles.bioRowSubSubColumn}>
                <Text style={[styles.bioSubTextColor, styles.bioTextSmaller]}>
                  Round
                </Text>
                <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                  {drafRound}
                </Text>
              </View>
              <View style={styles.bioRowSubSubColumn}>
                <Text style={[styles.bioSubTextColor, styles.bioTextSmaller]}>
                  Pick
                </Text>
                <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                  {draftNumber}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bioRowContainer}>
            <View style={styles.bioRowSubContainer}>
              <Ionicons name={"ios-home"} size={30} color={primaryColor} />
            </View>
            <View style={styles.bioRowSubContainerWide}>
              <View style={styles.bioRowSubSubColumn}>
                <Text style={[styles.bioSubTextColor, styles.bioTextSmaller]}>
                  Home
                </Text>
                <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                  {country}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bioRowContainer}>
            <View style={styles.bioRowSubContainer}>
              <Ionicons name={"ios-school"} size={30} color={primaryColor} />
            </View>
            <View style={styles.bioRowSubContainerWide}>
              <View style={styles.bioRowSubSubColumn}>
                <Text style={[styles.bioSubTextColor, styles.bioTextSmaller]}>
                  School
                </Text>
                <Text style={[styles.mainTextColor, styles.bioTextLarge]}>
                  {school}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
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

  render() {
    let primaryColor = "#000000";
    let teamAbbr = "";
    if (!this.state.isLoading && !this.state.isLoadingBio) {
      primaryColor =
        teamColors[
          this.state.playerStats[0].rowSet[this.state.currentTeamIndex][4]
        ].primary;
      teamAbbr = this.state.playerStats[0].rowSet[
        this.state.currentTeamIndex
      ][4];
    }
    console.log("state yo", this.state);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.greyDarkest}
        />
        <ScrollView style={styles.container} stickyHeaderIndices={[1]}>
          {!this.state.isLoading &&
            !this.state.isLoadingBio && (
              <View
                style={[
                  styles.headerContainer,
                  {
                    backgroundColor: this.state.isLoading
                      ? colors.greyBase
                      : hexToRgbA(
                          teamColors[
                            this.state.playerStats[0].rowSet[
                              this.state.currentTeamIndex
                            ][4]
                          ].primary,
                          0.2
                        )
                  }
                ]}
              >
                {/*<Image*/}
                {/*style={styles.headerBackgroundLogo}*/}
                {/*source={{uri: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${this.state.playerStats[0].rowSet[this.state.currentTeamIndex][4]}.png`}}*/}
                {/*// source={{uri: `https://ca.global.nba.com/media/img/teams/00/logos/${teamAbbr}_logo.svg`}}*/}

                {/*// source={{uri: `https://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/${this.state.playerStats[0].rowSet[this.state.seasonIndex][4]}.png`}}*/}
                {/*/>*/}
                <SVGImage
                  style={styles.headerBackgroundLogo}
                  source={{
                    uri: `https://ca.global.nba.com/media/img/teams/00/logos/${teamAbbr}_logo.svg`
                  }}
                />
                <LinearGradient
                  colors={[
                    "#000000",
                    hexToRgbA(
                      teamColors[
                        this.state.playerStats[0].rowSet[
                          this.state.currentTeamIndex
                        ][4]
                      ].primary,
                      0.4
                    )
                  ]}
                  style={styles.linearGradient}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                />
                {/*<LinearGradient colors={['#000000', '#000000']} style={styles.linearGradientDark}>*/}
                {/*</LinearGradient>*/}
                <Image
                  // rounded
                  source={{
                    uri: playerPic(this.state.firstName, this.state.lastName)
                  }}
                  // containerStyle={{ backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'flex-end'}}
                  // overlayContainerStyle={{ marginRight: 0, backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'flex-end'}}
                  style={{
                    height: 150,
                    width: 200,
                    position: "absolute",
                    left: 0,
                    bottom: 0
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    position: "absolute",
                    flexDirection: "row"
                  }}
                >
                  <View style={{ height: "100%", width: "50%" }} />
                  <View
                    style={{
                      width: "50%",
                      height: "100%",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingVertical: 16
                    }}
                  >
                    <Text
                      style={[
                        appFonts.lgRegular,
                        { color: colors.greyLighter }
                      ]}
                    >
                      {this.state.playerBio[0].rowSet[0][1]}
                    </Text>
                    <Text
                      style={[
                        styles.mainTextColor,
                        appFonts.xxxlBold,
                        { color: colors.white }
                      ]}
                    >
                      {this.state.playerBio[0].rowSet[0][2]}
                    </Text>
                    <Text
                      style={[
                        styles.mainTextColor,
                        appFonts.xlBold,
                        { color: colors.white }
                      ]}
                    >
                      #{this.state.playerBio[0].rowSet[0][13]} |{" "}
                      {this.state.playerBio[0].rowSet[0][14]}
                    </Text>
                    {/*<Text style={[styles.mainTextColor, appFonts.xlBold, { color: colors.white }]}>*/}
                    {/*{this.state.playerBio[0].rowSet[0][14]}*/}
                    {/*</Text>*/}
                  </View>
                  {/*<Text style={[ appFonts.mdRegular, {color: colors.white, position: 'absolute', top: 8, right: 16 }]}>*/}
                  {/*<Text>{this.state.playerBio[0].rowSet[0][10].split("-")[0]}</Text>*/}
                  {/*<Text style={styles.upperRightSubText}>'</Text>*/}
                  {/*<Text>{this.state.playerBio[0].rowSet[0][10].split("-")[1]}</Text>*/}
                  {/*<Text style={styles.upperRightSubText}>"{' '}</Text>*/}
                  {/*<Text>{this.state.playerBio[0].rowSet[0][11]}</Text>*/}
                  {/*<Text style={styles.upperRightSubText}>lbs</Text>*/}
                  {/*</Text>*/}
                </View>
              </View>
            )}
          {!this.state.isLoading &&
            !this.state.isLoadingBio && (
              <View style={{ backgroundColor: primaryColor }}>
                {this.state.selectedTab === "stats" ? (
                  <View style={[styles.tabRowContainer]}>
                    <TouchableOpacity
                      style={[styles.tabContainer, styles.tabTextSelected]}
                      onPress={() => this.setState({ selectedTab: "stats" })}
                    >
                      <Text style={[styles.tabSelectedText]}>Stats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.tabContainer,
                        { backgroundColor: primaryColor }
                      ]}
                      onPress={() => this.setState({ selectedTab: "bio" })}
                    >
                      <Text style={[styles.tabText]}>Bio</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={[styles.tabRowContainer]}>
                    <TouchableOpacity
                      style={[
                        styles.tabContainer,
                        { backgroundColor: primaryColor }
                      ]}
                      onPress={() => this.setState({ selectedTab: "stats" })}
                    >
                      <Text style={[styles.tabText]}>Stats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.tabContainer,
                        { backgroundColor: primaryColor },
                        this.state.selectedTab === "bio" &&
                          styles.tabTextSelected
                      ]}
                      onPress={() => this.setState({ selectedTab: "bio" })}
                    >
                      <Text style={[styles.tabSelectedText]}>Bio</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          {!this.state.isLoading &&
            !this.state.isLoadingBio &&
            this.showSelectedTab()}
          {this.state.isLoading ||
            (this.state.isLoadingBio && this.showLoadingIndicator())}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baseBackground
  },
  headerContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden"
  },
  headerBackgroundLogo: {
    width: windowSize.width * 2,
    height: windowSize.width * 2,
    opacity: 0.3,
    alignSelf: "center",
    position: "absolute",
    top: -windowSize.width + 100
  },
  linearGradient: {
    width: "100%",
    height: 200,
    position: "absolute"
  },
  linearGradientDark: {
    width: "100%",
    height: 200,
    position: "absolute"
  },
  mainTextColor: {
    color: colors.mainTextColor
  },
  bioSubTextColor: {
    color: colors.secondaryText
  },
  subTextColor: {
    color: colors.secondaryText
  },
  largeText: {
    ...appFonts.xxlBold
  },
  mediumText: {
    ...appFonts.xlBold
  },
  tabText: {
    ...appFonts.lgRegular,
    color: colors.white,
    opacity: 0.7
  },
  tabTextSelected: {
    // borderLeftWidth: 1,
    // borderTopWidth: 1,
    // borderRightWidth: 1,
    // borderColor: colors.white,
    backgroundColor: "transparent",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
    // marginTop: 3
  },
  tabSelectedText: {
    ...appFonts.lgBold,
    // color: colors.mainTextColor,
    color: colors.white,
    opacity: 1
  },
  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  statsContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.baseBackground
  },
  bioContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.baseBackground
  },
  bioTextLarge: {
    ...appFonts.lgBold
  },
  bioRowContainer: {
    flex: 1,
    width: "80%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryBackground,
    paddingBottom: 16
  },
  bioRowSubContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  },
  bioRowSubContainerWide: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 20,
    paddingLeft: 16
  },
  bioTextSmaller: {
    ...appFonts.mdRegular
  },
  tabRowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // paddingVertical: 8,
    paddingHorizontal: 0,
    height: 42
  },
  upperRightSubText: {
    color: colors.greyLight,
    ...appFonts.xsRegular
  },
  bioRowSubSubColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  activityIndicator: {
    marginTop: 32
  }
});

AppRegistry.registerComponent("PlayerDashboard", () => PlayerDashboard);

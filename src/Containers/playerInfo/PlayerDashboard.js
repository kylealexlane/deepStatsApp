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
    Image
} from 'react-native'
import { nbaId, year } from '../../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts } from '../../styles/commonStyles'
import { playerPic, hexToRgbA } from "../../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'

export default class PlayerDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            isLoadingBio: true,
            playerBio: [],
            playerStats: [],
            seasonIndex: 0,
            currentTeamIndex: 0,
            firstName: "",
            lastName: ""
        }
    }

    componentDidMount(){
        console.log('id', this.props.navigation.state.params.playerId);
        return fetch(`https://stats.nba.com/stats/playerprofilev2/?playerId=${this.props.navigation.state.params.playerId}&leagueId=${nbaId}&perMode=PerGame`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                console.log(responseJson.resultSets[0].rowSet.length-1[4]);
                this.loadPlayerBio();
                this.setState({
                    isLoading: false,
                    // playerBio: responseJson.resultSets[0].rowSet,
                    playerStats: responseJson.resultSets,
                    seasonIndex: responseJson.resultSets[0].rowSet.length-1,
                    currentTeamIndex: responseJson.resultSets[0].rowSet[responseJson.resultSets[0].rowSet.length-1][4] === 'TOT' ? responseJson.resultSets[0].rowSet.length-2 : responseJson.resultSets[0].rowSet.length-1
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    loadPlayerBio() {
        return fetch(`https://stats.nba.com/stats/commonplayerinfo/?playerId=${this.props.navigation.state.params.playerId}&leagueId=${nbaId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('second', responseJson);
                console.log('sss', responseJson.resultSets[0].rowSet[0][1]);
                this.setState({
                    isLoadingBio: false,
                    playerBio: responseJson.resultSets,
                    firstName: responseJson.resultSets[0].rowSet[0][1],
                    lastName: responseJson.resultSets[0].rowSet[0][2],
                    // playerStats: responseJson.resultSets,
                    // seasonIndex: responseJson.resultSets[0].rowSet.length-1
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        console.log(this.state);
        console.log('first', this.state.firstName);
        console.log(this.state.lastName);
        return (
            <SafeAreaView style={{flex:1, backgroundColor: 'black' }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.greyDarkest}
                />
                <View style={styles.container}>
                    {!this.state.isLoading && !this.state.isLoadingBio &&
                    <View style={[styles.headerContainer, { backgroundColor: this.state.isLoading ? colors.greyBase : hexToRgbA(teamColors[this.state.playerStats[0].rowSet[this.state.currentTeamIndex][4]].primary, 0.2) }]}>
                        <LinearGradient colors={['#000000', hexToRgbA(teamColors[this.state.playerStats[0].rowSet[this.state.currentTeamIndex][4]].primary, 0.5)]} style={styles.linearGradient}>
                        </LinearGradient>
                        <Image
                            style={styles.headerBackgroundLogo}
                            source={{uri: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${this.state.playerStats[0].rowSet[this.state.currentTeamIndex][4]}.png`}}
                            // source={{uri: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${'TOR'}.png`}}

                            // source={{uri: `https://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/${this.state.playerStats[0].rowSet[this.state.seasonIndex][4]}.png`}}
                        />
                        <Image
                            // rounded
                            source={{uri: playerPic(this.state.firstName, this.state.lastName)}}
                            // onPress={() => console.log("Works!")}
                            // containerStyle={{ backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'flex-end'}}
                            // overlayContainerStyle={{ marginRight: 0, backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'flex-end'}}
                            style={{ height: 150, width: 200, position: 'absolute', left: 0, bottom: 0}}
                        />
                        <View style={{ flex: 1, width: '100%', height: '100%' , backgroundColor: 'transparent', position: 'absolute', flexDirection: 'row' }}>
                            <View style={{ height: '100%', width: '50%'}}>
                            </View>
                            <View style={{ width: '50%', height: '100%', alignItems: 'flex-start', justifyContent: 'center', paddingVertical: 16 }}>
                                <Text style={[styles.subTextColor,appFonts.lgRegular]}>
                                    {this.state.playerBio[0].rowSet[0][1]}
                                </Text>
                                <Text style={[styles.mainTextColor, appFonts.xxlBold]}>
                                    {this.state.playerBio[0].rowSet[0][2]}
                                </Text>
                                <Text style={[styles.mainTextColor, appFonts.mdRegular]}>
                                    # {this.state.playerBio[0].rowSet[0][13]} | {this.state.playerBio[0].rowSet[0][14]}
                                </Text>
                            </View>
                            <Text style={[ appFonts.mdRegular, {color: colors.greyBase, position: 'absolute', top: 8, right: 0 }]}>
                                {this.state.playerBio[0].rowSet[0][10]}  {this.state.playerBio[0].rowSet[0][11]}
                            </Text>
                        </View>
                    </View>}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.greyDarkest
    },
    headerContainer: {
        width: '100%',
        height: 200,
        overflow: 'hidden'
    },
    headerBackgroundLogo: {
        width: windowSize.width*2,
        height: windowSize.width*2,
        opacity: 0.05,
        alignSelf: 'center',
        position: 'absolute',
        top: -(windowSize.width)+100
    },
    linearGradient: {
        width: '100%',
        height: 200,
    },
    mainTextColor: {
        color: colors.greyLightest,
    },
    subTextColor: {
        color: colors.greyLighter,
    },
    largeText: {
        ...appFonts.xxlBold
    },
    mediumText: {
        ...appFonts.xlBold
    }
});

AppRegistry.registerComponent(
    'PlayerDashboard',
    () => PlayerDashboard
);
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
import { List, ListItem, SearchBar } from 'react-native-elements'
import { colors, teamColors } from '../../styles/commonStyles'
import { playerPic, hexToRgbA } from "../../helpers/Helpers"

export default class PlayerDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            playerBio: [],
            playerStats: [],
            seasonIndex: 0,
        }
    }

    componentDidMount(){
        console.log('id', this.props.navigation.state.params.playerId);
        return fetch(`https://stats.nba.com/stats/playerprofilev2/?playerId=${this.props.navigation.state.params.playerId}&leagueId=${nbaId}&perMode=PerGame`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    // playerBio: responseJson.resultSets[0].rowSet,
                    playerStats: responseJson.resultSets,
                    seasonIndex: responseJson.resultSets[0].rowSet.length-1
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        console.log(this.state);
        if (!this.state.isLoading) {
            console.log(this.state.playerStats[0].rowSet[this.state.seasonIndex]);
            console.log(teamColors[this.state.playerStats[0].rowSet[this.state.seasonIndex][4]]);
            console.log(teamColors["ATL"]);
        }

        return (
            <SafeAreaView style={{flex:1, backgroundColor: colors.greyDarkest }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.greyDarkest}
                />
                <View style={styles.container}>
                    <View style={[styles.headerContainer, { backgroundColor: this.state.isLoading ? colors.greyBase : hexToRgbA(teamColors[this.state.playerStats[0].rowSet[this.state.seasonIndex][4]].primary, 0.2) }]}>
                        {this.state.isLoading ? null :
                        <Image
                            style={styles.headerBackgroundLogo}
                            // source={{uri: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${this.state.playerStats[0].rowSet[this.state.seasonIndex][4]}.png`}}
                            source={{uri: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${'TOR'}.png`}}

                            // source={{uri: `https://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/${this.state.playerStats[0].rowSet[this.state.seasonIndex][4]}.png`}}
                        />
                        }

                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    headerContainer: {
        width: '100%',
        height: 200,
    },
    headerBackgroundLogo: {
        width: 200,
        height: 200,
    }
});

AppRegistry.registerComponent(
    'PlayerDashboard',
    () => PlayerDashboard
);
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
    SafeAreaView
} from 'react-native'
import { nbaId, year } from '../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar } from 'react-native-elements'
import { colors, teamColors } from '../styles/commonStyles'

export default class PlayerStats extends React.Component {
    static propTypes = {
        playerID: PropTypes.oneOfType([
               PropTypes.string,
               PropTypes.number
           ]).isRequired,
    };
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state ={
            dataSource: ds.cloneWithRows([]),
            isLoading: true,
            playersList: [],
        }
    }

    componentDidMount(){
        return fetch(`https://stats.nba.com/stats/commonallplayers/?leagueId=${nbaId}&season=${year}&isOnlyCurrentSeason=1`)
        // return fetch('https://stats.nba.com/stats/commonallplayers/?leagueId=00&season=2015-16&isOnlyCurrentSeason=1')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.resultSets[0].rowSet),
                    playersList: responseJson.resultSets[0].rowSet,
                }, function(){
                    console.log(responseJson.resultSets[0].rowSet);
                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        return (
            <SafeAreaView style={{flex:1, paddingTop: 20, backgroundColor: colors.greyDarkest }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.greyDarkest}
                />

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
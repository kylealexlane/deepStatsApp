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
import { nbaId, year } from '../../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar } from 'react-native-elements'
import { colors, teamColors } from '../../styles/commonStyles'

export default class PlayerDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            playerBio: [],
            playerStats: [],
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
                    dataSource: responseJson.resultSets[0].rowSet,
                    playersList: responseJson.resultSets[0].rowSet,
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
                <View>

                </View>
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
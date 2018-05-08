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
import { List, ListItem, SearchBar } from 'react-native-elements'
import { colors, teamColors, appFonts } from '../styles/commonStyles'
import LinearGradient from 'react-native-linear-gradient'
import { hexToRgbA } from "../helpers/Helpers";

export default class PlayerStats extends React.Component {
    static navigationOptions = {
        header: null,
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
                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    // filterSearch(text){
    //     const newData = this.state.playersList.filter((player)=>{
    //         const itemData = player[2].toUpperCase();
    //         const textData = text.toUpperCase();
    //         return itemData.indexOf(textData)>-1
    //     });
    //     this.setState({
    //         text:text,
    //         playersList: newData // after filter we are setting users to new array
    //     });
    // }
    //
    // render() {
    //     // rather than mapping users loaded from data file we are using state value
    //     return (
    //         <View style={{flex: 1, paddingTop: 30}}>
    //         <ScrollView>
    //             <TextInput
    //                 onChangeText={(text) => this.filterSearch(text)}
    //                 value={this.state.text}
    //             />
    //             <List>
    //                 {this.state.playersList.map((player) => (
    //                     <ListItem
    //                         key={player[0]}
    //                         roundAvatar
    //                         // avatar={{ uri: user.picture.thumbnail }}
    //                         title={`${player[2].toUpperCase()}`}
    //                         subtitle={player[8]}
    //                         // onPress={() => this.onLearnMore(user)}
    //                     />
    //                 ))}
    //             </List>
    //         </ScrollView>
    //         </View>
    //     );
    // }

    onLearnMore = (rowData) => {
        this.props.navigation.push('playerDashboard', { playerId: rowData[0] });
    };
    renderRow(rowData){
        const firstLast = rowData[2].split(" ");
        const primaryColor = teamColors[rowData[10]] ? teamColors[rowData[10]].primary : colors.greyDarkest;
        const secondaryColor = teamColors[rowData[10]] ? teamColors[rowData[10]].secondary : colors.greyDarkest;
        return(
            <ListItem
                key={rowData[0]}
                roundAvatar
                // avatar={{ uri: `https://nba-players.herokuapp.com/players/${firstLast[1]}/${firstLast[0]}` }}
                // leftAvatar={ small,  }
                leftAvatar={{
                    rounded: true,
                    source: { uri: `https://nba-players.herokuapp.com/players/${firstLast[1]}/${firstLast[0]}` },
                    // medium: true,
                    // containerStyle: { backgroundImage: 'white' },
                    avatarStyle: { backgroundColor: primaryColor, borderWidth: 1, borderColor: secondaryColor },
                    height: 60,
                    width: 60
                }}
                // scaleProps={{
                //     friction: 90,
                //     tension: 100,
                //     activeScale: 0.95,
                // }}
                // linearGradientProps={{
                //     colors: [hexToRgbA(primaryColor, 0.1), colors.baseBackground],
                //     style:styles.linearGradient,
                //     start:{x: 0.0, y: 0.5},
                //     end:{x: 0.2, y: 0.5},
                //     // locations:[0,0.5,0.6],
                // }}
                // ViewComponent={LinearGradient}
                title={`${rowData[2]}`}
                titleStyle={{ color: colors.baseText, ...appFonts.lgBold }}
                subtitle={rowData[8]}
                subtitleStyle={{ color: colors.secondaryText, ...appFonts.mdMedium }}
                containerStyle={{ borderBottomColor: colors.secondaryBackground, borderBottomWidth: 1, backgroundColor: 'transparent', height: 80 }}
                chevronColor={colors.secondaryText}
                chevron
                bottomDivider={false}
                onPress={() => this.onLearnMore(rowData)}
            />
        );
    }

    filterSearch(text){
        const newData = this.state.playersList.filter(function(player){
            const itemData = player[2].toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
        });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: colors.baseBackground }}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={colors.baseBackground}
                />
                <SearchBar
                    round
                    onChangeText={(text) => this.filterSearch(text)}
                    value={this.state.text}
                    placeholder={'Search'}
                    platform="ios"
                    containerStyle={{ backgroundColor: colors.baseBackground, borderColor: colors.baseBackground }}
                />
                <ListView
                    enableEmptySections={true}
                    style={{marginHorizontal: 0}}
                    renderRow={this.renderRow.bind(this)}
                    dataSource={this.state.dataSource}
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
    linearGradient: {
        flex: 1,
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 0,
    },
});

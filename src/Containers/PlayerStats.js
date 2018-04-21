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
    ListView
} from 'react-native'
import { nbaId, year } from '../config/commonVariables'
import { List, ListItem, SearchBar } from 'react-native-elements'
import { colors, teamColors } from '../styles/commonStyles'

export default class PlayerStats extends React.Component {
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
        // this.props.navigation.navigate('Details', { ...rowData });
    };
    renderRow(rowData){
        const firstLast = rowData[2].split(" ");
        const primaryColor = teamColors[rowData[10]] ? teamColors[rowData[10]].primary : colors.greyDarkest;
        const secondaryColor = teamColors[rowData[10]] ? teamColors[rowData[10]].secondary : colors.greyDarkest;
        console.log(firstLast);
        console.log(`https://nba-players.herokuapp.com/players/${firstLast[1]}/${firstLast[0]}`);
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
                    // containerStyle: { backgroundColor: 'white' },
                    avatarStyle: { backgroundColor: primaryColor },
                    height: 60,
                    width: 60
                }}
                title={`${rowData[2].toUpperCase()}`}
                titleStyle={{ color: colors.baseText }}
                subtitle={rowData[8]}
                subtitleStyle={{ color: colors.secondaryText }}
                containerStyle={{ borderBottomColor: 'black', borderBottomWidth: 1, backgroundColor: colors.greyDarkest, height: 70 }}
                chevronColor={ colors.baseText }
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
            <View style={{flex:1, paddingTop: 20, backgroundColor: colors.greyDarkest }}>
                <SearchBar
                    round
                    onChangeText={(text) => this.filterSearch(text)}
                    value={this.state.text}
                    placeholder={'search'}
                    platform="ios"
                    containerStyle={{ backgroundColor: colors.greyDarkest, borderColor: colors.greyDarkest }}
                />
                <ListView
                    enableEmptySections={true}
                    style={{marginHorizontal: 0}}
                    renderRow={this.renderRow.bind(this)}
                    dataSource={this.state.dataSource}
                />
            </View>
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

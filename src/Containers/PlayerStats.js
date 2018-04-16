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
import { List, ListItem } from 'react-native-elements'

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
        return(
            <ListItem
                key={rowData[0]}
                roundAvatar
                // avatar={{ uri: rowData.picture.thumbnail }}
                title={`${rowData[2].toUpperCase()}`}
                subtitle={rowData[8]}
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
            <View style={{flex:1, marginTop: 50}}>
                <TextInput
                    onChangeText={(text) => this.filterSearch(text)}
                    value={this.state.text}
                />
                <ListView
                    enableEmptySections={true}
                    style={{marginHorizontal:10}}
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

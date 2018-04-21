import React from 'react'
import {StyleSheet, Text, View, Image, ListView} from 'react-native'
import {colors} from '../styles/commonStyles'
import {nbaId, year} from "../config/commonVariables";

export default class Standings extends React.Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state ={
            dataSource: ds.cloneWithRows([]),
            isLoading: true,
            playersList: [],
        }
    }
  static navigationOptions = {
    // drawerLabel: 'Standings',
    // drawerIcon: () => (
    //   <Image
    //     source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
    //     style={{width: 30, height: 30, borderRadius: 15}}
    //   />
    // )
  };

  componentDidMount() {
      return fetch(`https://stats.nba.com/stats/commonallplayers/?leagueId=${nbaId}&season=${year}&isOnlyCurrentSeason=1`)
      // return fetch('https://stats.nba.com/stats/commonallplayers/?leagueId=00&season=2015-16&isOnlyCurrentSeason=1')
          .then((response) => response.json())
          .then((responseJson) => {
              let playerImages=[];
              responseJson.resultSets[0].rowSet.forEach((player) => {
                const firstLast = player[2].split(" ");
                console.log(firstLast);
                console.log(player);
                console.log(`https://nba-players.herokuapp.com/players/${firstLast[1]}/${firstLast[0]}`);
                  // fetch(`https://nba-players.herokuapp.com/players/${}/${}`)
              });
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
      <View style={styles.container}>
        <Text>Conference Standings</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyDarkest,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

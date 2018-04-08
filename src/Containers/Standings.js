import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class Standings extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Standings',
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  };

  getStandings() {

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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

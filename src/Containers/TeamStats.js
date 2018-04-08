import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class TeamStats extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Team Stats',
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=3`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          <Text></Text>
        </View>
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
      paddingHorizontal: 16,
  },
    tabsContainer: {
      flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import img from '../img/diamondLogo.png'

export default class DrawerContainer extends React.Component {

  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
    });
    this.props.navigation.dispatch(actionToDispatch)
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <View style={styles.drawerHeading}>
              {/*<Image*/}
                  {/*source={require(`../img/triangleLogo.png`)}*/}
                  {/*style={{height: 150, width: '100%', resizeMode: 'contain'}}*/}
              {/*/>*/}
              <Text style={styles.headerText}>
                  Deep Stats
              </Text>
          </View>
          <View style={styles.drawerItem}>
              <Icon name="sort-ascending" size={30} color="white" />
              <Text
                  onPress={() => navigation.navigate('standings')}
                  style={styles.drawerText}
              >
                  Standings
              </Text>
          </View>
          <View style={styles.drawerItem}>
              <Icon name="human-greeting" size={30} color="white" />
              <Text
                  onPress={() => navigation.navigate('playerStats')}
                  style={styles.drawerText}
              >
                  Player Stats
              </Text>
          </View>
          <View style={styles.drawerItem}>
              <Icon name="account-multiple" size={30} color="white" />
              <Text
                  onPress={() => navigation.navigate('teamStats')}
                  style={styles.drawerText}
              >
                  Team Stats
              </Text>
          </View>
          <View style={styles.drawerItem}>
              <Icon name="trophy-award" size={30} color="white" />
              <Text
                  onPress={() => navigation.navigate('leaders')}
                  style={styles.drawerText}
              >
                  Leaders
              </Text>
          </View>
        {/*<Text*/}
          {/*onPress={() => navigation.navigate('playerStats')}*/}
          {/*style={styles.uglyDrawerItem}>*/}
          {/*Player Stats*/}
        {/*</Text>*/}
        {/*<Text*/}
          {/*onPress={() => navigation.navigate('teamStats')}*/}
          {/*style={styles.uglyDrawerItem}>*/}
          {/*Team Stats*/}
        {/*</Text>*/}
          {/*<Text*/}
              {/*onPress={() => navigation.navigate('leaders')}*/}
              {/*style={styles.uglyDrawerItem}>*/}
              {/*Leaders*/}
          {/*</Text>*/}
        {/*<Text*/}
          {/*onPress={this.logout}*/}
          {/*style={styles.uglyDrawerItem}>*/}
          {/*Log Out*/}
        {/*</Text>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 16,
    paddingHorizontal: 0,
  },
  drawerItem: {
        width: '100%',
      backgroundColor: 'black',
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      paddingHorizontal: 16,
  },
    drawerText: {
        color: 'white',
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 16,
    },
    drawerHeading: {
        width: '100%',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    headerText: {
        alignSelf: 'flex-start',
        paddingLeft: 16,
        color: 'white',
        // textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 30,
        // fontFamily: 'Arial', // Change for android later
        letterSpacing: 4
    }
});

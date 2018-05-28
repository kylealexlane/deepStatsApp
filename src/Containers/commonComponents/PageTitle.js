import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { List } from "react-native-elements";
import { appFonts, colors } from "../../styles/commonStyles";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class PageTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.pageTitleContainer}>
        {/*{this.props.iconName && this.props.iconColor && <Ionicons name={this.props.iconName} size={40} color={this.props.iconColor} />}*/}
        <Text style={styles.pageTitleText}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageTitleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.mainAccent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  pageTitleText: {
    ...appFonts.lgBold,
    color: colors.white
    // textAlign: 'center',
    // marginLeft: 16
    // letterSpacing: 4
  }
});

import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";

class Row extends Component {
  render() {
    const { complete } = this.props;  // I think same as: const complete  = this.props.complete;
    console.log("row.js: " + this.props.myKey);
    return (
      <TouchableOpacity onPress={this.props.onRowPress}>
        <View style={styles.container}>

          <View style={styles.textWrap}>
            <Text style={[styles.text, complete && styles.complete]}>
              {this.props.text}
            </Text>
          </View>
          
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10
  },
  complete: {
    textDecorationLine: 'line-through'
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d",
  },
  destroy:
  {
    fontSize: 20,
    color: "#cc9a9a"
  }
})
export default Row;

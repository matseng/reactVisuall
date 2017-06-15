// VisuallsListView.js

import React, { Component } from "react";
import { View, Text, StyleSheet, ListView, Platform } from "react-native";
import Row from "./Row";

class MyList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds
    };
  }

  render() {
    return (
      <ListView
      	{...this.props}
      	style = {styles.list}
      	enableEmptySections
        dataSource={this.state.ds.cloneWithRows(this.props.dataSource)}
        renderRow={ (rowData) => <Row onRowPress={this.props.onRowPress} key={rowData.key} text={rowData.title} /> }
        renderSeparator={(sectionId, rowId) => {
          return <View key={rowId} style={styles.separator} />
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  }
})

export default MyList;
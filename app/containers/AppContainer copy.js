
// https://medium.com/@jonlebensold/getting-started-with-react-native-redux-2b01408c0053
// https://github.com/reactjs/redux/blob/master/docs/faq/Performance.md
import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Header from './header';
import Footer from './footer';
const {
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  TouchableHighlight
} = ReactNative;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items:[]
    }
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  addRecipe() {
    this.props.addRecipe();
  }

  handleAddItem() {
    console.log('asdflahsdfklasdlk');
    if (!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setState({
      items: newItems,
      value: ""
    })
  }

  render() {
    return (
        <View style={styles.container}>
        <Header />
          <View style={styles.content}>

          <Text style={{marginTop: 20}}>
          I am AppContainer! Recipe Count: {this.props.recipeCount}
          </Text>
          <TouchableHighlight onPress={() => {this.addRecipe() }}>
            <Text>Add recipe </Text>
          </TouchableHighlight>
          <Footer />
        </View>
      </View>
    )
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
  }
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     ...Platform.select({
//       ios: { paddingTop: 30 }
//     })
//   },
//   content: {
//     flex: 1
//   }


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {
    recipeCount: state.recipeCount
  }
}, mapDispatchToProps)(AppContainer);

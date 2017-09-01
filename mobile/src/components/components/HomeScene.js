import React, { Component } from 'react';
import { Text, View, ListView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Button, CardSection } from '../common'
// import ListItem from './ListItem';
import { Scene, Router, Actions } from 'react-native-router-flux';

import { fetchCampuses, fetchStudents } from '../../reducers';

class HomeScene extends Component {

  componentDidMount() {
    this.props.fetchData()
  }
  render() {
    const topStyle = {
      fontSize: 20,
      paddingLeft: 15,
      paddingRight: 15
    }
    const botStyle = {
      // paddingLeft: 15,
      // paddingRight: 15
      padding: 15
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> The Margaret Hamilton Interplanetary Academy of JavaScript</Text>
        <Text style={styles.instructions}> The premier Javascript education institution in the cosmos now has the best student management platform ever. Yes, in 3017 we are still using Sequelize, Express, React, and Redux because the best institutions have 1000 year backwards compatibility. </Text>
        <CardSection>
          <Button onPress={() => {Actions.campuses()}}>
            <Text>Manage Campuses</Text>
          </Button>
          <Button onPress={() => {Actions.students()}}>
            <Text>Manage Students</Text>
          </Button>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    padding: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
};

const mapStateToProps = state => {
  return {}
  // return { libraries: state.libraries };
};
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchData() {
      dispatch(fetchCampuses())
      dispatch(fetchStudents())
    }
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(HomeScene);
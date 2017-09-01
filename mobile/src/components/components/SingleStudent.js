import React, { Component } from 'react';
import { Text, View, ListView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';

export default class extends Component {
  componentWillUpdate() {
    Actions.refresh({title: this.props.selectedStudent.name})
  }

  render() {
    const {
      thumbnailContainerStyle, 
      thumbnailStyle,
      headerContentStyle,
      headerTextStyle,
      buttonStyle,
      textStyle
    } = styles
    const student = this.props.selectedStudent
    return (
      <View>
          <CardSection>
            <View style={thumbnailContainerStyle}>
              <Image 
              style={thumbnailStyle}
              source={{ uri: student.photo }} 
              />
            </View>
            <View style={headerContentStyle}>
              <Text style={headerTextStyle}>{student.name}</Text>
            </View>
          </CardSection>
          <CardSection>
            <TouchableOpacity onPress={() => Actions.campusDetail({campus: student.campus})} style={buttonStyle}>
              <Text style={textStyle}>{student.campus.name}</Text>
            </TouchableOpacity>
          </CardSection> 
          <CardSection>
            <View>
              <Text style={headerTextStyle}>Bio</Text>
              <Text style={textStyle}>{student.bio}</Text>
            </View>
          </CardSection>
          <CardSection>
            <View>
              <Text style={headerTextStyle}>Phone</Text>
              <Text style={textStyle}>{student.phone}</Text>
            </View>
          </CardSection>
          <CardSection>
            <View>
              <Text style={headerTextStyle}>Email</Text>
              <Text style={textStyle}>{student.email}</Text>
            </View>
          </CardSection>
      </View>
    );
  }
}


const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    height: 20
  },
  buttonStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
  },
  headerContentStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};
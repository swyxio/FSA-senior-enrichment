import React, { Component } from 'react';
import { 
  Text, View, 
  ListView,
  // TouchableWithoutFeedback,
  LayoutAnimation, Image,
  TouchableOpacity
  } from 'react-native';
import { CardSection, Card } from '../common';
import { Actions } from 'react-native-router-flux';

export default class extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.campuses);
  }
	componentWillReceiveProps() {
    this.props.fetchCampuses()
	}
  renderRow(campus) {
    const pressedDelete = () => this.props.deleteCampus(campus.id)
    const pressedEdit = () => Actions.editCampus({campus})
    const {
      thumbnailContainerStyle, 
      thumbnailStyle,
      headerContentStyle,
      headerTextStyle,
      buttonStyle,
      textStyle
    } = styles
    return (
        <View>
          <CardSection>
            <TouchableOpacity 
              style={{flex: 2, flexDirection: 'row'}}
              onPress={() => Actions.campusDetail({campus})}
            >
              <View style={thumbnailContainerStyle}>
                <Image 
                style={thumbnailStyle}
                source={{ uri: campus.imageUrl }} 
                />
              </View>
              <View style={headerContentStyle}>
                <Text style={headerTextStyle}>{campus.name}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressedEdit(campus)} style={buttonStyle}>
              <Text style={textStyle}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressedDelete(campus)} style={buttonStyle}>
              <Text style={textStyle}>Delete</Text>
            </TouchableOpacity>
          </CardSection>
        </View>
    )
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.campuses);
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
    // flex: 1,
    width: null
  },
  thumbnailContainerStyle: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};
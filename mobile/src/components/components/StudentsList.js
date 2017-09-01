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
    Actions.refresh({title: this.props.pagetitle})
  }
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.studentsList);
    
  }
	componentWillReceiveProps() {
    this.props.fetchStudents()
	}
  renderRow(student) {
    const pressedDelete = () => this.props.deleteStudent(student.id)
    const pressedEdit = () => Actions.editStudent({student})
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
            <TouchableOpacity onPress={() => Actions.studentDetail({student})} style={{flex: 2, flexDirection: 'row'}}>
              <View style={thumbnailContainerStyle}>
                <Image 
                style={thumbnailStyle}
                source={{ uri: student.photo }} 
                />
              </View>
              <View style={headerContentStyle}>
                <Text style={headerTextStyle}>{student.name}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressedEdit(student)} style={buttonStyle}>
              <Text style={textStyle}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressedDelete(student)} style={buttonStyle}>
              <Text style={textStyle}>Delete</Text>
            </TouchableOpacity>
          </CardSection>
        </View>
    )
  }

  componentDidMount() {
    this.props.fetchStudents()
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.studentsList);
    return (
      !this.props.studentsList.length ? 
        <View style={styles.container}>
          <Text style={styles.welcome}>
            No students found
          </Text>
          <Text style={styles.instructions}>
            Add some!
          </Text>
        </View>
      : <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
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
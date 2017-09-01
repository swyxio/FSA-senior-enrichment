import React, { Component } from 'react';
import { Text, View, ListView, Picker } from 'react-native';
import { CardSection, Input, Card, Button } from '../common';

export default class extends Component {

	constructor(props) {
		super(props)
		this.pagetitle = this.props.selectedStudent ? 'Edit Student' : 'Add New Student'
		this.submitbuttonText = this.props.selectedStudent ? 'Edit Student' : 'Add New Student'
		const student = this.props.selectedStudent || {name: '', bio: ''}
		student.campusId = student.campusId || ((this.props.campuses.length > 0 && this.props.campuses[0].id) || undefined)
		this.state = student
		this.handleField = this.handleField.bind(this)
	}
	handleField(value, field){
		this.setState({[field]: value})
	}
	componentDidMount() {
		this.props.fetchData()
	}
	componentWillReceiveProps ({selectedStudent}) {
    if (selectedStudent) this.setState(selectedStudent)
	}
  render() {
    console.log('this.props.campusId', this.props.campusId)
    return (
      <Card>
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Student Name"
            value={this.state.name}
            onChangeText={v => this.handleField(v, 'name')}
          />
        </CardSection>
        <CardSection>
          <Input
            label="bio"
            placeholder="Student bio"
            value={this.state.bio}
            onChangeText={v => this.handleField(v, 'bio')}
          />
        </CardSection>
        <CardSection>
          <Input
            label="phone"
            placeholder="Student phone"
            value={this.state.phone}
            onChangeText={v => this.handleField(v, 'phone')}
          />
        </CardSection>
        <CardSection>
          <Input
            label="photo"
            placeholder="Student photo"
            value={this.state.photo}
            onChangeText={v => this.handleField(v, 'photo')}
          />
        </CardSection>
        <CardSection>
          <Input
            label="email"
            placeholder="Student email"
            value={this.state.email}
            onChangeText={v => this.handleField(v, 'email')}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Campus</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.state.campusId}
            onValueChange={v => {this.handleField(v, 'campusId')}}
          >
            {this.props.campuses.map(campus => 
              <Picker.Item label={campus.name} key={campus.id} value={campus.id}>{campus.name}</Picker.Item>
              )
            }
          </Picker>
        </CardSection>
      </View>

        <CardSection>
          <Button onPress={() => this.props.handleSubmit(
            this.state
          )}>
            {this.props.isEdit ? 'Edit Student' : 'Add Student'}
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};
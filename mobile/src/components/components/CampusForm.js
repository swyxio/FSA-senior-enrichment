import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import { CardSection, Input, Card, Button } from '../common';

export default class extends Component {

	constructor(props) {
		super(props)
		this.state = {
			name: this.props.campusName || '',
			imageUrl: this.props.campusImage || ''
		}
		this.handleName = this.handleName.bind(this)
		this.handleUrl = this.handleUrl.bind(this)
	}
	handleName(value){
		this.setState({name: value})
	}
	handleUrl(value){
		this.setState({imageUrl: value})
	}
  render() {
    return (
      <Card>
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="CampusName"
            value={this.state.name}
            onChangeText={this.handleName}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Image Url"
            placeholder="ImageUrl"
            value={this.state.imageUrl}
            onChangeText={this.handleUrl}
          />
        </CardSection>
      </View>

        <CardSection>
          <Button onPress={() => this.props.handleSubmit(
            this.state.name,
            this.state.imageUrl,
            this.props.campusId
          )}>
            {this.props.isEdit ? 'Edit Campus' : 'Add Campus'}
          </Button>
        </CardSection>
      </Card>
    );
  }
}
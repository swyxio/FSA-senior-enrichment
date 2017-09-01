import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewCampus } from '../reducers';
import CampusForm from '../components/CampusForm';

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit (evt, name, imageUrl) {
      evt.preventDefault();
      dispatch(postNewCampus({ name, imageUrl }, ownProps.history));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CampusForm);

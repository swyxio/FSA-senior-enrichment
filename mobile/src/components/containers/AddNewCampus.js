import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewCampus, fetchCampuses } from '../../reducers';
import CampusForm from '../components/CampusForm';


const mapStateToProps = function (state) {
  return {
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit (name, imageUrl) {
      dispatch(postNewCampus({ name, imageUrl }));
      dispatch(fetchCampuses())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampusForm);

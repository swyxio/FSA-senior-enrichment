import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewStudent, fetchCampuses } from '../reducers';
import AddEditStudent from '../components/AddEditStudent';
import { withRouter, NavLink } from 'react-router-dom';


const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    // handleChange (evt) {
    //   dispatch(writeChannelName(evt.target.value));
    // },
    handleSubmit (evt, name, bio, campusId) {
      evt.preventDefault();
      dispatch(postNewStudent({ name, bio, campusId }, ownProps.history));
      // dispatch(writeChannelName(''));
    },
    fetchCampuses() {
      dispatch(fetchCampuses())
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditStudent);

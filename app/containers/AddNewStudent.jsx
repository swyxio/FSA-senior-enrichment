import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewStudent, fetchCampuses } from '../reducers';
import StudentForm from '../components/StudentForm';
import { withRouter, NavLink } from 'react-router-dom';


const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit (evt, student) {
      evt.preventDefault();
      dispatch(postNewStudent(student, ownProps.history));
    },
    fetchData() {
      dispatch(fetchCampuses())
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentForm);

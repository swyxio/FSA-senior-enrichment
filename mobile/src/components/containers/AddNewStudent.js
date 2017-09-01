import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewStudent, fetchCampuses } from '../../reducers';
import StudentForm from '../components/StudentForm';


const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit (student) {
      dispatch(postNewStudent(student));
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

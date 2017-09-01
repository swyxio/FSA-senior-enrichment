import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putStudent, fetchCampuses, fetchStudent } from '../../reducers';
import StudentForm from '../components/StudentForm';


const mapStateToProps = function (state, ownProps) {
  return {
    selectedStudent: ownProps.student,
    campuses: state.campuses,
    isEdit: true
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit (student) {
      dispatch(putStudent(student));
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

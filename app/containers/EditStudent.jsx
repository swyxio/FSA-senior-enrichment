import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putStudent, fetchCampuses, fetchStudent } from '../reducers';
import StudentForm from '../components/StudentForm';


const mapStateToProps = function (state) {
  return {
    selectedStudent: state.selectedStudent,
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchData() {
      dispatch(fetchStudent(ownProps.match.params.studentId))
      dispatch(fetchCampuses())
    },
    handleSubmit (evt, student) {
      evt.preventDefault();
      dispatch(putStudent(student, ownProps.history));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentForm);

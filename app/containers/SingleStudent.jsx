import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../reducers';
import SingleStudent from '../components/SingleStudent';


const mapStateToProps = function (state, ownProps) {
  return {
    selectedStudent: state.selectedStudent
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchStudent() {
      dispatch(fetchStudent(ownProps.match.params.studentId))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent);

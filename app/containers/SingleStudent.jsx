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
      console.log('ownProps.match.params', ownProps.match.params)
      dispatch(fetchStudent(ownProps.match.params.studentId))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent);

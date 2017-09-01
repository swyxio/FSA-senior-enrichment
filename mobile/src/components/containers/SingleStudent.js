import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../../reducers';
import SingleStudent from '../components/SingleStudent';


const mapStateToProps = function (state, ownProps) {
  // console.log('ownProps.student', ownProps.student)
  return {
    selectedStudent: ownProps.student
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchStudent() {
      dispatch(fetchStudent(ownProps.student.id))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent);

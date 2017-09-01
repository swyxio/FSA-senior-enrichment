import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentsOfCampus, deleteStudent } from '../../reducers';
import StudentsList from '../components/StudentsList';


const mapStateToProps = function (state, ownProps) {
  return {
    studentsList: state.students.students,
    backgroundImage: `url('${state.students.campus.imageUrl}')`,
    pagetitle: state.students.campus.name,
    campusId: state.students.campus.id
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  // console.log('ownProps', ownProps)
  return {
    fetchStudents() {
      dispatch(fetchStudentsOfCampus(ownProps.campus.id))
    },
    deleteStudent(studentId) {
      dispatch(deleteStudent(studentId))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsList);

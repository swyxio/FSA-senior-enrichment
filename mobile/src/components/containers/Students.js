import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudents, deleteStudent } from '../../reducers';
import StudentsList from '../components/StudentsList';


const mapStateToProps = function (state) {
  return {
    studentsList: state.students.students,
    backgroundImage: "url('https://images.unsplash.com/photo-1462536943532-57a629f6cc60?crop=entropy&dpr=2&fit=crop&fm=jpg&h=750&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1450')",
    pagetitle: "All Students"
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchStudents() {
      dispatch(fetchStudents())
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

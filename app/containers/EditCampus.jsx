import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putCampus } from '../reducers';
import CampusForm from '../components/CampusForm';


const mapStateToProps = function (state) {
  return {
    // studentsList: state.students.students,
    // backgroundImage: `url('${state.students.campus.imageUrl}')`,
    // pagetitle: ownProps.match.params.campusId
    campusName: state.students.campus.name,
    campusImage: state.students.campus.imageUrl,
    campusId: state.students.campus.id
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    // handleChange (evt) {
    //   dispatch(writeChannelName(evt.target.value));
    // },
    fetchCampusInfo() {
        dispatch(fetchStudentsOfCampus(ownProps.match.params.campusId))
    },
    handleSubmit (evt, name, imageUrl, campusId) {
      evt.preventDefault();
      dispatch(putCampus({ name, imageUrl }, campusId, ownProps.history));
      // dispatch(writeChannelName(''));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampusForm);

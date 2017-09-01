import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putCampus } from '../reducers';
import CampusForm from '../components/CampusForm';


const mapStateToProps = function (state) {
  return {
    campusName: state.students.campus.name,
    campusImage: state.students.campus.imageUrl,
    campusId: state.students.campus.id
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchCampusInfo() {
        dispatch(fetchStudentsOfCampus(ownProps.match.params.campusId))
    },
    handleSubmit (evt, name, imageUrl, campusId) {
      evt.preventDefault();
      dispatch(putCampus({ name, imageUrl }, campusId, ownProps.history));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampusForm);

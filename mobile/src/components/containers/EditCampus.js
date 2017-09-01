import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putCampus, fetchCampuses } from '../../reducers';
import CampusForm from '../components/CampusForm';


const mapStateToProps = function (state, ownProps) {
  return {
    campusName: ownProps.campus.name,
    campusImage: ownProps.campus.imageUrl,
    campusId: ownProps.campus.id,
    isEdit: true
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchCampusInfo() {
      dispatch(fetchStudentsOfCampus(ownProps.campus.id))
      dispatch(fetchCampuses())
    },
    handleSubmit (name, imageUrl, campusId) {
      dispatch(putCampus({ name, imageUrl }, campusId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampusForm);

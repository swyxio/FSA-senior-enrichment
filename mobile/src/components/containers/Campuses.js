import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampuses, deleteCampus } from '../../reducers';
import Campuses from '../components/Campuses';


const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchCampuses() {
      dispatch(fetchCampuses())
    },
    deleteCampus(campusId) {
      dispatch(deleteCampus(campusId))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campuses);

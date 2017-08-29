import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampuses, deleteCampus } from '../reducers';
import Campuses from '../components/Campuses';


const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    // handleChange (evt) {
    //   dispatch(writeChannelName(evt.target.value));
    // },
    // handleSubmit (evt) {
    //   evt.preventDefault();
    //   const name = evt.target.channelName.value;
    //   dispatch(postChannel({ name }, ownProps.history));
    //   dispatch(writeChannelName(''));
    // }
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

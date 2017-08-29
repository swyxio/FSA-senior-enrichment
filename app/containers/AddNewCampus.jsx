import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewCampus } from '../reducers';
import AddNewCampus from '../components/AddNewCampus';


const mapStateToProps = function (state) {
  return {
    // newChannelEntry: state.newChannelEntry
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    // handleChange (evt) {
    //   dispatch(writeChannelName(evt.target.value));
    // },
    handleSubmit (evt, name, imageUrl) {
      evt.preventDefault();
      dispatch(postNewCampus({ name, imageUrl }, ownProps.history));
      // dispatch(writeChannelName(''));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewCampus);

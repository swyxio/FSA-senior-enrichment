import axios from 'axios';

// ACTION TYPES
const GET_CAMPUS = 'GET_CAMPUS';

// ACTION CREATORS
export function getCampus (campus) {
  const action = { type: GET_CAMPUS, campus };
  return action;
}

// THUNK CREATORS
export function fetchCampus (campusId) {

  return function thunk (dispatch) {
    return axios.get('/api/campuses/' + campusId )
      .then(res => res.data)
      .then(campus => {
        dispatch(getCampus(campus));
      });
  };
}

// REDUCER
export default function reducer (state = {}, action) {
  switch (action.type) {

    case GET_STUDENT:
      return action.student;
    default:
      return state;
  }

}

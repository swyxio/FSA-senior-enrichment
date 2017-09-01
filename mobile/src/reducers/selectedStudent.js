import axios from 'axios';

// ACTION TYPES
const GET_STUDENT = 'GET_STUDENT';

// ACTION CREATORS
export function getStudent (student) {
  const action = { type: GET_STUDENT, student };
  return action;
}

// THUNK CREATORS
export function fetchStudent (studentId) {

  return function thunk (dispatch) {
    return axios.get('/api/students/' + studentId )
      .then(res => res.data)
      .then(student => {
        dispatch(getStudent(student));
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

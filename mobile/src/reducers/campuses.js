import axios from 'axios';
import { Actions } from 'react-native-router-flux';

// ACTION TYPES
const ADD_NEW_CAMPUS = 'ADD_NEW_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';

// ACTION CREATORS
export function removeCampus (campusId) {
  const action = { type: REMOVE_CAMPUS, campusId };
  return action;
}

export function addCampus (campus) {
  const action = { type: ADD_NEW_CAMPUS, campus };
  return action;
}
export function editCampus (campus) {
  const action = { type: EDIT_CAMPUS, campus };
  return action;
}

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

// THUNK CREATORS

export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('http://localhost:1337/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  };
}

export function postNewCampus (campus) {

  return function thunk (dispatch) {
    return axios.post('http://localhost:1337/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(addCampus(newCampus));
        Actions.pop();
      });
  };
}
export function putCampus (campus, campusId) {

  return function thunk (dispatch) {
    return axios.put('http://localhost:1337/api/campuses/' + campusId, campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(editCampus(newCampus.campus));
        Actions.pop();
      });
  };
}


export function deleteCampus (campusId) {

  return function thunk (dispatch) {
    return axios.delete('http://localhost:1337/api/campuses/' + campusId )
      .then(res => res.data)
      .then(() => {
        dispatch(removeCampus(campusId));
      });
  };
}

// REDUCER
export default function reducer (state = [], action) {
  switch (action.type) {

    case GET_CAMPUSES:
      return action.campuses;

    case ADD_NEW_CAMPUS:
      return [...state, action.campus];

    case REMOVE_CAMPUS:
      return [...state].filter(campus => campus.id != action.campusId);

    case EDIT_CAMPUS:
      const filtered = [...state].filter(campus => campus.id != action.campus.id);
      return [...filtered, action.campus]

    default:
      return state;
  }

}

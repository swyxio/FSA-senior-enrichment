import axios from 'axios';

// ACTION TYPES
const ADD_NEW_CAMPUS = 'ADD_NEW_CAMPUS';
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

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

// THUNK CREATORS

export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  };
}

export function postNewCampus (campus, history) {

  return function thunk (dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(addCampus(newCampus));
        // history.push(`/campuses/${newCampus.campus.id}`);
        history.push(`/campuses/`);
      });
  };
}


export function deleteCampus (campusId) {

  return function thunk (dispatch) {
    return axios.delete('/api/campuses/' + campusId )
      .then(res => res.data)
      .then(() => {
        dispatch(removeCampus(campusId));
        // history.push(`/campuses/${newCampus.campus.id}`);
        // history.push(`/campuses/`);
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

    default:
      return state;
  }

}

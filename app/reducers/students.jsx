import axios from 'axios';

// ACTION TYPES
const ADD_ONE_STUDENT = 'ADD_ONE_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const REMOVE_STUDENT = 'REMOVE_STUDENT';

// ACTION CREATORS
export function removeStudent (studentId) {
  const action = { type: REMOVE_STUDENT, studentId };
  return action;
}

export function addStudent (student) {
  const action = { type: ADD_ONE_STUDENT, student };
  return action;
}

export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

// THUNK CREATORS
export function fetchStudentsOfCampus (campusid) {
  return function thunk (dispatch) {
    return axios.get('/api/campuses/'+ campusid)
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  };
}

export function fetchStudents () {
  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents({campus: {name: 'All Students'}, students});
        dispatch(action);
      });
  };
}

export function postNewStudent (student, history) {

  return function thunk (dispatch) {
      console.log('newStudent', student)
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        // dispatch(addStudent(newStudent));
        history.push(`/campuses/${newStudent.student.campusId}`);
      });
  };
}
export function putStudent (student, history) {

  return function thunk (dispatch) {
      console.log('newStudent', student)
    return axios.put('/api/students/' + student.id, student)
      .then(res => res.data)
      .then(newStudent => {
        // dispatch(addStudent(newStudent));
        history.push(`/campuses/${newStudent.student.campusId}`);
      });
  };
}


export function deleteStudent (campusId) {

  return function thunk (dispatch) {
    return axios.delete('/api/students/' + campusId )
      .then(res => res.data)
      .then(() => {
        dispatch(removeStudent(campusId));
      });
  };
}

// REDUCER
export default function reducer (state = {
  campus: {name: ''},
  students: []
}, action) {

  switch (action.type) {

    case GET_STUDENTS:
      return action.students;

    case ADD_ONE_STUDENT:
      return Object.assign({}, state, {students: [...state.students, action.student]});

    case REMOVE_STUDENT:
      return Object.assign({}, state, {students: [...state.students].filter(student => student.id != action.studentId)});

    default:
      return state;
  }

}

import { combineReducers } from 'redux'
import campuses from './campuses'
import students from './students'
import selectedStudent from './selectedStudent'

const rootReducer = combineReducers({
  campuses,
  students,
  selectedStudent
})

export default rootReducer

export * from './campuses'
export * from './students'
export * from './selectedStudent'

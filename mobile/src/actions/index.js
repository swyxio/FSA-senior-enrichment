// import { Actions } from 'react-native-router-flux'

export const selectLibrary = (libraryId) => {
  return {
    type: 'select_library',
    payload: libraryId
  };
};

// export const HomeScreenMove = () => {
//   Actions.
// }
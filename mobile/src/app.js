import React from 'react';
import { View } from 'react-native';
import { Provider,  } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Header } from './components/common';
import LibraryList from './components/LibraryList';
import ReduxThunk from 'redux-thunk';
import Router from './components/Router';

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
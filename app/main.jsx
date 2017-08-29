'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Campuses from './containers/Campuses';
import Students from './containers/Students';
import AddNewCampus from './containers/AddNewCampus';
import AddEditStudent from './containers/AddEditStudent';
import SingleCampus from './containers/SingleCampus';
import SingleStudent from './containers/SingleStudent';
import { BrowserRouter as Router , Route, Switch, Redirect } from 'react-router-dom';

import store from './store'

render (
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/campuses/new" component={AddNewCampus} />
            <Route exact path="/campuses" component={Campuses} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Route path="/students/:studentId" component={SingleStudent} />
            <Route exact path="/students/new" component={AddEditStudent} />
            <Route path="/students" component={Students} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('react-main')
)


            // <Route path="/channels/:channelId" component={MessagesList} />
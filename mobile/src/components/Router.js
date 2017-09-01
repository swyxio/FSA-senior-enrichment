import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import HomeScene from './components/HomeScene';
import Campuses from './containers/Campuses';
import Students from './containers/Students';
import AddNewStudent from './containers/AddNewStudent';
import AddNewCampus from './containers/AddNewCampus';
import EditCampus from './containers/EditCampus';
import EditStudent from './containers/EditStudent';
import SingleCampus from './containers/SingleCampus';
import SingleStudent from './containers/SingleStudent';
          
const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar>
        <Scene key="main">
          <Scene
            key="home"
            component={HomeScene}
            title="Home"
          />
          <Scene key="campuses" component={Campuses} title="Campus List" 
              onRight={() => Actions.addNewCampus()}
              rightTitle="Add"
          >
          </Scene>
          <Scene key="addNewCampus" component={AddNewCampus} title="Add Campus"/>
          <Scene key="addNewStudent" component={AddNewStudent} title="Add Student"/>
          <Scene key="editCampus" component={EditCampus} title="Edit Campus"/>
          <Scene key="editStudent" component={EditStudent} title="Edit Student"/>
          <Scene key="campusDetail" component={SingleCampus} title="CampusDetail"
              onRight={() => Actions.addNewStudent()}
              rightTitle="Add"
          />
          <Scene key="studentDetail" component={SingleStudent} title="StudentDetail"/>
          <Scene key="students" component={Students} title="All Students" 
              onRight={() => Actions.addNewStudent()}
              rightTitle="Add"
          />
        </Scene>
      </Stack>
    </Router>
  );
};

export default RouterComponent;
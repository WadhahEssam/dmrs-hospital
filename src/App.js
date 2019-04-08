import React, { Component } from 'react';
// import web3 from './web3';
// import { ToastContainer } from 'react-toastify';
// import contract from './medicalRecordsSystemContract';
// import { contractAddress } from './medicalRecordsSystemContract';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
// import logo from './img/logo.png';
import { BrowserRouter , Route , Switch, Redirect } from 'react-router-dom' ;
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import CreateMedicalRecord from './components/pages/CreateMedicalRecord';
import LabTestForm from './components/pages/LabTestForm';
import MedicalRecord from './components/pages/MedicalRecord'
import RadioScanForm from './components/pages/RadioScanForm'
import Surgeries from './components/pages/Surgeries'
import AddSurgery from './components/pages/AddSurgery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RadioScans from './components/pages/RadioScans';
import LabTests from './components/pages/LabTests';
import AddLabTest from './components/pages/AddLabTest';
import DrugPrescriptions from './components/pages/DrugPrescriptions';
import AddDrugPrescription from './components/pages/AddDrugPrescription';

class App extends Component {

  // Check if the user is logged in, return true, otherwise return false.
  loggedIn() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log("User is logged in.")
      return true
    } else {
      console.log("User is not logged in.")
      return false
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <ToastContainer />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/createMedicalRecord" component={CreateMedicalRecord} />
              <Route exact path="/" render={() => (
                this.loggedIn() ? (
                  console.log("Redirecting to Home."),
                  <Redirect to="/home"/>
                ) : (
                  console.log("rendering Login."),
                  <Login />
                )
              )}/>
              <Route path="/labTest" component={LabTestForm} />
              <Route path="/:id/medicalRecord" component={MedicalRecord} />
              <Route path="/radioScan" component={RadioScanForm} />
              <Route path="/:id/surgeries" component={Surgeries} />
              <Route path="/:id/addSurgery" component={AddSurgery} />
              <Route path="/:id/radioScans" component={RadioScans} />
              <Route path="/:id/labTests" component={LabTests} />
              <Route path="/:id/addLabTest" component={AddLabTest} />
              <Route path="/:id/medicalPrescriptions" component={DrugPrescriptions} />
              <Route path="/:id/addMedicalPrescription" component={AddDrugPrescription} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

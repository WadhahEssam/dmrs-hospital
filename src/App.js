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
import Diagnoses from './components/pages/Diagnoses'
import AddDiagnosis from './components/pages/AddDiagnosis'
import 'react-toastify/dist/ReactToastify.css';

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
              <Route exact path="/:id/medicalRecord" component={MedicalRecord} />
              <Route exact path="/:id/medicalRecord/diagnoses" component={Diagnoses} />
              <Route path="/:id/medicalRecord/diagnoses/new" component={AddDiagnosis}/>
              <Route path="/radioScan" component={RadioScanForm} />
              <Route path="/surgeries" component={Surgeries} />
              <Route path="/addSurgery" component={AddSurgery} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

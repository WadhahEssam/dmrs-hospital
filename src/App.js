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
import Surgeries from './components/pages/Surgeries'
import AddSurgery from './components/pages/AddSurgery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LabTests from './components/pages/LabTests';
import AddLabTest from './components/pages/AddLabTest';
import DrugPrescriptions from './components/pages/DrugPrescriptions';
import AddDrugPrescription from './components/pages/AddDrugPrescription';
import Diagnosis from './components/pages/Diagnosis';
import AddDiagnosis from './components/pages/AddDiagnosis';
import BloodDonations from './components/pages/BloodDonations';
import AddBloodDonation from './components/pages/AddBloodDonation';
import RadiologyScans from './components/pages/RadiologyScans';
import addRadiologyScan from './components/pages/addRadiologyScan';

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
              <Route path="/:id/surgeries" component={Surgeries} />
              <Route path="/:id/addSurgery" component={AddSurgery} />
              <Route path="/:id/labTests" component={LabTests} />
              <Route path="/:id/addLabTest" component={AddLabTest} />
              <Route path="/:id/medicalPrescriptions" component={DrugPrescriptions} />
              <Route path="/:id/addMedicalPrescription" component={AddDrugPrescription} />
              <Route path="/:id/diagnosis" component={Diagnosis} />
              <Route path="/:id/addDiagnosis" component={AddDiagnosis} />
              <Route path="/:id/bloodDonations" component={BloodDonations} />
              <Route path="/:id/addBloodDonation" component={AddBloodDonation} />              <Route path="/:id/bloodDonations" component={BloodDonations} />
              <Route path="/:id/radiologyScans" component={RadiologyScans} />              <Route path="/:id/bloodDonations" component={BloodDonations} />
              <Route path="/:id/addRadiologyScan" component={addRadiologyScan} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

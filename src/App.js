import React, { Component } from 'react';
import web3 from './web3';
import { ToastContainer } from 'react-toastify';
import contract from './medicalRecordsSystemContract';
import { contractAddress } from './medicalRecordsSystemContract';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
// import logo from './img/logo.png';
import { BrowserRouter , Route , Switch } from 'react-router-dom' ;
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import CreateMedicalRecord from './components/pages/CreateMedicalRecord';
import LabTestForm from './components/pages/LabTestForm';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route  path="/home" component={Home} />
              <Route path="/createMedicalRecord" component={CreateMedicalRecord} />
              <Route path="/" component={Login} />
              <Route path="/labTest" component={LabTestForm} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Menu, Input, Container, Segment } from 'semantic-ui-react'
import web3 from './web3';
import { ToastContainer } from 'react-toastify';
import contract from './medicalRecordsSystemContract';
import { contractAddress } from './medicalRecordsSystemContract';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
// import logo from './img/logo.png';

class App extends Component {

  render() {
    return (
      <div>
          <Menu attached="top" stackable pointing >
            <Menu.Item >
              Hospital
            </Menu.Item>
          </Menu>

          <Segment>
            This is a hospital
          </Segment>
      </div>
    );
  }
}

export default App;

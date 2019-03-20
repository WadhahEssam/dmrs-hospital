import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Form, Message, Label, Button, Radio } from 'semantic-ui-react'

export default class Home extends Component {
  state = {
    name: '',
    nationalID: '',
    phoneNumber: '',
    gender: '',
    birthDate: '',
    isOpen: false,
    bloodType: '',
    emergencyContact: '',
    isError: false,
    errorMessage: '',
  }

  render() {
    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
          <div>those are the surgeruies</div>
        </AuthBoilerplate>
      </div>
    )
  }

}

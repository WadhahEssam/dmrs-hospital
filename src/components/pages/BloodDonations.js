import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Card, Table, Form, Message, Label, Button, Radio, Image, Icon } from 'semantic-ui-react'
import { cloneDeep } from 'lodash';
import contract from '../../medicalRecordsSystemContract';
import web3 from '../../web3';
import medicalRecordABI from '../../medicalRecord';
import { toast } from 'react-toastify';

export default class BloodDonations extends Component {
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
    noTransactions: null,
    transactions: [],
    erroneousTransactions: [], // this represent the ids' of the transactions that has been corrected [{id: 1, corretedBy: 5}, {id: 2, corretedBy: 6}]
  }

  render() {
    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
          <Container padded="true" style={{ padding: "20px" }}>
            <Segment>
              <h3 style={{display: 'inline'}}>List of Blood Donations</h3> 
              <div style={{position: 'absolute', right: '20px', display: 'inline'}}>
                <Button 
                  icon
                  labelPosition="left"
                  color="grey" 
                  onClick={() => {this.props.history.replace(`medicalRecord`)}}
                >
                  <Icon name="arrow left"/>
                  Go Back
                </Button>
                <Button 
                  icon
                  labelPosition="left"
                  color="green" 
                  onClick={() => {this.props.history.push(`addBloodDonation`)}}
                >
                  <Icon name="plus"/>
                  Add new blood donation
                </Button>
              </div>

            </Segment>
              {
                (this.state.noTransactions == true) ? 
                <Segment><Message warning>There are no blood donations for this patient at the moment</Message></Segment> :
                <div />
              }
            <br/>
            <Card.Group>
              {/* {transactionsCards} */}
            </Card.Group>
          </Container>
        </AuthBoilerplate>
      </div>
    )
  }
}

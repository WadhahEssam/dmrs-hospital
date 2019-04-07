import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Card, Table, Form, Message, Label, Button, Radio, Image, Icon } from 'semantic-ui-react'
import { cloneDeep } from 'lodash';
import contract from '../../medicalRecordsSystemContract';
import web3 from '../../web3';
import medicalRecordABI from '../../medicalRecord';
import { toast } from 'react-toastify';

export default class LabTests extends Component {
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

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions = async () => {
    const accounts = await web3.eth.getAccounts();
    const medicalRecordID = this.props.match.params.id;
    const medicalRecordAddress = await contract.methods.getMedicalRecord(medicalRecordID).call()
    let medicalRecordContract = await new web3.eth.Contract(
        medicalRecordABI, 
        medicalRecordAddress
      ); 
    
    let transactionsList = [];
      // mark for reusability 
    let transactionsCount = await medicalRecordContract.methods.laboratoryTestsCount().call();
    if (transactionsCount == 0) {
      this.setState({noTransactions: true});
    }
    for (let i = 0; i < transactionsCount; i++) {
      // mark for reusability 
      let newTransaction = await medicalRecordContract.methods.laboratoryTests(i).call();
      transactionsList.push(newTransaction);
    }
    this.setState({transactions: transactionsList});
    this.filterCorrectedTransactions();
  }

  // checkes if the transaction is correted or not
  filterCorrectedTransactions = () => {
    let erroneousTransactions = [];
    let transactions = this.state.transactions;
    for(let i = 0; i < transactions.length; i++) {
      if (transactions[i].isCorrectionFor !== '' && transactions[i].isCorrectionFor !== 'true') {
        erroneousTransactions.push({id: transactions[i].isCorrectionFor, correctedBy: transactions[i].id});
      }
    }
    this.setState({erroneousTransactions});
  }

  // check by id if specific transaction is corrected
  isCorrected = (id) => {
    let erroneousTransactions = this.state.erroneousTransactions;
    for (let i = 0; i < erroneousTransactions.length; i++) {
      if (erroneousTransactions[i].id == id) {
        return {result: true, correctedBy: erroneousTransactions[i].correctedBy};
      }
    }
    return {result: false};
  }

  isNotOld = (time) => {
    let now = new Date();
    const minutes = 30;
    if (parseInt(time) + (60 * minutes) >= parseInt((now.getTime() + '').substring(0,10))) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
          <Container padded="true" style={{ padding: "20px" }}>
            <Segment>
              <h3 style={{display: 'inline'}}>List of Lab Tests</h3> 
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
                  onClick={() => {this.props.history.push(`addLabTest`)}}
                >
                  <Icon name="plus"/>
                  Add new lab test
                </Button>
              </div>

            </Segment>
              {
                (this.state.noTransactions == true) ? 
                <Segment><Message warning>There are no laboratory tests for this patient at the moment</Message></Segment> :
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

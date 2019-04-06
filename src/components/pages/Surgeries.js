import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Card, Table, Form, Message, Label, Button, Radio, Image, Icon } from 'semantic-ui-react'
import { cloneDeep } from 'lodash';
import contract from '../../medicalRecordsSystemContract';
import web3 from '../../web3';
import medicalRecordABI from '../../medicalRecord';
import { toast } from 'react-toastify';


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
    let transactionsCount = await medicalRecordContract.methods.surgeriesCount().call();
    if (transactionsCount == 0) {
      this.setState({noTransactions: true});
    }
    for (let i = 0; i < transactionsCount; i++) {
        // mark for reusability 
      let newTransaction = await medicalRecordContract.methods.surgeries(i).call();
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

  render() {
    const { transactions } = this.state;

    let transactionsCards = transactions.slice(0).reverse().map((transaction, index) => {
      let colorOfCard = 'grey';
      if (transaction.isCorrectionFor == 'true' || this.isCorrected(transaction.id).result) {
        colorOfCard = 'red';
      } 
      
      let label = null;
      if (this.isCorrected(transaction.id).result) {
        label = <Label color='red' ribbon>Medical Error : has been corrected by surgery with ID ( {this.isCorrected(transaction.id).correctedBy} )</Label> 
      } else if (transaction.isCorrectionFor == 'true') {
        label = <Label color='red' ribbon>Medical Error</Label> 
      } else if (transaction.isCorrectionFor !== '') {
        label = <Label color='blue' ribbon>Is Correction For Surgery With ID ( {transaction.isCorrectionFor} ) </Label> 
      }

      return (
        <Card key={index+1} fluid color={colorOfCard} style={{marginTop: "30px", marginBottom: "30px"}}>
          <Container style={{padding: '10px'}}>
            {label}
            <Table celled>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width="3" active>Surgery Name</Table.Cell>
                        <Table.Cell width="4">{transaction.surgeryName}</Table.Cell>
                        <Table.Cell width="3" active>Surgery Date</Table.Cell>
                        <Table.Cell width="4">{this.formatDate(transaction.date)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell active>Doctor</Table.Cell>
                        <Table.Cell>{transaction.mainDoctor}</Table.Cell>
                        <Table.Cell active>Hospital</Table.Cell>
                        <Table.Cell>{transaction.hospitalName}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell active>Duration</Table.Cell>
                        <Table.Cell>{transaction.duration}</Table.Cell>
                        <Table.Cell active>Transaciton ID</Table.Cell>
                        <Table.Cell>{transaction.id}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
          </Container>
          <Card.Description>
            <Container textAlign="center">
              <Label size="big" basic pointing='below'>
                Extra Information 
              </Label>
              <h6 style={{paddingLeft: '30px', paddingRight: '30px'}}>
                {transaction.surgeryInformation}
              </h6>
            </Container>
            {/* <hr/>
            <Container textAlign="center" style={{paddingBottom: '10px'}}>
              <Label size="big" basic pointing='right'>
                File
              </Label>
              <Button style={{marginLeft: '10px', marginTop: '10px'}} color="green" size="big"><Icon name="file"/> Download</Button>
            </Container> */}
            <hr/>
          </Card.Description>
          <Card.Meta>
            <Container style={{marginBottom: '10px'}} textAlign="center">
              <Button 
                inverted 
                disabled={(transaction.isCorrectionFor == 'true' || this.isCorrected(transaction.id).result)}
                color="red"
                onClick={() => {this.markAsMedicalError(transaction.id)}}>
                Mark As Medical Error
              </Button>
            </Container>
          </Card.Meta>
        </Card>
      );
    })

    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
          <Container padded="true" style={{ padding: "20px" }}>
            <Segment>
              <h3 style={{display: 'inline'}}>List of Surgeries</h3> 
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
                  onClick={() => {this.props.history.push(`addSurgery`)}}
                >
                  <Icon name="plus"/>
                  Add new surgey
                </Button>
              </div>

            </Segment>
              {
                (this.state.noTransactions == true) ? 
                <Segment><Message warning>There are no surgeries for this patient at the moment</Message></Segment> :
                <div />
              }
            <br/>
            <Card.Group>
              {transactionsCards}
            </Card.Group>
          </Container>
        </AuthBoilerplate>
      </div>
    )
  }

  markAsMedicalError = async (id) => {
    const accounts = await web3.eth.getAccounts();
    const medicalRecordID = this.props.match.params.id;
    const medicalRecordAddress = await contract.methods.getMedicalRecord(medicalRecordID).call()
    let medicalRecordContract = await new web3.eth.Contract(
        medicalRecordABI, 
        medicalRecordAddress
      ); 

    // mark for reusability 
    await medicalRecordContract.methods.markTransactionAsMedicalError(1, id).send({ from: accounts[0], gas: '200000000' })
    .then(() => {
      let cloned = cloneDeep(this.state.transactions);
      for(let i = 0; i < cloned.length; i++){
        if (cloned[i].id == id) {
          cloned[i].isCorrectionFor = 'true';
        }
      }
      this.setState({transactions: cloned});
      // mark for reusability 
      toast.success("Surgery has been set as a medical error.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        width: 200,
      });
    })
    .catch(() => {
      toast.error("Error : Something worng happened", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        width: 200,
      });
    })
  }

  formatDate = (_date) => {
    let date = new Date(_date*1000);
    let hours = date.getHours();
    let minutes = ("0"+date.getMinutes()).substr(-2);
    let seconds = ("0"+date.getSeconds()).substr(-2);
    let day = date.getDate();
    let month = date.getUTCMonth();
    let year = date.getUTCFullYear();
    return hours+':'+minutes+':'+seconds+"  "+day+"/"+month+"/"+year;
  }

}

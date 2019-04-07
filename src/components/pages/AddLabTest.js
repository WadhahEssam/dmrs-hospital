import React, { Component } from 'react'
import { Icon, Label, Segment, Button, Container, Form, Message, Dropdown } from 'semantic-ui-react'
import AuthBoilerplate from '../AuthBoilerplate'
import contract from '../../medicalRecordsSystemContract';
import web3 from '../../web3';
import medicalRecordABI from '../../medicalRecord';
import { toast } from 'react-toastify';
import axios from 'axios';

export default class AddLabTest extends Component {
  state = {
    testType: '',
    workerName: '',
    fileHash: '',
    extraInformation: '',
    isCorrection: false,
    correctionFor: '',
    isError: false,
    isLoading: false,
    errorMessage: '',
    transactions: [],
    erroneousTransactions: [],
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


  render() {
    // filtering the transactions to eleminate the erroneous ones
    let transactions = [];
    let allTransactions = this.state.transactions;
    for (let i = 0; i < allTransactions.length; i++) {
      // adding transactions that are not marked as medical errors and not correted
      if (allTransactions[i].isCorrectionFor == '' && this.isCorrected(allTransactions[i].id).result == false) {
        transactions.push({
          key: i,
          text: `ID: ${allTransactions[i].id} , Name: ${allTransactions[i].surgeryName}`,
          value: allTransactions[i].id
        })
      }
    }

    return (
      <AuthBoilerplate history={this.props.history}>
        <Container padded="true" style={{ padding: '20px' }} fluid>
          <Segment>
            <h3 style={{display: 'inline'}}>Add New Lab Test</h3> 
              <Button 
                icon
                labelPosition="left"
                color="grey" 
                style={{position: 'absolute', right: '20px'}}
                onClick={() => {this.props.history.replace(`surgeries`)}}
              >
                <Icon name="arrow left"/>
                Go Back
              </Button>
            <Message warning>Be sure of the information you put, because you will not be able to modify it later.</Message>
            {
              (this.state.isError) ? <Message error>{this.state.errorMessage}</Message> : <div/>
            }
          </Segment>
          <Segment fluid='true'>
            <Form loading={this.state.isLoading} fluid='true'>
            <Form.Group widths='equal'>
                <Form.Field>
                  <Form.Input 
                    onChange={(e, {value}) => {this.setState({testType: value})}}
                    fluid 
                    label="Test Type" 
                    placeholder="eg. Complete Blood Count" 
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <Form.Input 
                    onChange={(e, {value}) => {this.setState({workerName: value})}}
                    fluid 
                    label="Lab Worder Name" 
                    placeholder="eg. Mohammed" 
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <h6>Lab Test Image</h6>
                  <Label width="4" as="label" htmlFor="file" size="big">
                  <Icon name="file" />
                  Click here to attach an image
                  </Label>
                  <input name="file" id="file" hidden type="file" onChange={this.handleFile} />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <Form.TextArea 
                  onChange={(e, {value}) => {this.setState({extraInformation: value})}}
                  label='Extra Inforamtion ( Optional )' 
                />
              </Form.Field>
              <Form.Field>
                <Form.Checkbox 
                  onChange={(e, {checked}) => {this.setState({isCorrection: checked})}} 
                  label="Is correction for another transation ?"
                />
              </Form.Field>
              {
                (this.state.isCorrection) ? 
                (
                  <Dropdown
                    placeholder='Select the erroneous transaction'
                    fluid
                    selection
                    options={transactions}
                    style={{marginBottom: '15px'}}
                    onChange={(e, data) => {console.log(this.state); this.setState({correctionFor: data.value})}}
                  />
                ) : 
                <div/>
              }
              <Button primary onClick={this.addNewTransaction}>Add Surgery</Button>
            </Form>
          </Segment>
        </Container>
      </AuthBoilerplate>
      );
  }

  handleFile = (e) => {
    let file = e.target.files[0]
    let formdata = new FormData()
    formdata.append('file', file);
    formdata.append('name', 'file')

    this.setState({isLoading: true})
    axios({
      url: 'https://image-hasher-wadahesam.c9users.io/upload',
      method: 'POST',
      data: formdata
    })
    .then((response) => {
      this.setState({fileHash: response.data.hash})
      this.setState({isLoading: false})
    })
    .catch(() => {
      this.setState({isError: true, errorMessage: 'Something wrong happened while uploading the image', isLoading: false})
    })
  }

  addNewTransaction = async () => {
    const newTransaction = this.state;
    if (newTransaction.testType == '') {
      this.setState({isError: true, errorMessage: 'please insert the test type '});
    } else if (newTransaction.fileHash == '') {
      this.setState({isError: true, errorMessage: 'please choose a file for the lab test'});
    } else {
      this.setState({isError: false});
      const accounts = await web3.eth.getAccounts();
      const medicalRecordID = this.props.match.params.id;
      const medicalRecordAddress = await contract.methods.getMedicalRecord(medicalRecordID).call()
      let medicalRecordContract = await new web3.eth.Contract(
          medicalRecordABI, 
          medicalRecordAddress
        ); 
      let isCorrectionFor = '';
      if (newTransaction.isCorrection == true) {
        isCorrectionFor = newTransaction.correctionFor;
      } 

      await medicalRecordContract.methods.addLaboratoryTest('King Khaled Hospital', newTransaction.workerName, newTransaction.testType, newTransaction.extraInformation, newTransaction.fileHash, isCorrectionFor)
      .send({ from: accounts[0], gas: '200000000' })
      .then(() => {
        toast.success("New surgery added successfully", {
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
      

      this.props.history.replace(`labTests`);
    }
  }


}
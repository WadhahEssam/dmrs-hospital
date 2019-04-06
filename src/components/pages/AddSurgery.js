import React, { Component } from 'react'
import { Icon, Label, Segment, Button, Container, Form, Message, Dropdown } from 'semantic-ui-react'
import AuthBoilerplate from '../AuthBoilerplate'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import contract from '../../medicalRecordsSystemContract';
import web3 from '../../web3';
import medicalRecordABI from '../../medicalRecord';
import { toast } from 'react-toastify';

export default class AddSurgery extends Component {
  state = {
    surgeryName: '',
    date: '',
    doctor: '',
    duration: '',
    extraInformation: '',
    isCorrection: false,
    correctionFor: '',
    isError: false,
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
            <h3 style={{display: 'inline'}}>Add New Surgery</h3> 
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
            <Form fluid='true'>
              <Form.Group widths='equal'>
                <Form.Field>
                  <Form.Input 
                    onChange={(e, {value}) => {this.setState({surgeryName: value})}}
                    fluid 
                    label="Surgery Name" 
                    placeholder="eg. Artery Bypass" 
                  />
                </Form.Field>
                <Form.Field>
                  <label>Date</label>
                  <DayPickerInput style={{ width: '100%' }} onDayChange={this.handleDayChange} />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <Form.Input
                    onChange={(e, {value}) => {this.setState({doctor: value})}} 
                    fluid 
                    label="Doctor" 
                    placeholder="eg. Dr Khaled Ahmed" 
                  />
                </Form.Field>
                <Form.Field>
                  <label>Duration ( in Minutes )</label>
                  <Form.Input 
                    onChange={(e, {value}) => {this.setState({duration: value})}}
                    fluid 
                    placeholder="eg. 60" 
                    type="number" 
                  />
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
                  label="Is correction for another transation ?"/
                >
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
    )
  }

  handleDayChange = (day) => {
    this.setState({ date: day });
  }

  addNewTransaction = async () => {
    const newTransaction = this.state;
    if (newTransaction.date == '') {
      this.setState({isError: true, errorMessage: 'please select a date for the surgey'});
    } else if (newTransaction.doctor == '') {
      this.setState({isError: true, errorMessage: 'please insert the doctor name'});
    } else if (newTransaction.duration == '') {
      this.setState({isError: true, errorMessage: 'please insert the duration of the surgery'});
    } else if (newTransaction.surgeryName == '') {
      this.setState({isError: true, errorMessage: 'please insert the name of the surgery'});
    } else if (newTransaction.isCorrection == true && newTransaction.correctionFor == '') {
      this.setState({isError: true, errorMessage: 'please select the erroneous transaction'});
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
      await medicalRecordContract.methods.addSurgery('King Khaled Hospital', newTransaction.surgeryName, newTransaction.doctor, newTransaction.duration, 'emptyFileHash', newTransaction.extraInformation, isCorrectionFor)
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

      this.props.history.replace(`surgeries`);

    }    
  }
}

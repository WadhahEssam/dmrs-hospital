import React, { Component } from 'react'
import { Icon, Label, Segment, Button, Container, Form, Message, Dropdown } from 'semantic-ui-react'
import AuthBoilerplate from '../AuthBoilerplate'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import contract from '../../medicalRecordsSystemContract';
import web3 from '../../web3';
import medicalRecordABI from '../../medicalRecord';
import { toast } from 'react-toastify';

export default class AddBloodDonation extends Component {
  state = {
    donationType: '',
    amount: '',
    doctor: '',
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
    let transactionsCount = await medicalRecordContract.methods.bloodDonationsCount().call();
    if (transactionsCount == 0) {
      this.setState({noTransactions: true});
    }
    for (let i = 0; i < transactionsCount; i++) {
        // mark for reusability 
      let newTransaction = await medicalRecordContract.methods.bloodDonations(i).call();
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
    let transactions = [];
    let allTransactions = this.state.transactions;
    for (let i = 0; i < allTransactions.length; i++) {
      // adding transactions that are not marked as medical errors and not correted
      if (allTransactions[i].isCorrectionFor == '' && this.isCorrected(allTransactions[i].id).result == false && this.isNotOld(allTransactions[i].date) == false) {
        transactions.push({
          key: i,
          text: `ID: ${allTransactions[i].id} , Type: ${allTransactions[i].donationType}`,
          value: allTransactions[i].id
        })
      }
    }

    return (
      <AuthBoilerplate history={this.props.history}>
        <Container padded="true" style={{ padding: '20px' }} fluid>
          <Segment>
            <h3 style={{display: 'inline'}}>Add New Blood Donation</h3> 
              <Button 
                icon
                labelPosition="left"
                color="grey" 
                style={{position: 'absolute', right: '20px'}}
                onClick={() => {this.props.history.replace(`bloodDonations`)}}
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
                    onChange={(e, {value}) => {this.setState({doctor: value})}}
                    fluid 
                    label="Doctor/Nurse Name" 
                    placeholder="eg. Mohammed" 
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  width={8}
                >
                  <Form.Input
                    onChange={(e, {value}) => {this.setState({donationType: value})}} 
                    fluid 
                    label="Donation Type" 
                    placeholder="eg. Red Cells" 
                  />
                </Form.Field>
                <Form.Field
                  width={2}
                >
                  <label>Amount ( in Liters )</label>
                  <Form.Input 
                    onChange={(e, {value}) => {this.setState({amount: value})}}
                    fluid 
                    number
                    placeholder="eg. 1.2" 
                    type="number" 
                  />
                </Form.Field>
              </Form.Group>
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
              <Button primary onClick={this.addNewTransaction}>Add Blood Donation</Button>
            </Form>
          </Segment>
        </Container>
      </AuthBoilerplate>
    )
  }

  addNewTransaction = async () => {
    const newTransaction = this.state;
    if (newTransaction.doctor == '') {
      this.setState({isError: true, errorMessage: 'please insert the doctor name'});
    } else if (newTransaction.amount == '') {
      this.setState({isError: true, errorMessage: 'please insert the amount of the blood transfered'});
    } else if (newTransaction.donationType == '') {
      this.setState({isError: true, errorMessage: 'please insert the type of the donation'});
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
      await medicalRecordContract.methods.addBloodDonation('King Khaled Hospital', newTransaction.doctor, newTransaction.donationType, parseFloat(newTransaction.amount) * 1000, 'emptyFileHash', isCorrectionFor)
      .send({ from: accounts[0], gas: '200000000' })
      .then(() => {
        toast.success("New blood donation added successfully", {
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

      this.props.history.replace(`bloodDonations`);
    }    
  }
}

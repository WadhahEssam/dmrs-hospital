import React, { Component } from 'react'
import { Icon, Label, Segment, Button, Container, Form, Message, Dropdown } from 'semantic-ui-react'
import AuthBoilerplate from '../AuthBoilerplate'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import contract from '../../medicalRecordsSystemContract';
import web3 from '../../web3';
import medicalRecordABI from '../../medicalRecord';
import { toast } from 'react-toastify';
import { cloneDeep } from 'lodash';

export default class AddDrugPrescription extends Component {
  state = {
    doctor: '',
    isCorrection: false,
    correctionFor: '',
    isError: false,
    errorMessage: '',
    transactions: [],
    erroneousTransactions: [],
    drugPrescriptionsInput: [{ drugName: '', quantity: '', doctorComment: '', isDispensed: false }]
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
    let transactionsCount = await medicalRecordContract.methods.drugPrescribtionsCount().call();
    if (transactionsCount == 0) {
      this.setState({noTransactions: true});
    }
    for (let i = 0; i < transactionsCount; i++) {
        // mark for reusability 
      let newTransaction = await medicalRecordContract.methods.drugPrescribtions(i).call();
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
    // filtering the transactions to eleminate the erroneous ones
    let transactions = [];
    let allTransactions = this.state.transactions;
    for (let i = 0; i < allTransactions.length; i++) {
      // adding transactions that are not marked as medical errors and not correted
      if (allTransactions[i].isCorrectionFor == '' && this.isCorrected(allTransactions[i].id).result == false && this.isNotOld(allTransactions[i].date) == false) {
        transactions.push({
          key: i,
          text: `ID: ${allTransactions[i].id}`,
          value: allTransactions[i].id
        })
      }
    }

    const drugPrescriptionFields = this.state.drugPrescriptionsInput.map((drugPrescription, index) => {
      return (
        <Form.Group widths='equal' key={index}>
            <Form.Input
              onChange={(e)=>{this.onDrugNameChange(e,index)}}
              width={6}
              label={`${index+1}) Drug Name`}
              placeholder="eg. Amoxicillin" 
            />
            <Form.Input
              onChange={(e)=>{this.onDrugQuantityChange(e,index)}}
              width={2}
              label="Quantity" 
              type="Number"
              placeholder="eg. 10" 
            />
            <Form.Input
              onChange={(e)=>{this.onDrugCommentChange(e,index)}}
              width={8}
              label="Doctor Comment (Optional)" 
              placeholder="(Optional)" 
            />
        </Form.Group>
      )
    })
    return (
      <AuthBoilerplate history={this.props.history}>
        <Container padded="true" style={{ padding: '20px' }} fluid>
          <Segment>
            <h3 style={{display: 'inline'}}>Add New Drug Prescription</h3> 
              <Button 
                icon
                labelPosition="left"
                color="grey" 
                style={{position: 'absolute', right: '20px'}}
                onClick={() => {this.props.history.replace(`medicalPrescriptions`)}}
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
                    label="Doctor" 
                    placeholder="eg. Dr Khaled Ahmed" 
                  />
                </Form.Field>
              </Form.Group>
              <h6>Drug List</h6>
              <Segment>
                { drugPrescriptionFields }
                <Button color="green" onClick={this.addDrugPrescriptionField}>Add</Button>
                <Button color="red" onClick={this.removeDrugPrescriptionField}>Remove</Button>
              </Segment>
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
              <Button primary onClick={this.addNewTransaction}>Add Drug Prescription</Button>
            </Form>
          </Segment>
        </Container>
      </AuthBoilerplate>
    )
  }

  addDrugPrescriptionField = () => {
    let clonedPrescriptions = cloneDeep(this.state.drugPrescriptionsInput);
    clonedPrescriptions.push({ drugName: '', quantity: '', doctorComment: '', isDispensed: false });
    this.setState({drugPrescriptionsInput: clonedPrescriptions});
  }

  removeDrugPrescriptionField = () => {
    let clonedPrescriptions = cloneDeep(this.state.drugPrescriptionsInput);
    if (clonedPrescriptions.length == 1) {
      toast.error("At least one drug is required", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        width: 200,
      });
      return; // don't delete when its already one element
    }
    clonedPrescriptions.pop()
    this.setState({drugPrescriptionsInput: clonedPrescriptions});
  }

  onDrugNameChange = (e, index) => {
    let clonedPrescriptions = cloneDeep(this.state.drugPrescriptionsInput);
    clonedPrescriptions[index].drugName = e.target.value;
    this.setState({drugPrescriptionsInput: clonedPrescriptions});
  }

  onDrugQuantityChange = (e, index) => {
    let clonedPrescriptions = cloneDeep(this.state.drugPrescriptionsInput);
    clonedPrescriptions[index].quantity = e.target.value;
    this.setState({drugPrescriptionsInput: clonedPrescriptions});
  }

  onDrugCommentChange = (e, index) => {
    let clonedPrescriptions = cloneDeep(this.state.drugPrescriptionsInput);
    clonedPrescriptions[index].doctorComment = e.target.value;
    this.setState({drugPrescriptionsInput: clonedPrescriptions});
  }

  checkDrugsValidity = (drugs) => {
    for (let i = 0; i < drugs.length; i++) {
      if (drugs[i].drugName == '') {
        return `please insert name for drug number ${i+1}`
      } else if (drugs[i].quantity == '') {
        return `please insert the quantity for drug number ${i+1}`
      } 
    }
    return null;
  }

  addNewTransaction = async () => {
    const newTransaction = this.state;
    if (newTransaction.doctor == '') {
      this.setState({isError: true, errorMessage: 'please insert the doctor name'});
    } else if (newTransaction.isCorrection == true && newTransaction.correctionFor == '') {
      this.setState({isError: true, errorMessage: 'please select the erroneous transaction'});
    } else if (this.checkDrugsValidity(newTransaction.drugPrescriptionsInput) != null) {
      this.setState({isError: true, errorMessage: this.checkDrugsValidity(newTransaction.drugPrescriptionsInput)});
    } else {
      this.setState({isError: false});
      console.log(this.state.drugPrescriptionsInput);
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
      await medicalRecordContract.methods.addDrugPrescribtion('King Khaled Hospital', newTransaction.doctor, JSON.stringify(newTransaction.drugPrescriptionsInput), isCorrectionFor)
      .send({ from: accounts[0], gas: '200000000' })
      .then(() => {
        toast.success("New drug prescription added successfully", {
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

      this.props.history.replace(`medicalPrescriptions`);
    }    
  }
}

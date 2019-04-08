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

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    let transactions = [];

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
              label="Doctor Comment" 
              placeholder="" 
            />
        </Form.Group>
      )
    })
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

}

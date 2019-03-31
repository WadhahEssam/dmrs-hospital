import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Form, Message, Label, Button, Radio } from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import contract from '../../medicalRecordsSystemContract';
import { contractAddress } from '../../medicalRecordsSystemContract';
import web3 from '../../web3';

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
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]
    const { bloodType } = this.state
    const { birthDate } = this.state;

    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
            <Container style={{padding: '20px'}}>
              <Segment>
                <h3>Create Medical Record</h3>
                <Message warning>Be sure of the information you put, because you will not be able to modify it later.</Message>
                {
                  (this.state.isError) ? <Message error>{this.state.errorMessage}</Message> : <div/>
                }
                
              </Segment>
              <Segment>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Form.Group widths='equal'>
                    <Form.Input 
                      fluid 
                      label='Full name' 
                      placeholder='Eg. Mohammed Salem' 
                      onChange={(e, {value}) => this.setState({name: value})}
                    />
                    <Form.Input 
                      fluid 
                      type="number"
                      label='National ID' 
                      placeholder='Eg. 0245128399' 
                      onChange={(e, {value}) => this.setState({nationalID: value})}
                    />
                  </Form.Group>
                  <Form.Field>
                    <label>Date of Birth</label>
                    <DayPickerInput style={{width: '100%'}} onDayChange={this.handleDayChange} />
                  </Form.Field>
                  <Form.Group widths='equal'>
                    <Form.Input 
                      fluid 
                      type="number"
                      label='Phone Number' 
                      placeholder='Eg. 0551292881' 
                      onChange={(e, {value}) => this.setState({phoneNumber: value})}
                    />
                    <Form.Select 
                      fluid 
                      label='Gender' 
                      options={options} 
                      onChange={this.handleGenderChange} 
                      placeholder='Gender' 
                    />
                  </Form.Group>
                  <Form.Group inline style={{marginTop: '25px'}}>
                    <label style={{position: 'relative', bottom: '5px'}}>Quantity</label>
                    <Form.Field
                      control={Radio}
                      label='A+'
                      value='A+'
                      checked={bloodType === 'A+'}
                      onChange={this.handleBloodTypeChange}
                    />
                    <Form.Field
                      control={Radio}
                      label='A-'
                      value='A-'
                      checked={bloodType === 'A-'}
                      onChange={this.handleBloodTypeChange}
                    />
                    <Form.Field
                      control={Radio}
                      label='B+'
                      value='B+'
                      checked={bloodType === 'B+'}
                      onChange={this.handleBloodTypeChange}
                    />
                    <Form.Field
                      control={Radio}
                      label='B-'
                      value='B-'
                      checked={bloodType === 'B-'}
                      onChange={this.handleBloodTypeChange}
                    />
                    <Form.Field
                      control={Radio}
                      label='O+'
                      value='O+'
                      checked={bloodType === 'O+'}
                      onChange={this.handleBloodTypeChange}
                    />
                    <Form.Field
                      control={Radio}
                      label='O-'
                      value='O-'
                      checked={bloodType === 'O-'}
                      onChange={this.handleBloodTypeChange}
                    />
                    <Form.Field
                      control={Radio}
                      label='AB+'
                      value='AB+'
                      checked={bloodType === 'AB+'}
                      onChange={this.handleBloodTypeChange}
                    />
                    <Form.Field
                      control={Radio}
                      label='AB-'
                      value='AB-'
                      checked={bloodType === 'AB-'}
                      onChange={this.handleBloodTypeChange}
                    />
                  </Form.Group>
                  <Form.Input 
                    type="number"
                    fluid 
                    label='Emergency Contact' 
                    placeholder='Eg. 0551292881' 
                    onChange={(e, {value}) => this.setState({emergencyContact: value})}
                  />
                  <Button onClick={this.submitForm} color="green">Create Medical Record</Button>
                  <Button color="red">Cancel</Button>
                </Form>
                </Segment>
            </Container>
        </AuthBoilerplate>
      </div>
    )
  }

  submitForm = async () => {
    const patient = this.state;
    if (patient.gender == '') {
      this.setState({isError: true, errorMessage: 'Please select patient gender.'})
    } else if (patient.bloodType == '') {
      this.setState({isError: true, errorMessage: 'Please select patient blood type.'})
    } else if (patient.name == '') {
      this.setState({isError: true, errorMessage: 'Please enter patient full name.'})
    } else if (patient.birthDate == '') {
      this.setState({isError: true, errorMessage: 'Please enter patient birth date.'})
    } else if (patient.nationalID == '') {
      this.setState({isError: true, errorMessage: 'Please enter patient national id.'})
    } else if (patient.emergencyContact == '') {
      this.setState({isError: true, errorMessage: 'Please select patient emergency contact'})
    } 
    else {
      this.setState({isError: false,})
      console.log('every thing looks fine')
      console.log(this.state)

      const accounts = await web3.eth.getAccounts();

      await contract.methods.createMedicalRecord(435108270, 'Wadhah Essam', '9871634389', '0551292881', 'male', 'o+', '044239448').send({ from: accounts[0], gas: '20000000' })
      .then(() => {
        console.log('worked fine');
      })
      .catch((e) => {
        e.message();
      });
      let checkMedicalRecord = await contract.methods.checkMedicalRecord(435108270).call();
      console.log(checkMedicalRecord);
    }
  }

  handleBloodTypeChange = (e, bloodType) => this.setState({ bloodType: bloodType.value })

  handleGenderChange = (e, {value}) => {
    this.setState({gender: value})
  }

  handleDayChange = (day) => {
    this.setState({ birthDate: day });
  }
}

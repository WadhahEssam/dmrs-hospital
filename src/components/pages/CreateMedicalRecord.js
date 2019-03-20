import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Form, Message, Label, Button, Radio } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import dateformat from 'dateformat';

export default class Home extends Component {
  state = {
    name: '',
    nationalID: '',
    phoneNumber: '',
    gender: '',
    birthDate: 946688461,
    isOpen: false,
    bloodType: '',
  }

  componentDidUpdate() {
    console.log(this.state)
    console.log(Date.now())
  }

  render() {
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]
    
    const { bloodType } = this.state

    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
            <Container style={{padding: '20px'}}>
              <Segment>
                <h3>Create Medical Record</h3>
                <Message warning>Be sure of the information you put, because you will not be able to modify it later.</Message>
              </Segment>
              <Segment>
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='Full name' placeholder='Eg. Mohammed Salem' />
                    <Form.Input fluid label='National ID' placeholder='Eg. 0245128399' />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field fluid>
                      <label>Date of Birth</label>
                      <Button
                        style={{width: '100%'}}
                        className="example-custom-input"
                        onClick={this.toggleCalendar}>
                        {dateformat(this.state.startDate, "dd-MM-yyyy")}
                      </Button>
                        {
                          this.state.isOpen && (
                            <DatePicker
                              selected={this.state.birthDate}
                              onChange={this.handleBirthDateChange}
                              withPortal
                              inline />
                          )
                        }
                    </Form.Field>
                    <Form.Input fluid label='Phone Number' placeholder='Eg. 0551292881' />
                    <Form.Select fluid label='Gender' options={options} onChange={this.handleGenderChange} placeholder='Gender' />
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
                  <Form.Input fluid label='Emergency Contact' placeholder='Eg. 0551292881' />
                  <Button color="green">Create Medical Record</Button>
                  <Button color="red">Cancel</Button>
                </Form>
                </Segment>
            </Container>
        </AuthBoilerplate>
      </div>
    )
  }

  handleBloodTypeChange = (e, bloodType) => this.setState({ bloodType: bloodType.value })

  handleBirthDateChange = (date) => {
    this.setState({birthDate: date})
    this.toggleCalendar()
  }
  
  toggleCalendar = (e) => {
    e && e.preventDefault()
    this.setState({isOpen: !this.state.isOpen})
  }

  handleGenderChange = (e) => {
    
  }
}

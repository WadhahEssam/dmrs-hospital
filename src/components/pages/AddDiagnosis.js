import React, { Component } from 'react'
import { Icon, Label, Segment, Button, Container, Form, Message } from 'semantic-ui-react'
import AuthBoilerplate from '../AuthBoilerplate'
import DayPickerInput from 'react-day-picker/DayPickerInput';

export default class AddDiagnosis extends Component {
  state = {
    surgeryName: '',
    date: '',
    doctor: '',
    duration: '',
    extraInformation: '',
    isCorrection: false,
    correctionFor: '',
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <AuthBoilerplate history={this.props.history}>
        <Container padded="true" style={{ padding: '20px' }} fluid>
          <Segment>
            <h3>Add New Diagnosis</h3>
            <Message warning>Be sure of the information you put, because you will not be able to modify it later.</Message>
          </Segment>
          <Segment fluid='true'>
            <Form fluid='true'>
              <Form.Group widths='equal'>
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
              </Form.Group>
              <Form.Field>
                <Form.TextArea 
                  onChange={(e, {value}) => {this.setState({extraInformation: value})}}
                  label='Diagnosis Inforamtion ( Optional )' 
                />
              </Form.Field>
              <Form.Field>
                <Label width="4" as="label" htmlFor="file" size="big">
                  <Icon name="file" />
                  Click here to attach an image
                </Label>
                <input id="file" hidden type="file" />
              </Form.Field>
              <Form.Field>
                <Form.Checkbox onChange={(e, {checked}) => {this.setState({isCorrection: checked})}} label="Is correction for another transation ?"/>
              </Form.Field>
              {
                (this.state.isCorrection) ? 
                (
                  <Form.Input 
                    label="Is Correction For"
                    onChange={(e, {value}) => {this.setState({correctionFor: value})}}
                    fluid 
                    placeholder="eg. 0x0398eaf31ae2398111..."  
                  />
                ) : 
                <div/>
              }
              <Button primary>Add Diagnosis</Button>
            </Form>
          </Segment>
        </Container>
      </AuthBoilerplate>
    )
  }

  handleDayChange = (day) => {
    this.setState({ date: day });
  }

}

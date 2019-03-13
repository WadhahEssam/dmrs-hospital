import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { TextArea, Segment, Input, Divider, Button, Container, Card, Grid, Form, Message, Label } from 'semantic-ui-react'

class LabTestForm extends Component {
  
    render() {
      const options = [
        { key: 'Glucose Level', text: 'Glucose Level', value: 'Glucose Level' },
        { key: 'CMP', text: 'Comprehensive Metabolic Panel', value: 'CMP' },
        { key: 'hCG', text: 'Pregnancy Test', value: 'hCG' },
        { key: 'Urinalysis', text: 'Urinalysis', value: 'Urinalysis' }
      ]
  
      return (
        <div>
          <AuthBoilerplate history={this.props.history}>
              <Container padded style={{padding: '20px'}} fluid>
                <Segment>
                  <h3>Create Laboratory Test Report</h3>
                  <Message warning>Be sure of the information you put, because you will not be able to modify it later.</Message>
                </Segment>
                <Segment fluid>
                  <Form fluid>
                    <Form.Group widths='equal'>
                      <Form.Input fluid label='Worker Full Name' placeholder='Eg. Mohammed Salem' />
                      <Form.Select fluid label='Test Type' options={options} placeholder='Gender' />
                      <Form.TextArea placeholder='TestDescription' autoHeight />
                    </Form.Group>
                  </Form>
                  </Segment>
              </Container>
          </AuthBoilerplate>
        </div>
      )
    }
  }
  
  export default LabTestForm
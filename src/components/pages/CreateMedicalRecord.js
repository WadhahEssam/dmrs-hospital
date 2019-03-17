import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Form, Message } from 'semantic-ui-react'

export default class Home extends Component {
  
  render() {
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]

    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
            <Container padded style={{padding: '20px'}} fluid>
              <Segment>
                <h3>Create Medical Record</h3>
                <Message warning>Be sure of the information you put, because you will not be able to modify it later.</Message>
              </Segment>
              <Segment fluid>
                <Form fluid>
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='Full name' placeholder='Eg. Mohammed Salem' />
                    <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
                  </Form.Group>
                </Form>
                </Segment>
            </Container>
        </AuthBoilerplate>
      </div>
    )
  }
}

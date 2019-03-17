import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Icon, Label, Segment, Button, Container, Form, Message } from 'semantic-ui-react'

class RadioScanForm extends Component {
  
    render() {
  
      return (
        <div>
          <AuthBoilerplate history={this.props.history}>
              <Container padded="true" style={{padding: '20px'}} fluid>
                <Segment>
                  <h3>Add new Scan</h3>
                  <Message warning>Be sure of the information you put, because you will not be able to modify it later.</Message>
                </Segment>
                <Segment fluid='true'>
                  <Form fluid='true'>
                    <Form.Field>
                    <Form.Input fluid label='Worker Full Name' placeholder='Eg. Mohammed Salem' />
                    </Form.Field>
                    <Form.Field>
                    <Form.TextArea label='Scan Description' placeholder='Write the full details of the report here...' autoHeight />
                    </Form.Field>
                    <Form.Field>
                      <Label width="4" as="label" htmlFor="file" size="big">
                      <Icon name="file" />
                      Click here to attach an image
                      </Label>
                      <input id="file" hidden type="file" />
                    </Form.Field>
                    <Button primary>Submit Report</Button>
                  </Form>
                  </Segment>
              </Container>
          </AuthBoilerplate>
        </div>
      )
    }
  }
  
  export default RadioScanForm
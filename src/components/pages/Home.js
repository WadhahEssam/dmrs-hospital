import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Input, Divider, Button, Container, Grid, Message, Label } from 'semantic-ui-react'

export default class Home extends Component {
  render() {
    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
            <Container padded="true" style={{padding: '20px'}}>
              <Segment>
                <h3>Medical Record</h3>
                <Message>Retrieve medical record by patient national ID number, or create a new medical record.</Message>
              </Segment>
              <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                  <Grid.Column textAlign="center">
                    <Label>Open Medical Record</Label>
                    <br/>
                    <Input
                      style={{ position: 'relative', right: '40px', top: '10px' }}
                      action={{ color: 'blue', content: 'Open' }}
                      icon='user'
                      iconPosition='left'
                      placeholder='National ID'
                    />
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Label>Create Medical Record</Label>
                      <br/>
                    <Button                       
                      style={{ position: 'relative', top: '10px' }}
                      color='teal' content='Create' icon='add' labelPosition='left' />
                  </Grid.Column>
                </Grid>
                <Divider vertical>Or</Divider>
              </Segment>
            </Container>
        </AuthBoilerplate>
      </div>
    )
  }
}

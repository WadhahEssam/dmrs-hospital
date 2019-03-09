import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom' ;

export default class Login extends Component {
  render() {
    let staffTypes = [
      {
        text: 'Receptionist',
        value: 'receptionist',
      },
      {
        text: 'Doctor',
        value: 'doctor'
      },
      {
        text: 'Radiologist',
        value: 'radiologist',
      },
      {
        text: 'Laboratory technician',
        value: 'laboratoryTechnician',
      },

    ];
    return (
        <div className='login-form'>
          {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
          */}
          <style>{`
            .login-form {
              display: table;
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
            }
            .logo {
              height: 156px !important;
              width: 430px !important;
            }
          `}</style>

          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h1' color='teal' textAlign='center'>
                <img className="logo" src='hospital-header.jpg'/>
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                  />
                  <Form.Dropdown placeholder='Select Friend' fluid selection options={staffTypes} />
                  
                  <Button color='teal' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                Signing is allowed for hospital staff only
              </Message>
            </Grid.Column>
          </Grid>
        </div>
    )
  }
}

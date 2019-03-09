import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom' ;
import { BrowserRouter , Route , Switch, Redirect } from 'react-router-dom' ;

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    type: '',
    isError: false,
    errorMessage: '',
    isFetching: false,
  }

  componentDidUpdate() {
    // console.log(this.state)
  }

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

    let renderErrorMessage = (
      <Message attached='bottom' error>
        <Icon name='warning' />
        {this.state.errorMessage}
      </Message>
    );
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
              <Form size='large' onSubmit={(e) => {e.preventDefault()}}>
                <Segment stacked>
                  <Form.Input 
                    value={this.state.username}
                    fluid 
                    icon='user' 
                    iconPosition='left' 
                    placeholder='Username' 
                    onChange={(e) => {this.setState({username: e.target.value})}}
                  />
                  <Form.Input
                    value = {this.state.password}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={(e) => {this.setState({password: e.target.value})}}
                  />
                  <Form.Dropdown
                    value={this.state.type}
                    placeholder='Select Friend' 
                    fluid 
                    selection 
                    options={staffTypes} 
                    onChange={(e, {value}) => {this.setState({type: value})}} 
                  />
                  
                  <Button loading={this.state.isFetching} color='teal' fluid size='large' onClick={this.handleLogin}>
                    Login
                  </Button>
                </Segment>
              </Form>
              {this.state.isError ? renderErrorMessage : <div/>}

              <Message>
                Signing is allowed for hospital staff only
              </Message>
            </Grid.Column>
          </Grid>
        </div>
    )
  }

  handleLogin = () => {
    let { username, password, type } = this.state;
    if(username.length < 6) {
      this.setState({
        isError: true, 
        errorMessage: 'Username is too short'
      })
    }
    else if(password.length < 6) {
      this.setState({
        isError: true, 
        errorMessage: 'Password is too short'
      })
    }
    else if(type == '' || type == undefined) {
      this.setState({
        isError: true, 
        errorMessage: 'Please select a type first'
      })
    } else {
      this.setState({
        isError: false,
        errorMessage: '',
        isFetching: true,
      })
      // saving the user information to the cache storage
      localStorage.setItem("user", JSON.stringify({
        username,
        type
      }));
      setTimeout(()=>{
        this.setState({isFetching: false});
        console.log(this.state);
        this.props.history.push('/home');
      }, 1000);
    }

  }
}

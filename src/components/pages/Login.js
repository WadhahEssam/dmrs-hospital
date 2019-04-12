import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'
import Model from '../../data/Model';
import { withRouter } from 'react-router-dom'

class Login extends Component {
  state = {
    email: '',
    password: '',
    type: '',
    isError: false,
    errorMessage: '',
    isFetching: false,
  }

  componentDidMount() {
    //console.log(Model.checkUser('mohammed@hotmail.com', '112233'));
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
        text: 'Laboratory Technician',
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
              width: 156px !important;
              margin-bottom: 30px;
            }
            body {
              background: url('/background8.jpg')no-repeat center center fixed;
              -webkit-background-size: cover;
              -moz-background-size: cover;
              -o-background-size: cover;
              background-size: cover;
              background-color: #5d5d5d;
            }
          `}</style>

          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h1' color='teal' textAlign='center'>
                <img className="logo" src='logo.png' alt="King Abdullah bin Abdulaziz University Hospital"/>
              </Header>
              <Form size='large' onSubmit={(e) => {e.preventDefault()}}>
                <Segment stacked>
                  <Form.Input 
                    value={this.state.email}
                    fluid 
                    icon='at' 
                    iconPosition='left' 
                    placeholder='Email' 
                    onChange={(e) => {this.setState({email: e.target.value})}}
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
                    placeholder='Select Type of User' 
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
    let { email, password, type } = this.state;
    if(email.length < 6) {
      this.setState({
        isError: true, 
        errorMessage: 'Email is too short'
      })
    }
    else if(password.length < 6) {
      this.setState({
        isError: true, 
        errorMessage: 'Password is too short'
      })
    }
    else if(type === '' || !type) {
      this.setState({
        isError: true, 
        errorMessage: 'Please select a type first'
      })
    } else if (Model.checkUser(email, password, type)) {
      this.setState({
        isError: false,
        errorMessage: '',
        isFetching: true,
      })
      // saving the user information to the cache storage
      console.log(Model.getUser(email))
      localStorage.setItem("user", JSON.stringify(Model.getUser(email)));
      setTimeout(()=>{
        this.setState({isFetching: false});
        console.log(this.state);
        this.props.history.push('/home');
      }, 1000);
    }
    else {
      this.setState({
        isError: true, 
        errorMessage: 'User information is worng'
      })
    }

  }
}

export default withRouter(Login)
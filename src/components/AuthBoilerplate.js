import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class AuthBoilerplate extends Component {
  state = {
    userIsSigned: false,
    user: null,
  }

  componentDidMount() {
    this.checkUser();
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    if (this.state.userIsSigned) {
      return (
        <div>
          {this.props.children}
          <Button onClick={this.handleLogout}>Logout</Button>
        </div>
      );
    } 
    else {
      return (
        <h1>
          <div>You are not a user BOOY</div>
        </h1>
      );
    }
  }

  checkUser = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user == undefined) {
      this.setState({userIsSigned: false, user: null});
    } else {
      this.setState({userIsSigned: true, user});
    }
  }
}
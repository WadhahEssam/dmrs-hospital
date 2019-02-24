import React, { Component } from 'react'
import { Menu, Input, Container, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom' ;

export default class Login extends Component {
  render() {
    return (
      <div>
          <Segment>
            This is a the login page <Link to="/home">go to Home page</Link>
          </Segment>
      </div>
    )
  }
}

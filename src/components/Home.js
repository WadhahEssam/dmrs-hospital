import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom' ;

export default class Home extends Component {
  render() {
    return (
      <div>
        <Segment>
          This is a the home page <Link to="/login">go to Login page</Link>
        </Segment>
      </div>
    )
  }
}

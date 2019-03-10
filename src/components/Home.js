import React, { Component } from 'react'
import AuthBoilerplate from './AuthBoilerplate'

export default class Home extends Component {
  render() {
    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
          <div>this is the home page and welcome boy</div>
        </AuthBoilerplate>
      </div>
    )
  }
}

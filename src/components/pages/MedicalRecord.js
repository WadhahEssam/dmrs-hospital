// This component shows the medical record of the selected patient.

import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Menu, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class MedicalRecord extends Component {

    state={
        id: 0
    }


    render() {
        return (
            <h3>Medical Record Page</h3>
        )
    }
}

export default MedicalRecord
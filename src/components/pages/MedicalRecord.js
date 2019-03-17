// This component shows the medical record of the selected patient.

import React, { Component } from "react";
import AuthBoilerplate from "../AuthBoilerplate";
import {
  Table,
  Grid,
  Segment,
  Container,
  Label,
  Button
} from "semantic-ui-react";
import { withRouter } from 'react-router-dom'

class MedicalRecord extends Component {
  state = {
    id: 0
  };

  render() {
    return (
      <AuthBoilerplate>
        <Container padded="true" style={{ padding: "20px" }}>
            <Segment>
            <h3>Someone's Medical Record</h3>
            </Segment>
            
            <Segment>
                <Grid columns={2} divided>
                    <Grid.Column>
                        <Table celled>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell active>Name</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell active>DOB</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell active>Phone</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell active>Gender</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell active>Blood Type</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell active>National ID</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>

                    <Grid.Column>
                    <Table celled>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell active>Hospital Name</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid rows={5} divided>
                    <Grid.Row>
                        <Label>Diognosis</Label>
                    </Grid.Row>
                    <Grid.Row>
                        <Label>Lab Tests</Label>
                        <Button primary onClick={(e) => {this.props.history.push('/labTest')}}>Add new lab test</Button>
                    </Grid.Row>
                    <Grid.Row>
                        <Label>Radiology Scans</Label>
                        <Button primary onClick={(e) => {this.props.history.push('/radioScan')}}>Add new scan</Button>
                    </Grid.Row>
                    <Grid.Row>
                        <Label>Medicen Subscriptions</Label>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
      </AuthBoilerplate>
    );
  }
}

export default withRouter(MedicalRecord);

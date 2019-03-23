// This component shows the medical record of the selected patient.

import React, { Component } from "react";
import AuthBoilerplate from "../AuthBoilerplate";
import { Card, Table, Grid, Segment, Container, Label, Button } from "semantic-ui-react";
import { withRouter, Link } from 'react-router-dom'

class MedicalRecord extends Component {
    state = {
        id: 0
    };

    render() {

        const cardPlaceholderPath = '/card-placeholder.png'

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
                                        <Table.Row>
                                            <Table.Cell active>Created At</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell active>Emergency Contact</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment>
                        <Card.Group>
                            <Link style={{ padding: '10px' }} to={`/${this.state.id}/diagnoses`} >
                                <Card color='orange' raised header='Diognosis' image={cardPlaceholderPath} />
                            </Link>
                            <Link style={{ padding: '10px' }} to={`/${this.state.id}/surgeries`} >
                                <Card color='red' raised header='Surgeries' image={cardPlaceholderPath} />
                            </Link>
                            <Link style={{ padding: '10px' }} to={`/${this.state.id}/labTests`} >
                                <Card color='green' raised header='Lab Tests' image={cardPlaceholderPath} />
                            </Link>
                            <Link style={{ padding: '10px' }} to={`/${this.state.id}/radiologyScans`} >
                                <Card color='yellow' raised header='Radiology Scans' image={cardPlaceholderPath} />
                            </Link>
                            <Link style={{ padding: '10px' }} to={`/${this.state.id}/medicinePrescriptions`} >
                                <Card color='blue' raised header='Medicine Prescriptions' image={cardPlaceholderPath} />
                            </Link>
                        </Card.Group>
                    </Segment>
                </Container>
            </AuthBoilerplate>
        );
    }
}

export default withRouter(MedicalRecord);

// This component shows the medical record of the selected patient.
// As soon as this component mounts, a prop id will be avsailable in
// this.props.match.params.id

import React, { Component } from "react";
import AuthBoilerplate from "../AuthBoilerplate";
import {
  Image,
  Card,
  Table,
  Grid,
  Segment,
  Container,
  Label
} from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";

class MedicalRecord extends Component {
    state = {
        id: this.props.match.params.id
    };

    render() {

        const cardPlaceholderPath = '/card-placeholder.png'
        const padding = "20px"
        
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
                        <Card.Group centered>
                        <Link style={{ padding }} to={`/${this.state.id}/medicalRecord/diagnoses`}>
                            <Card color="orange" raised>
                            <div style={{ height: "242px" }}>
                                <Image
                                centered
                                src="/examination.svg"
                                size="small"
                                style={{ position: "relative", top: "50px" }}
                                />
                            </div>
                            <Card.Content>
                                <Card.Header textAlign='center'>Diagnoses</Card.Header>
                            </Card.Content>
                            </Card>
                        </Link>
                        <Link style={{ padding }} to={`/${this.state.id}/surgeries`}>
                            <Card color="orange" raised>
                            <div style={{ height: "242px" }}>
                                <Image
                                centered
                                src="/surgery-tools.svg"
                                size="small"
                                style={{ position: "relative", top: "50px" }}
                                />
                            </div>
                            <Card.Content>
                                <Card.Header textAlign='center'>Surgeries</Card.Header>
                            </Card.Content>
                            </Card>
                        </Link>
                        <Link style={{ padding }} to={`/${this.state.id}/labTests`}>
                            <Card color="orange" raised>
                            <div style={{ height: "242px" }}>
                                <Image
                                centered
                                src="/chemistry.svg"
                                size="small"
                                style={{ position: "relative", top: "50px" }}
                                />
                            </div>
                            <Card.Content>
                                <Card.Header textAlign='center'>Lab Tests</Card.Header>
                            </Card.Content>
                            </Card>
                        </Link>
                        <Link style={{ padding }} to={`/${this.state.id}/radiologyScans`}>
                        <Card color="orange" raised>
                            <div style={{ height: "242px" }}>
                                <Image
                                centered
                                src="/x-ray.svg"
                                size="small"
                                style={{ position: "relative", top: "50px" }}
                                />
                            </div>
                            <Card.Content>
                                <Card.Header textAlign='center'>Radiology Scans</Card.Header>
                            </Card.Content>
                            </Card>
                        </Link>
                        <Link
                            style={{ padding }}
                            to={`/${this.state.id}/medicinePrescriptions`}
                        >
                            <Card color="orange" raised>
                            <div style={{ height: "242px" }}>
                                <Image
                                centered
                                src="/prescription.svg"
                                size="small"
                                style={{ position: "relative", top: "50px" }}
                                />
                            </div>
                            <Card.Content>
                                <Card.Header textAlign='center'>Medicine Prescriptions</Card.Header>
                            </Card.Content>
                            </Card>
                        </Link>
                        </Card.Group>
                    </Segment>
                </Container>
            </AuthBoilerplate>
        );
    }
}

export default withRouter(MedicalRecord);

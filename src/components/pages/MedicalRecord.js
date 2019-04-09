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
import contract from '../../medicalRecordsSystemContract';
import medicalRecordABI from '../../medicalRecord';
import web3 from '../../web3';

class MedicalRecord extends Component {
    state = {
        id: 0,
        nationalID: '',
        dateOfBirth: (new Date()).getTime(),
        phoneNumber: '',
        gender: '',
        bloodType: '',
        emergencyContact: '',
        hospitalName: '',
        name: '',
        blockchainAdderss: '',
        user: '',
    };

    componentWillMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        this.fetchMedicalRecordInformation();
        this.setState({id: this.props.match.params.id, user})
    }

    checkPermission(permission) {
        if (this.state.user == '') {
            return false;
        } 
        let userPermissions = this.state.user.type.permissions;
        for (let i = 0; i<userPermissions.length; i++) {
            if (permission == userPermissions[i].name) {
                return true;
            }
        }
        return false;
    }

    render() {
        const cardPlaceholderPath = '/card-placeholder.png'
        const padding = "20px"
        const cardDisabled = { background: '#ffe8e8', opacity: '0.3' };
        
        return (
            <AuthBoilerplate>
                <Container padded="true" style={{ padding: "20px" }}>
                    <Segment>
                        <h3>{this.state.name}'s Medical Record</h3>
                    </Segment>

                    <Segment>
                        <Grid columns={2} divided>
                            <Grid.Column>
                                <Table celled>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell active>Name</Table.Cell>
                                            <Table.Cell>{this.state.name}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell active>Date of Birth</Table.Cell>
                                            <Table.Cell>{this.state.dateOfBirth}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell active>Phone</Table.Cell>
                                            <Table.Cell>{this.state.phoneNumber}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell active>Gender</Table.Cell>
                                            <Table.Cell>{this.state.gender}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell active>Blood Type</Table.Cell>
                                            <Table.Cell>{this.state.bloodType}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell active>National ID</Table.Cell>
                                            <Table.Cell>{this.state.nationalID}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Column>

                            <Grid.Column>
                                <Table celled>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell active>Hospital Name</Table.Cell>
                                            <Table.Cell>{this.state.hospitalName}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell active>Blockchain Address</Table.Cell>
                                            <Table.Cell>{this.state.blockchainAdderss}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell active>Emergency Contact</Table.Cell>
                                            <Table.Cell>{this.state.emergencyContact}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment>
                        <Card.Group centered>
                        <Link style={{ padding }} to={ (this.checkPermission('Diagnosis')) ? `/${this.state.id}/diagnosis` : `/${this.state.id}/medicalRecord`}>
                            <Card style={(this.checkPermission('Diagnosis')) ? {} : cardDisabled} color="orange" raised>
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
                        <Link style={{ padding }} to={ (this.checkPermission('Surgeries')) ? `/${this.state.id}/surgeries` : `/${this.state.id}/medicalRecord`}>
                            <Card style={(this.checkPermission('Surgeries')) ? {} : cardDisabled} color="orange" raised>
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

                        <Link style={{ padding }} to={ (this.checkPermission('Lab Tests')) ? `/${this.state.id}/labTests` : `/${this.state.id}/medicalRecord`}> 
                            <Card style={(this.checkPermission('Lab Tests')) ? {} : cardDisabled} color="orange" raised>
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
                        <Link style={{ padding }} to={ (this.checkPermission('Radiology')) ? `/${this.state.id}/radiologyScans` : `/${this.state.id}/medicalRecord`}>
                        <Card style={(this.checkPermission('Radiology')) ? {} : cardDisabled} color="orange" raised>
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
                            style={{ padding }} to={ (this.checkPermission('Medical Prescriptions')) ? `/${this.state.id}/medicalPrescriptions` : `/${this.state.id}/medicalRecord`}
                        >
                            <Card color="orange" raised  style={(this.checkPermission('Medical Prescriptions')) ? {} : cardDisabled}>
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
                        <Link
                            style={{ padding }}
                            to={ (this.checkPermission('Blood Donations')) ? `/${this.state.id}/bloodDonations` : `/${this.state.id}/medicalRecord`}
                        >
                            <Card color="orange" raised style={(this.checkPermission('Blood Donations')) ? {} : cardDisabled}>
                            <div style={{ height: "242px" }}>
                                <Image
                                centered
                                src="/blood-transfusion.svg"
                                size="small"
                                style={{ position: "relative", top: "50px" }}
                                />
                            </div>
                            <Card.Content>
                                <Card.Header textAlign='center'>Blood Donations</Card.Header>
                            </Card.Content>
                            </Card>
                        </Link>
                        </Card.Group>
                    </Segment>
                </Container>
            </AuthBoilerplate>
        );
    }

    fetchMedicalRecordInformation = async () => {
        const medicalRecordID = this.props.match.params.id;
        const medicalRecordAddress = await contract.methods.getMedicalRecord(medicalRecordID).call()
        let newMedicalRecordsSystemContract = await new web3.eth.Contract(
            medicalRecordABI, 
            medicalRecordAddress
          ); 
        const name = await newMedicalRecordsSystemContract.methods.name().call();
        const nationalID = await newMedicalRecordsSystemContract.methods.nationalID().call();
        const dateOfBirth = await newMedicalRecordsSystemContract.methods.dateOfBirth().call()
        const phoneNumber = await newMedicalRecordsSystemContract.methods.phoneNumber().call();
        const gender = await newMedicalRecordsSystemContract.methods.gender().call();
        const bloodType = await newMedicalRecordsSystemContract.methods.bloodType().call();
        const emergencyContact = await newMedicalRecordsSystemContract.methods.emergencyContacts(0).call();
        const hospitalName = await newMedicalRecordsSystemContract.methods.hospitalName().call();
        this.setState({
            name,
            nationalID,
            dateOfBirth,
            phoneNumber,
            gender,
            bloodType,
            emergencyContact,
            hospitalName,
            blockchainAdderss: medicalRecordAddress.substring(0,20) + '...'
        });
    }
}

export default withRouter(MedicalRecord);

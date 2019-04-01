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
  Label,
  Button,
  Icon
} from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";

class Diagnoses extends Component {
  state = {
    id: 0
  };

  render() {
    const diagnoses = [
      {
        doctor: "dr. Khaled Saud",
        date: 973904461,
        isCorrectionFor: null,
        hospitalName: "King Khaled Hospital",
        fileHash: "1230874612983",
        blockchainAddress: "0x012ax9sa897099sd98aada9889x8s9dsa08dee"
      },
      {
        doctor: "dr. Khaled Saud",
        date: 973904461,
        isCorrectionFor: null,
        hospitalName: "King Khaled Hospital",
        fileHash: "1230874612983",
        blockchainAddress: "0x012ax9sa897099sd98aada9889x8s9dsa08dee"
      },
      {
        doctor: "dr. Khaled Saud",
        date: 973904461,
        isCorrectionFor: null,
        hospitalName: "King Khaled Hospital",
        fileHash: "1230874612983",
        blockchainAddress: "0x012ax9sa897099sd98aada9889x8s9dsa08dee"
      },
      {
        doctor: "dr. Khaled Saud",
        date: 973904461,
        isCorrectionFor: null,
        hospitalName: "King Khaled Hospital",
        fileHash: "1230874612983",
        blockchainAddress: "0x012ax9sa897099sd98aada9889x8s9dsa08dee"
      }
    ];

    let diagnosesCards = diagnoses.map(surgery => {
      return (
        <Card
          fluid
          color="red"
          header="Option 1"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <Container style={{ padding: "10px" }}>
            {surgery.isMedicalError ? (
              <Label color="red" ribbon>
                Medical Error
              </Label>
            ) : (
              <div />
            )}
            <Table celled>
              <Table.Body>
                <Table.Row>
                <Table.Cell active>Doctor</Table.Cell>
                  <Table.Cell>{surgery.doctor}</Table.Cell>
                  <Table.Cell width="3" active>
                    Surgery Date
                  </Table.Cell>
                  <Table.Cell width="4">{surgery.date}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell active></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell active>Hospital</Table.Cell>
                  <Table.Cell>{surgery.hospitalName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell active></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell active>Blockchain Address</Table.Cell>
                  <Table.Cell>{surgery.blockchainAddress}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Container>
          <Card.Description>
            <Container textAlign="center">
              <Label size="big" basic pointing="below">
                Diagnosis Information
              </Label>
              <h6 style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                Due to the patient lake of sleep during the last two months and
                according to the tests he did it appeared to be a problem that
                needed an argunt Due to the patient lake of sleep during the
                last two months and according Due to the patient lake of sleep
                during the last two months and according
              </h6>
            </Container>
            <hr />
            <Container textAlign="center" style={{ paddingBottom: "10px" }}>
              <Label size="big" basic pointing="right">
                File
              </Label>
              <Button
                style={{ marginLeft: "10px", marginTop: "10px" }}
                color="green"
                size="big"
              >
                <Icon name="file" /> Download
              </Button>
            </Container>
            <hr />
          </Card.Description>
          <Card.Meta>
            <Container style={{ marginBottom: "10px" }} textAlign="center">
              <Button inverted color="red">
                Mark As Medical Error
              </Button>
            </Container>
          </Card.Meta>
        </Card>
      );
    });

    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
          <Container padded="true" style={{ padding: "20px" }}>
            <Segment>
              <h3>diagnoses for someone</h3>
              <Button floated="right" primary onClick={() => {this.props.history.push(`/${this.state.id}/medicalRecord/diagnoses/new`)}}>Add New Diagnosis</Button>
            </Segment>
            <br />
            <Card.Group>{diagnosesCards}</Card.Group>
          </Container>
        </AuthBoilerplate>
      </div>
    );
  }
}

export default withRouter(Diagnoses);

import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Card, Table, Form, Message, Label, Button, Radio, Image } from 'semantic-ui-react'
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from 'constants';

export default class Home extends Component {
  state = {
    name: '',
    nationalID: '',
    phoneNumber: '',
    gender: '',
    birthDate: '',
    isOpen: false,
    bloodType: '',
    emergencyContact: '',
    isError: false,
    errorMessage: '',
  }

  render() {
    const surgeries = [
      {
        surgeryName: 'Coronary artery bypass',
        doctor: 'dr. Khaled Saud',
        date: 973904461,
        isMedicalError: false,
        isCorrectionFor: null,
        hospitalName: 'King Khaled Hospital',
        fileHash: '1230874612983',
        duration: 60,
        blockchainAddress: '0x012ax9sa897099sd98aada9889x8s9dsa08dee'
      },
      {
        surgeryName: 'Debridement of wound, burn, or infection',
        doctor: 'dr. Khaled Saud',
        date: 973904461,
        isMedicalError: false,
        isCorrectionFor: null,
        hospitalName: 'King Khaled Hospital',
        fileHash: '1230874612983',
        duration: 60,
        blockchainAddress: '0x012ax9sa897099sd98aada9889x8s9dsa08dee'
      },
      {
        surgeryName: 'Dilation and curettage (D&C)',
        doctor: 'dr. Khaled Saud',
        date: 973904461,
        isMedicalError: false,
        isCorrectionFor: null,
        hospitalName: 'King Khaled Hospital',
        fileHash: '1230874612983',
        duration: 60,
        blockchainAddress: '0x012ax9sa897099sd98aada9889x8s9dsa08dee'
      },
      {
        surgeryName: 'Low back pain surgery',
        doctor: 'dr. Khaled Saud',
        date: 973904461,
        isMedicalError: false,
        isCorrectionFor: null,
        hospitalName: 'King Khaled Hospital',
        fileHash: '1230874612983',
        duration: 60,
        blockchainAddress: '0x012ax9sa897099sd98aada9889x8s9dsa08dee'
      },

    ]

    let surgeriesCards = surgeries.map((surgery) => {
      return (
        <Card fluid color='red' header='Option 1' style={{margin: "30px"}}>
            <Table celled>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width="3" active>Surgery Name</Table.Cell>
                        <Table.Cell width="4">{surgery.surgeryName}</Table.Cell>
                        <Table.Cell width="3" active>Surgery Date</Table.Cell>
                        <Table.Cell width="4">{surgery.date}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell active>Doctor</Table.Cell>
                        <Table.Cell>{surgery.doctor}</Table.Cell>
                        <Table.Cell active>Hospital</Table.Cell>
                        <Table.Cell>{surgery.hospitalName}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell active>Duration</Table.Cell>
                        <Table.Cell>{surgery.duration}</Table.Cell>
                        <Table.Cell active>Blockchain Address</Table.Cell>
                        <Table.Cell>{surgery.blockchainAddress}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Card.Description>
              <Container textAlign="center">
                <Label size="big" basic pointing='below'>
                  Extra Information 
                </Label>
                <h6>Due to the patient lake of sleep during the last two months and according to the tests he did it appeared to be a problem that needed an argunt  </h6>
              </Container>
              <hr/>
              <Container textAlign="center" style={{paddingBottom: '10px'}}>
                <Label size="big" basic pointing='below'>
                  File
                </Label>
                <br/>
                <Image
                  size="medium"
                  label={{ as: 'a', corner: 'left', icon: 'plus' }}
                  src='surgeryDocument.jpg'
                />
              </Container>
            </Card.Description>
        </Card>
      );
    })

    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
          <Container padded="true" style={{ padding: "20px" }}>
            <Segment>
              <h3>Surgeries for someone</h3>
            </Segment>
            <br/>
            <Card.Group>
              {surgeriesCards}
            </Card.Group>
          </Container>
        </AuthBoilerplate>
      </div>
    )
  }

}

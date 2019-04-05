import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Card, Table, Form, Message, Label, Button, Radio, Image, Icon } from 'semantic-ui-react'
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from 'constants';
import contract from '../../medicalRecordsSystemContract';
import web3 from '../../web3';
import medicalRecordABI from '../../medicalRecord';
import { toast } from 'react-toastify';

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
    noSurgeries: null,
    surgeries: [],
  }

  componentDidMount() {
    this.getSurgeries();
  }

  getSurgeries = async () => {
    const accounts = await web3.eth.getAccounts();
    const medicalRecordID = this.props.match.params.id;
    const medicalRecordAddress = await contract.methods.getMedicalRecord(medicalRecordID).call()
    let medicalRecordContract = await new web3.eth.Contract(
        medicalRecordABI, 
        medicalRecordAddress
      ); 
    
    let surgeriesList = [];
    let surgeriesCount = await medicalRecordContract.methods.surgeriesCount().call();
    if (surgeriesCount == 0) {
      this.setState({noSurgeries: true});
    }
    for (let i = 0; i < surgeriesCount; i++) {
      surgeriesList.push(await medicalRecordContract.methods.surgeries(i).call());
    }
    this.setState({surgeries: surgeriesList});
    console.log(surgeriesList);
  }

  render() {
    const { surgeries } = this.state;

    let surgeriesCards = surgeries.slice(0).reverse().map((surgery, index) => {
      return (
        <Card key={index+1} fluid color='red' style={{marginTop: "30px", marginBottom: "30px"}}>
          <Container style={{padding: '10px'}}>
            {
              (surgery.isCorrectionFor !== "") ? 
              <Label color='red' ribbon>Medical Error</Label> :
              <div/>
            }
            <Table celled>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width="3" active>Surgery Name</Table.Cell>
                        <Table.Cell width="4">{surgery.surgeryName}</Table.Cell>
                        <Table.Cell width="3" active>Surgery Date</Table.Cell>
                        <Table.Cell width="4">{this.formatDate(surgery.date)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell active>Doctor</Table.Cell>
                        <Table.Cell>{surgery.mainDoctor}</Table.Cell>
                        <Table.Cell active>Hospital</Table.Cell>
                        <Table.Cell>{surgery.hospitalName}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell active>Duration</Table.Cell>
                        <Table.Cell>{surgery.duration}</Table.Cell>
                        <Table.Cell active>Transaciton ID</Table.Cell>
                        <Table.Cell>{surgery.id}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
          </Container>
          <Card.Description>
            <Container textAlign="center">
              <Label size="big" basic pointing='below'>
                Extra Information 
              </Label>
              <h6 style={{paddingLeft: '30px', paddingRight: '30px'}}>
                {surgery.surgeryInformation}
              </h6>
            </Container>
            {/* <hr/>
            <Container textAlign="center" style={{paddingBottom: '10px'}}>
              <Label size="big" basic pointing='right'>
                File
              </Label>
              <Button style={{marginLeft: '10px', marginTop: '10px'}} color="green" size="big"><Icon name="file"/> Download</Button>
            </Container> */}
            <hr/>
          </Card.Description>
          <Card.Meta>
            <Container style={{marginBottom: '10px'}} textAlign="center">
              <Button 
                inverted 
                disabled={(surgery.isCorrectionFor == 'true' || surgery.isCorrectionFor !== '')}
                color="red">
                Mark As Medical Error
              </Button>
            </Container>
          </Card.Meta>
        </Card>
      );
    })

    return (
      <div>
        <AuthBoilerplate history={this.props.history}>
          <Container padded="true" style={{ padding: "20px" }}>
            <Segment>
              <h3 style={{display: 'inline'}}>Surgeries for someone</h3> 
              <Button 
                icon
                labelPosition="left"
                color="green" 
                style={{position: 'absolute', right: '20px'}}
                onClick={() => {this.props.history.push(`addSurgery`)}}
              >
                <Icon name="plus"/>
                Add new surgey
              </Button>
            </Segment>
              {
                (this.state.noSurgeries == true) ? 
                <Segment><Message warning>There are no surgeries for this patient at the moment</Message></Segment> :
                <div />
              }
            <br/>
            <Card.Group>
              {surgeriesCards}
            </Card.Group>
          </Container>
        </AuthBoilerplate>
      </div>
    )
  }

  formatDate = (_date) => {
    let date = new Date(_date*1000);
    let hours = date.getHours();
    let minutes = ("0"+date.getMinutes()).substr(-2);
    let seconds = ("0"+date.getSeconds()).substr(-2);
    let day = date.getDate();
    let month = date.getUTCMonth();
    let year = date.getUTCFullYear();
    return hours+':'+minutes+':'+seconds+"  "+day+"/"+month+"/"+year;
  }

}

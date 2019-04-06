import React, { Component } from 'react'
import AuthBoilerplate from '../AuthBoilerplate'
import { Segment, Container, Card, Table, Form, Message, Label, Button, Radio, Image, Icon } from 'semantic-ui-react'
import { cloneDeep } from 'lodash';
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
    erroneousTransactions: [], // this represent the ids' of the transactions that has been corrected [{id: 1, corretedBy: 5}, {id: 2, corretedBy: 6}]
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
      let newSurgery = await medicalRecordContract.methods.surgeries(i).call();
      surgeriesList.push(newSurgery);
    }
    this.setState({surgeries: surgeriesList});
    this.filterCorrectedTransactions();
    console.log(surgeriesList);
  }

  // checkes if the transaction is correted or not
  filterCorrectedTransactions = () => {
    let erroneousTransactions = [];
    let transactions = this.state.surgeries;
    for(let i = 0; i < transactions.length; i++) {
      if (transactions[i].isCorrectionFor !== '' && transactions[i].isCorrectionFor !== 'true') {
        erroneousTransactions.push({id: transactions[i].isCorrectionFor, correctedBy: transactions[i].id});
      }
    }
    this.setState({erroneousTransactions});
  }

  // check by id if specific transaction is corrected
  isCorrected = (id) => {
    let erroneousTransactions = this.state.erroneousTransactions;
    for (let i = 0; i < erroneousTransactions.length; i++) {
      if (erroneousTransactions[i].id == id) {
        return {result: true, correctedBy: erroneousTransactions[i].correctedBy};
      }
    }
    return {result: false};
  }

  render() {
    const { surgeries } = this.state;

    let surgeriesCards = surgeries.slice(0).reverse().map((surgery, index) => {
      let colorOfCard = 'grey';
      if (surgery.isCorrectionFor == 'true' || this.isCorrected(surgery.id).result) {
        colorOfCard = 'red';
      } 
      let label = null;
      if (this.isCorrected(surgery.id).result) {
        label = <Label color='red' ribbon>Medical Error : has been corrected by surgery with ID ( {this.isCorrected(surgery.id).correctedBy} )</Label> 
      } else if (surgery.isCorrectionFor == 'true') {
        label = <Label color='red' ribbon>Medical Error</Label> 
      } else if (surgery.isCorrectionFor !== '') {
        label = <Label color='blue' ribbon>Is Correction For Surgery With ID ( {surgery.isCorrectionFor} ) </Label> 
      }


      console.log(this.isCorrected(6).result);

      return (
        <Card key={index+1} fluid color={colorOfCard} style={{marginTop: "30px", marginBottom: "30px"}}>
          <Container style={{padding: '10px'}}>
            {label}
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
                disabled={(surgery.isCorrectionFor == 'true' || this.isCorrected(surgery.id).result)}
                color="red"
                onClick={() => {this.markAsMedicalError(surgery.id)}}>
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

  markAsMedicalError = async (id) => {
    const accounts = await web3.eth.getAccounts();
    const medicalRecordID = this.props.match.params.id;
    const medicalRecordAddress = await contract.methods.getMedicalRecord(medicalRecordID).call()
    let medicalRecordContract = await new web3.eth.Contract(
        medicalRecordABI, 
        medicalRecordAddress
      ); 

    await medicalRecordContract.methods.markTransactionAsMedicalError(1, id).send({ from: accounts[0], gas: '200000000' })
    .then(() => {
      let cloned = cloneDeep(this.state.surgeries);
      for(let i = 0; i < cloned.length; i++){
        if (cloned[i].id == id) {
          cloned[i].isCorrectionFor = 'true';
        }
      }
      this.setState({surgeries: cloned});
      toast.success("Surgery has been set as a medical error.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        width: 200,
      });
    })
    .catch(() => {
      toast.error("Error : Something worng happened", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        width: 200,
      });
    })
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

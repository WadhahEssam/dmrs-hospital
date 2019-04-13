import React, { Component } from 'react';
import { Button, Menu, Grid, Image, Card , Label, Icon } from 'semantic-ui-react';
import ErrorPage from './pages/ErrorPage';
import { withRouter } from 'react-router-dom'
import { timingSafeEqual } from 'crypto';

class AuthBoilerplate extends Component {
  state = {
    userIsSigned: false,
    user: null,
    activeItem: this.props.history.location.pathname,
  }

  componentDidMount() {
    this.checkUser();
  }

  generatePermissionLabels(user) {
    if (user != null) {
      const userPermissionsArray = user.type.permissions
      let returnedArray = []
      
      userPermissionsArray.forEach((element, index) => {
        returnedArray.push(
          <Label style={{marginTop: '3px'}} color={element.color} key={index}>
            {element.name}
          </Label>
        )
      })

      return returnedArray
    } else {
      console.log('user is null')
    }
  }

  render() {
    const { activeItem, user } = this.state
    if (this.state.userIsSigned) {
      return (
        <div>

          {/* Navbar Menu */}
          <Menu inverted pointing size='large' style={{margin: '10px'}}>
            <Menu.Item name='/home' active={activeItem === '/home'} onClick={this.handleItemClick} />
            <Menu.Menu position='right'>
              <Menu.Item>
                King Abdullah Hospital
                <img src="/logo.png" style={{marginLeft: '10px'}} />
              </Menu.Item>
              <Menu.Item>
                <Button onClick={this.handleLogout} color="red">Sign Out</Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>

            <Grid centered padded>
              <Grid.Column width={3}>
        
                {/* User Card */}
                <Grid.Row>
                  <Card fluid style={{maxWidth: '280px'}}>
                    <Image src='/doctor-profile-picture.jpg' style={{height: '350px'}}/>
                    <Card.Content>
                      <Card.Header>{user.username}</Card.Header>
                      <Card.Meta>
                        <span className='date'>{user.type.name}</span>
                      </Card.Meta>
                      <Card.Description><h5>Permissions :</h5></Card.Description>
                      <Card.Description>
                        {this.generatePermissionLabels(this.state.user)}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra textAlign="center">
                        <Icon color="teal" name='dot circle' />
                    </Card.Content>
                  </Card>
                </Grid.Row>

                {/* Side Menu */}
                {this.renderSideMenu()}
              </Grid.Column>

              {/* Content */}
              <Grid.Column width={12}>
                {this.props.children}
              </Grid.Column>
            </Grid>
        </div>
      );
    } 
    else {
      return (
        <h1>
          <ErrorPage />
        </h1>
      );
    }
  }

  renderSideMenu = () => {
    const { activeItem, user } = this.state
    const currentPage = this.props.history.location.pathname;
    const userType = this.state.user.type.name;
    console.log(userType);

    console.log(this.props.history);
    if (currentPage == '/home') {
      return (
        <Grid.Row style={{marginTop: '30px', maxWidth: '280px'}}>
          <Menu fluid vertical>
            <Menu.Item name='/home' active={activeItem === '/home'} onClick={this.handleItemClick}>
              <Icon name="address card" color="teal"/>
              Home
            </Menu.Item>
            <Menu.Item style={{color: 'red', fontWeight: '400'}} name='/signout' active={activeItem === '/signout'} onClick={this.handleLogout}>
              <Icon name="sign-out" color="teal"/>
              Signout
            </Menu.Item>
          </Menu>
        </Grid.Row>
      )
    } else if (userType == 'doctor') {
      return (
        <Grid.Row style={{marginTop: '30px', maxWidth: '280px'}}>
          <Menu fluid vertical>
            <Menu.Item name='/home' active={activeItem === '/home'} onClick={this.handleItemClick}>
              <Icon name="home" color="teal"/>
              Home
            </Menu.Item>
            <Menu.Item name='/medicalRecord' active={activeItem === '/medicalReocrd'} onClick={this.handleItemClick}>
              <Icon name="address card" color="black"/>
              Medical Record Information
            </Menu.Item>
            <Menu.Item name='/diagnosis' active={activeItem === '/diagnosis'} onClick={this.handleItemClick}>
              Diagnosis
            </Menu.Item>
            <Menu.Item name='/surgeries' active={activeItem === '/surgeries'} onClick={this.handleItemClick}>
              Surgeries
            </Menu.Item>
            <Menu.Item name='/labTests' active={activeItem === '/labTests'} onClick={this.handleItemClick}>
              Lab Tests
            </Menu.Item>
            <Menu.Item name='/radiologyScans' active={activeItem === '/radiologyScans'} onClick={this.handleItemClick}>
              Radiology Scans
            </Menu.Item>
            <Menu.Item name='/medicalPrescriptions' active={activeItem === '/medicalPrescriptions'} onClick={this.handleItemClick}>
              Medical Prescriptions
            </Menu.Item>
            <Menu.Item name='/bloodDonations' active={activeItem === '/bloodDonations'} onClick={this.handleItemClick}>
              Blood Donations
            </Menu.Item>
            <Menu.Item style={{color: 'red', fontWeight: '700'}} name='/signout' active={activeItem === '/signout'} onClick={this.handleLogout}>
              <Icon name="sign-out" color="red"/>
              Signout
            </Menu.Item>
          </Menu>
        </Grid.Row>
      )
    } else if (userType == 'radiologist') {
      return (
        <Grid.Row style={{marginTop: '30px', maxWidth: '280px'}}>
          <Menu fluid vertical>
            <Menu.Item name='/home' active={activeItem === '/home'} onClick={this.handleItemClick}>
              <Icon name="home" color="teal"/>
              Home
            </Menu.Item>
            <Menu.Item name='/medicalRecord' active={activeItem === '/medicalReocrd'} onClick={this.handleItemClick}>
              <Icon name="address card" color="black"/>
              Medical Record Information
            </Menu.Item>
            <Menu.Item name='/radiologyScans' active={activeItem === '/radiologyScans'} onClick={this.handleItemClick}>
              Radiology Scans
            </Menu.Item>
            <Menu.Item style={{color: 'red', fontWeight: '700'}} name='/signout' active={activeItem === '/signout'} onClick={this.handleLogout}>
              <Icon name="sign-out" color="red"/>
              Signout
            </Menu.Item>
          </Menu>
        </Grid.Row>
      ) 
    } else if (userType == 'receptionist') {
      return (
        <Grid.Row style={{marginTop: '30px', maxWidth: '280px'}}>
          <Menu fluid vertical>
            <Menu.Item name='/home' active={activeItem === '/home'} onClick={this.handleItemClick}>
              <Icon name="home" color="teal"/>
              Home
            </Menu.Item>
            <Menu.Item style={{color: 'red', fontWeight: '700'}} name='/signout' active={activeItem === '/signout'} onClick={this.handleLogout}>
              <Icon name="sign-out" color="red"/>
              Signout
            </Menu.Item>
          </Menu>
        </Grid.Row>
      )
    } else if (userType == 'laboratoryTechnician') {
      return (
        <Grid.Row style={{marginTop: '30px', maxWidth: '280px'}}>
          <Menu fluid vertical>
            <Menu.Item name='/home' active={activeItem === '/home'} onClick={this.handleItemClick}>
              <Icon name="home" color="teal"/>
              Home
            </Menu.Item>
            <Menu.Item name='/medicalRecord' active={activeItem === '/medicalReocrd'} onClick={this.handleItemClick}>
              <Icon name="address card" color="black"/>
              Medical Record Information
            </Menu.Item>
            <Menu.Item name='/labTests' active={activeItem === '/labTests'} onClick={this.handleItemClick}>
              Lab Tests
            </Menu.Item>
            <Menu.Item style={{color: 'red', fontWeight: '700'}} name='/signout' active={activeItem === '/signout'} onClick={this.handleLogout}>
              <Icon name="sign-out" color="red"/>
              Signout
            </Menu.Item>
          </Menu>
        </Grid.Row>
      )
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    let id = this.props.match.params.id;
    console.log(name);
    if (name == '/home') {
      window.location.href = `..${name}` 
    }
    else if (id != null) {
      window.location.href = `../${id}${name}` 
    } 
  }

  handleLogout = () => {
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

  checkUser = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.setState({userIsSigned: false, user: null});
    } else {
      this.setState({userIsSigned: true, user});
    }
  }
}

export default withRouter(AuthBoilerplate)
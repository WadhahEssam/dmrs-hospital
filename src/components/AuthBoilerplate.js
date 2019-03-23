import React, { Component } from 'react';
import { Button, Menu, Grid, Image, Card , Label, Icon } from 'semantic-ui-react';
import ErrorPage from './pages/ErrorPage';
import { withRouter } from 'react-router-dom'

class AuthBoilerplate extends Component {
  state = {
    userIsSigned: false,
    user: null,
    activeItem: 'home',
  }

  componentDidMount() {
    this.checkUser();
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push('/home')
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
          <Menu attached size='tiny'>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Menu position='right'>
              <Menu.Item>
                King Abdullah Hospital
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
                  <Card fluid>
                    <Image src='/doctor-profile-picture.jpg' />
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
                <Grid.Row style={{marginTop: '30px'}}>
                  <Menu fluid vertical>
                    <Menu.Item name='openMedicalRecord' active={activeItem === 'openMedicalRecord'} onClick={this.handleItemClick}>
                      <Icon name="address card" color="teal"/>
                      Open medical record
                    </Menu.Item>
                    <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
                      <Icon name="add user" color="teal"/>
                      Create medical recrod
                    </Menu.Item>
                  </Menu>
                </Grid.Row>
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
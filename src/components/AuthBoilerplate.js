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
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
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
    console.log(currentPage)
    
    if (currentPage == '/home') {
      return (
        <Grid.Row style={{marginTop: '30px', maxWidth: '280px'}}>
          <Menu fluid vertical>
            <Menu.Item name='/home' active={activeItem === '/home'} onClick={this.handleItemClick}>
              <Icon name="address card" color="teal"/>
              Home
            </Menu.Item>
            <Menu.Item style={{color: 'red', fontWeight: '400'}} name='/signout' active={activeItem === '/signout'} onClick={this.handleLogout}>
              <Icon name="add user" color="teal"/>
              Signout
            </Menu.Item>
          </Menu>
        </Grid.Row>
      )
    } else {
      return (
        <React.Fragment/>
      )
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push(name)
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
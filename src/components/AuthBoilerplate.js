import React, { Component } from 'react';
import { Segment, Button, Dropdown, Menu, Grid, Image, Container, Card , Label, Input, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';

export default class AuthBoilerplate extends Component {
  state = {
    userIsSigned: false,
    user: null,
    activeItem: 'home',
  }

  componentDidMount() {
    this.checkUser();
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    if (this.state.userIsSigned) {
      return (
        <div>

          {/* Navbar Menu */}
          <Menu attached size='tiny'>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Item
              name='messages'
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                King Abdullah Hospital
              </Menu.Item>
              <Menu.Item>
                <Button color="red">Sign Out</Button>
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
                      <Card.Header>Matthew</Card.Header>
                      <Card.Meta>
                        <span className='date'>Joined in 2015</span>
                      </Card.Meta>
                      <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                        22 Friends
                      </a>
                    </Card.Content>
                  </Card>
                </Grid.Row>

                {/* Side Menu */}
                <Grid.Row style={{marginTop: '30px'}}>
                  <Menu fluid vertical>
                    <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={this.handleItemClick}>
                      <Label color='teal'>1</Label>
                      Inbox
                    </Menu.Item>
                    <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
                      <Label>51</Label>
                      Spam
                    </Menu.Item>
                    <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
                      <Label>1</Label>
                      Updates
                    </Menu.Item>
                    <Menu.Item>
                      <Input icon='search' placeholder='Search mail...' />
                    </Menu.Item>
                  </Menu>
                </Grid.Row>
              </Grid.Column>

              {/* Content */}
              <Grid.Column width={12}>
                {this.props.children}
                <Button onClick={this.handleLogout}>Logout</Button>
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
    this.props.history.push('/login');
  }

  checkUser = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user == undefined) {
      this.setState({userIsSigned: false, user: null});
    } else {
      this.setState({userIsSigned: true, user});
    }
  }
}
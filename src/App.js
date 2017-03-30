import React, { Component } from 'react';
import './App.css';
import client from 'google-client-api'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
injectTapEventPlugin();

class App extends Component {
  constructor(){
    super()
    this.state={
      username: '',
      visible: false,
      logged: false
    }
  }

  componentDidMount() {
    client()
    .then((gapi) =>  {
      gapi.signin2.render('my-signin2', {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'width': 250,
        'height': 50,
        'longtitle': true,
        'margin-left': 100,
        'onsuccess': this.onSignIn
      })
    })
  }

  getUserName = (googleUser) => {
    var profile = googleUser.getBasicProfile()
    return profile.getName()
  }

  getImageUrl = (googleUser) => {
    var profile = googleUser.getBasicProfile()
    return profile.getImageUrl()
  }

  showUserName = (name) => {
    const username = this.getUserName(name)
    const image = this.getImageUrl(name)
    this.setState({username, image})
  }

   onSignIn = (googleUser) => {
    this.showUserName(googleUser)
    this.setState({
      visible:true,
      logged: true
    })
  }

  hideNameAndButton = () => {
    this.setState({
      username: '',
      visible: false
    })
  }

  signOut = () => {
    client()
    .then((gapi) => gapi.auth2.getAuthInstance().signOut())
    .then(this.hideNameAndButton())
    .then(this.setState({logged:false}))
  }



  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className={this.state.visible? '':'hidden'}>
            <AppBar
              title={this.state.username}
              iconElementLeft={<Avatar src={this.state.image} />}
              iconElementRight={this.state.logged ? <Logged signOut={this.signOut}/> : <Login />}
            />
          </div>
          <div id="my-signin2" className={this.state.visible? 'hidden':'main-btn'}></div>
        </div>
      </MuiThemeProvider>
    );
  }
}

class Login extends Component {
  static muiName = 'FlatButton';
  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Log out" onClick={props.signOut}/>
  </IconMenu>
);

Logged.muiName = 'IconMenu';

export default App;

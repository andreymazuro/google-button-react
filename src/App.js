import React, { Component } from 'react';
import client from 'google-client-api'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {IconMenu, MenuItem, IconButton, AppBar, Avatar} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {getUserName, getImageUrl} from './authUtils'
import './App.css';
injectTapEventPlugin();

class App extends Component {
  constructor(){
    super()
    this.state= {
      authorizedUser: null
    }
  }

  componentDidMount() {
    this.renderSignInButton()
  }

  renderSignInButton() {
    client()
    .then((gapi) =>  {
      gapi.signin2.render('google-signin-button', {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'width': 250,
        'height': 50,
        'longtitle': true,
        'margin-left': 100,
        'onsuccess': this.onSignIn
      })
    })
  }

  isAuthorized = () => this.state.authorizedUser !== null

  showUserName = (user) => {
    const authorizedUser = getUserName(user)
    const image = getImageUrl(user)
    this.setState({authorizedUser: {name:authorizedUser, image: image}})
  }

  onSignIn = (googleUser) => {
    this.showUserName(googleUser)
  }

  hideNameAndButton = () => {
    this.setState({
      authorizedUser: null
    })
  }

  signOut = () => {
    client()
    .then((gapi) => gapi.auth2.getAuthInstance().signOut())
    .then(this.hideNameAndButton())
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={this.isAuthorized()? this.state.authorizedUser.name : null}
            iconElementLeft={this.isAuthorized()? <Avatar src={this.state.authorizedUser.image} /> : null}
            iconElementRight={this.isAuthorized()? <UserMenu signOut={this.signOut}/> : null}
          />
        <div id="google-signin-button" className={this.isAuthorized()? 'hidden':'main-btn'}></div>
      </div>
    </MuiThemeProvider>
    );
  }
}


const UserMenu = (props) => (
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

UserMenu.muiName = 'IconMenu';

export default App;

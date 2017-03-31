import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {IconMenu, MenuItem, IconButton, AppBar, Avatar} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {getUserInfo, authorize, signOut} from './authUtils'
import './App.css';

injectTapEventPlugin();

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      authorizedUser: null
    }
  }

  componentDidMount() {
    authorize(this.onSignIn)
  }

  isAuthorized = () => this.state.authorizedUser !== null

  onSignIn = (googleUser) => {
    const { imageUrl, username } = getUserInfo(googleUser)
    this.setState({
      authorizedUser: {
        name: username,
        image: imageUrl
      }
    })
  }

  onSignOut = () => {
    signOut().then(()=> {
      this.setState({
        authorizedUser: null
      })
      authorize(this.onSignIn)
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={this.isAuthorized() ? this.state.authorizedUser.name : null}
            iconElementLeft={this.isAuthorized() ? <Avatar src={this.state.authorizedUser.image} /> : null}
            iconElementRight={this.isAuthorized() ? <UserMenu onSignOut={this.onSignOut}/> : null}
          />
          <div id="google-signin-button" className={this.isAuthorized() ? 'btn-hidden' : 'main-btn'}></div>
        </div>
      </MuiThemeProvider>
    )
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
    <MenuItem primaryText="Log out" onClick={props.onSignOut}/>
  </IconMenu>
);

export default App;

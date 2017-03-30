import React, { Component } from 'react';
import './App.css';
import client from 'google-client-api'

class App extends Component {
  constructor(){
    super()
    this.state={
      username: '',
      visible: false
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
        'onsuccess': this.onSignIn
      })
    })
  }


  getUserName = (googleUser) => {
    var profile = googleUser.getBasicProfile()
    return profile.getName()
  }

  showUserName = (name) => {
    const username = this.getUserName(name)
    this.setState({username})
  }

   onSignIn = (googleUser) => {
    this.showUserName(googleUser)
    this.setState({
      visible:true
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
  }

  render() {
    return (
      <div>
        <div id="my-signin2" className={this.state.visible? 'hidden':''}></div>
        <p>{this.state.username}</p>
        <button onClick={this.signOut} className={this.state.visible? '':'hidden'}>LogOut</button>
      </div>
    );
  }
}

export default App;

export const getUserInfo = (googleUser) => {
  const profile = googleUser.getBasicProfile()
  const imageUrl = profile.getImageUrl()
  const username = profile.getName()
  return { imageUrl, username }
}

const renderSignInButton = (onSignIn) => {
  window.gapi.signin2.render('google-signin-button', {
    'scope': 'https://www.googleapis.com/auth/plus.login',
    'width': 250,
    'height': 50,
    'longtitle': true,
    'margin-left': 100,
    'onsuccess': onSignIn
  })
}

export const authorize = (onSignIn) => {
  window.gapi.load("client:auth2", () => {
    window.gapi.auth2.init({client_id: '370428235529-6a542uppjqph0jhgaa1n8vhihmb77c8r.apps.googleusercontent.com'})
    window.gapi.auth2.getAuthInstance().then((auth) => {
      if (auth.isSignedIn.get()) {
        onSignIn(auth.currentUser.get())
      } else {
        renderSignInButton(onSignIn)
      }
    })
  })
}

export const signOut = () => {
  return window.gapi.auth2.getAuthInstance().signOut()
}

export const getUserName = (googleUser) => {
  var profile = googleUser.getBasicProfile()
  return profile.getName()
}

export const getImageUrl = (googleUser) => {
  var profile = googleUser.getBasicProfile()
  return profile.getImageUrl()
}

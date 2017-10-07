'use strict'

const getUserRating = (user) => {
  if (user.panStatus === 'verified' && user.aadhaarStatus === 'verified' && user.licenseStatus === 'verfied') {
  user.rating = 9
  user.isVerified = true
} else if ((user.panStatus === 'verified' && user.aadhaarStatus === 'verified') || (user.licenseStatus === 'verified' && user.aadhaarStatus === 'verified') || (user.panStatus === 'verified' && user.licenseStatus === 'verified')) {
  user.rating = 6
  user.isVerified = false
} else if (user.panStatus === 'verified' || user.aadhaarStatus === 'verified' || user.licenseStatus === 'verified') {
  user.rating = 3
  user.isVerified = false
} else {
  user.rating = 0
  user.isVerified = false
}
return user
}

module.exports = {
  getUserRating
}
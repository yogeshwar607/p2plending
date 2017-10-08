function main() {

  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  web3.version.getNetwork((err, netId) => {
    switch (netId) {
      case "1":
        console.log('This is mainnet')
        break
      case "2":
        console.log('This is the deprecated Morden test network.')
        break
      case "3":
        console.log('This is the ropsten test network.')
        break
      default:
        console.log('This is an unknown network.')
    }
  })

  var address = constant.User.owner
  web3.eth.defaultAccount = web3.eth.accounts[0]
  var currentAccount = web3.eth.accounts[0]
  console.log(currentAccount)


  var LenderContract = web3.eth.contract(constant.lenderContract.ABI)
  var lenderContract = LenderContract.at(constant.lenderContract.newAddress)


  function getString(hex) {
    return web3.toAscii(hex).replace(/\u0000/ig, '')
  }

  // signUp
  function sugnUp() {
    lenderContract.createEntity(0, currentAccount, 'A12345', (err, res) => {
      if (err) {
        console.log(err.message)
        return false
      }
      return true
    })
  }

  function enable() {
    lenderContract.enableEntity(currentAccount, (err, res) => {
      if (err) {
        console.log(err.message)
        return false
      }
      console.log('enabled')
      return true
    })
  }

  function getEntity() {
    lenderContract.getEntity(currentAccount, (err, res) => {
      if (err) {
        console.log(err.message)
        return false
      }
      return true
    })
  }

  function setRateAndDays(roi, period) {
    lenderContract.setRateAndDays(currentAccount, roi, period, (err, res) => {
      if (err) {
        console.log(err.message)
        return false
      }
      return true
    })
  }

  function increaseRating(amount) {
    lenderContract.increaseRating(currentAccount, amount, (err, res) => {
      if (err) {
        console.log(err.message)
        return false
      }
      return true
    })
  }

  function decreaseRating(amount) {
    lenderContract.decreaseRating(currentAccount, amount, (err, res) => {
      if (err) {
        console.log(err.message)
        return false
      }
      return true
    })
  }


  // @Owner
  function lend(lender, borrower, value) {
    lenderContract.lend(lender, borrower, value, (err, res) => {
      if (err) {
        console.log(err.message)
        return false
      }
      return true
    })
  }

  // @Owner
  function addBalance(account, value) {
    lenderContract.addBalance(account, value, (err, res) => {
      if (err) {
        console.log(err.message)
        return false
      }
      return true
    })
  }
  return { sugnUp, enable, getEntity, setRateAndDays, increaseRating, decreaseRating, lend, currentAccount}
}
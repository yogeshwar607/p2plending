var constant = {
  User: {
    owner: '0x4dC0524eb710c57eDd2E23394C992473D2A20327',
    lender: '0x4BE8905f649dBFA3fC5C57c0b367538E23Cd7e9f',
    borrower: '0xfd2407f39D8fD81b8554da9d4886a791e41C2675',
  },
  RPC: {
    local: 'http://localhost:8545',
  },
  lenderContract: {
    ABI: [{ "constant": false, "inputs": [{ "name": "_lender", "type": "address" }, { "name": "_borrower", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "lend", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "entities", "outputs": [{ "name": "name", "type": "uint8" }, { "name": "account", "type": "address" }, { "name": "identificationNumber", "type": "bytes32" }, { "name": "rating", "type": "uint256" }, { "name": "roi", "type": "uint256" }, { "name": "period", "type": "uint256" }, { "name": "isActive", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_account", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "addBalance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_account", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "decreaseRating", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_type", "type": "uint8" }, { "name": "_account", "type": "address" }, { "name": "_idNo", "type": "bytes32" }], "name": "createEntity", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_account", "type": "address" }], "name": "getEntity", "outputs": [{ "name": "", "type": "uint8" }, { "name": "", "type": "address" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_account", "type": "address" }, { "name": "roi", "type": "uint256" }, { "name": "period", "type": "uint256" }], "name": "setRateAndDays", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_account", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "increaseRating", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_account", "type": "address" }], "name": "enableEntity", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
    // Address: '0xa2999e0576390d9994e42578C165602d5396aB77',
    newAddress: '0x3342ad4bb1d97821d6cc7d05fa36c42890097997'
  }
}
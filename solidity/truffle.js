module.exports = {
  networks: {
    testrpc: {
      host: "localhost",
      port: 8545,
      network_id: "10",
      gas: 3000000 // Match network id = 10
    },

    testnet: {
      host: "localhost",
      port: 8545,
      network_id: "3",
      gas: 3000000 // Match network id = 3
    },

    dev: {
      host: "localhost",
      port: 8545,
      network_id: "1",
      gas: 3000000 // Match network id = 1
    }
  }
};

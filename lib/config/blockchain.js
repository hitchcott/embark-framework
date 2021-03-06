var readYaml = require('read-yaml');

BlockchainConfig = function() {};

BlockchainConfig.prototype.loadConfigFile = function(filename) {
  try {
    this.blockchainConfig = readYaml.sync(filename);
  } catch (e) {
    throw new Error("error reading " + filename);
  }
  return this;
};

BlockchainConfig.prototype.loadConfig = function(config) {
  this.blockchainConfig = config;
  return this;
};

BlockchainConfig.prototype.config = function(env) {
  if (this.blockchainConfig === null) {
    throw new Error("no blockchain config found");
  }

  var config = this.blockchainConfig[env || "development"];

  var networkId;
  if (config.network_id === undefined) {
    networkId = Math.floor((Math.random() * 100000) + 1000);
  }
  else {
    networkId = config.network_id;
  }

  config = {
    rpcHost: config.rpc_host,
    rpcPort: config.rpc_port,
    gasLimit: config.gas_limit || 500000,
    gasPrice: config.gas_price || 10000000000000,
    rpcWhitelist: config.rpc_whitelist,
    minerthreads: config.minerthreads,
    genesisBlock: config.genesis_block,
    datadir: config.datadir,
    networkId: networkId,
    maxPeers: 4,
    port: config.port || "30303",
    console_toggle: config.console || false,
    mine_when_needed: config.mine_when_needed || false,
    whisper: config.whisper || false,
    account: config.account
  }

  return config;
};

module.exports = BlockchainConfig;

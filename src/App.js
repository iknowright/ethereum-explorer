import React from 'react';
import Web3 from 'web3';

import logo from './logo.png';
import './App.css';

const provider = 'https://mainnet.infura.io/v3/95ddb76135024471a15efebe034aa17f'; //Your Infura Endpoint
let web3Provider = new Web3.providers.HttpProvider(provider);
let web3 = new Web3(web3Provider);

function App() {
  return (
    <div className="App">
      <img src={logo} className="Ethereum-logo" alt="logo" width="100" height="100"/>
      <h1 class="text-">Blockchain Explorer</h1>
      <NetworkId />
      <PeerCount />
      <Stats />
      <h3> Latest 20 blocks </h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">TxHash</th>
            <th scope="col">Block</th>
            <th scope="col">Timestamp</th>
            <th scope="col">Gas Used</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
}

class NetworkId extends React.Component {
  constructor(props) {
    super(props);
    this.state = { networkId: 0 };
  }

  componentDidMount() {
    web3.eth.net.getId().then((networkId) => {
      this.setState(() => ({ networkId: networkId }))
    });
  }

  render() {
    return (
      <p><span>Network ID: </span><span>{this.state.networkId}</span></p>
    );
  }
}

class PeerCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { peerCount: 0 };
  }

  componentDidMount() {
    web3.eth.net.getPeerCount().then((peerCount) => {
      this.setState(() => ({ peerCount: peerCount }))
    });
  }

  render() {
    return (
      <p><span>Peer Count: </span><span>{this.state.peerCount + 1}</span></p>
    );
  }
}

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBlockNumber: 0,
      transactionCount: 0,
      timeTaken: 0,
      tps: 0,
      gasPrice: 0,
    };
  }

  async getEthStats() {
    const gasPrice = await web3.eth.getGasPrice(); //average gas price
    const currentBlock = await web3.eth.getBlock("latest");
    let result = null;
    if (currentBlock.number !== null) { //only when block is mined not pending
      const previousBlock = await web3.eth.getBlock(currentBlock.parentHash);
      if (previousBlock.number !== null) {
        const timeTaken = currentBlock.timestamp - previousBlock.timestamp;
        const transactionCount = currentBlock.transactions.length;
        const tps = transactionCount / timeTaken;
        result = { currentBlockNumber: currentBlock.number, transactionCount, timeTaken, tps, gasPrice }
      }
    }
    return result;
  }

  async calculateStat() {
    let result = await this.getEthStats();
    this.setState(() => ({
      currentBlockNumber: result.currentBlockNumber,
      transactionCount: result.transactionCount,
      timeTaken: result.timeTaken,
      tps: result.tps,
      gasPrice: result.gasPrice,
    }));
  }

  componentDidMount() {
    this.calculateStat();
    this.interval = setInterval(() => this.calculateStat(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <p>
        Current Block #{this.state.currentBlockNumber}: {this.state.transactionCount} in {this.state.timeTaken} seconds at the rate of {this.state.tps} transactions/seconds. The average gas price is {this.state.gasPrice} wei.
      </p>
    );
  }
}

export default App;

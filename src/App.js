import React from 'react';
import PropTypes from 'prop-types';

// UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Web3
import Web3 from 'web3';

// Local
import logo from './logo.png';
import './App.css';

const provider =
  'https://mainnet.infura.io/v3/95ddb76135024471a15efebe034aa17f'; //Your Infura Endpoint
let web3Provider = new Web3.providers.HttpProvider(provider);
let web3 = new Web3(web3Provider);

function App() {
  return (
    <div className="App">
      <img
        src={logo}
        className="Ethereum-logo"
        alt="logo"
        width="100"
        height="100"
        display="block"
        margin-left="auto"
        margin-right="auto"
      />
      <h1 style={{textAlign: "center"}}>Blockchain Explorer</h1>
      <NetworkId />
      <PeerCount />
      <Stats />
      <h3 style={{textAlign: "center"}}> Latest 20 blocks </h3>
      <TransactionTableHook />
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
      this.setState(() => ({ networkId: networkId }));
    });
  }

  render() {
    return (
      <p>
        <span>Network ID: </span>
        <span>{this.state.networkId}</span>
      </p>
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
      this.setState(() => ({ peerCount: peerCount }));
    });
  }

  render() {
    return (
      <p>
        <span>Peer Count: </span>
        <span>{this.state.peerCount + 1}</span>
      </p>
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
    const currentBlock = await web3.eth.getBlock('latest');
    let result = null;
    if (currentBlock.number !== null) {
      //only when block is mined not pending
      const previousBlock = await web3.eth.getBlock(currentBlock.parentHash);
      if (previousBlock.number !== null) {
        const timeTaken = currentBlock.timestamp - previousBlock.timestamp;
        const transactionCount = currentBlock.transactions.length;
        const tps = transactionCount / timeTaken;
        result = {
          currentBlockNumber: currentBlock.number,
          transactionCount,
          timeTaken,
          tps,
          gasPrice,
        };
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
        Current Block #{this.state.currentBlockNumber}:{' '}
        {this.state.transactionCount} in {this.state.timeTaken} seconds at the
        rate of {this.state.tps} transactions/seconds. The average gas price is{' '}
        {this.state.gasPrice} wei.
      </p>
    );
  }
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(txHash, block, timestamp, gasUsed) {
  return { txHash, block, timestamp, gasUsed };
}

function TransactionTableHook() {
  const classes = useStyles();
  return <TransactionTable hookStyle={classes.table}></TransactionTable>;
}

class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
  }

  componentDidMount() {
    web3.eth.getBlockNumber().then((latestBlock) => {
      console.log(latestBlock);
      let rows = [];
      for (let i = 0; i < 20; i++) {
        web3.eth.getBlock(latestBlock - i).then((block) => {
          const number = block.number;
          const hash = block.hash;
          const blockTime = block.timestamp;
          const gas = block.gasUsed;
          rows.push(createData(hash, number, blockTime, gas));
          this.setState(() => ({ rows: rows }));
        });
      }
    });
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table className={this.props.hookStyle} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction Hash</TableCell>
              <TableCell align="right">Block</TableCell>
              <TableCell align="right">Timestamp</TableCell>
              <TableCell align="right">Gas Used&nbsp;(wei)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <TableRow key={row.txHash}>
                <TableCell component="th" scope="row">
                  {row.txHash}
                </TableCell>
                <TableCell align="right">{row.block}</TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
                <TableCell align="right">{row.gasUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

TransactionTable.propTypes = {
  hookStyle: PropTypes.any,
};

export default App;

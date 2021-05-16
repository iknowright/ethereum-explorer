import React from 'react';

// UI
import { ChakraProvider } from "@chakra-ui/react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Image,
  Container,
  Heading,
  Spacer,
  Flex,
  Box,
} from "@chakra-ui/react"

// Web3
import Web3 from 'web3';

// Local
import logo from './logo.png';
import './App.css';

const provider = process.env.REACT_APP_BLOCKCHAIN_ENDPOINT;
let web3Provider = new Web3.providers.HttpProvider(provider);
let web3 = new Web3(web3Provider);

function App() {
  return (
    <ChakraProvider>
      <Container maxW="xl" centerContent>
        <Image
          boxSize="100px"
          objectFit="cover"
          src={logo}
          alt="logo"
        />
        <Heading as="h1" size="xl">
          Blockchain Explorer
        </Heading>
        <Flex>
          <NetworkId />
          <Spacer />
          <PeerCount />
        </Flex>
        <Stats />
      </Container>
      <div className="App">
        <TransactionTable />
      </div>
    </ChakraProvider>
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
      <Box p="2">
        <span>Network ID: </span>
        <span>{this.state.networkId}</span>
      </Box>
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
      <Box p="2">
        <span>Peer Count: </span>
        <span>{this.state.peerCount + 1}</span>
      </Box>
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

function createData(txHash, block, timestamp, gasUsed) {
  return { txHash, block, timestamp, gasUsed };
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
      <Table variant="simple">
        <TableCaption>Latest 20 Blocks</TableCaption>
        <Thead>
          <Tr>
            <Th>Transaction Hash</Th>
            <Th align="right">Block</Th>
            <Th align="right">Timestamp</Th>
            <Th align="right">Gas Used&nbsp;(wei)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {this.state.rows.map((row) => (
            <Tr key={row.txHash}>
              <Td component="th" scope="row">
                {row.txHash}
              </Td>
              <Td align="right">{row.block}</Td>
              <Td align="right">{row.timestamp}</Td>
              <Td align="right">{row.gasUsed}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
}

export default App;

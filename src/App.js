import Web3 from 'web3';

import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={logo} className="Ethereum-logo" alt="logo" />
      <h1 class="text-">Blockchain Explorer</h1>
      <p class="text-left"><span>Network ID: </span><span class="networkId"></span></p>
      <p class="text-left"><span>Peers: </span><span class="peerCount"></span></p>
      <p class="text-left stats"></p>
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

export default App;

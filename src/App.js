import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import ABI from './ABI.json';
import Web3 from 'web3';

const ADDRESS = '0x38ac452166A993A4031172c6802923DaA4215796';

function App() {
  const mintAmountRef = useRef(1);
  const [address, setAddress] = useState('');
  const [contract, setContract] = useState(null);
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install Metamask wallet');
      return;
    }
    let web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);

    setContract(new web3.eth.Contract(ABI, ADDRESS));
  };

  const mint = async () => {
    if (window.ethereum && address) {
      const mintAmount = Number(mintAmountRef.current.value);
      if (mintAmount > 0 && mintAmount < 6) {
        const mintRate = await contract.methods.cost().call();
        const totalAmount = mintAmount * mintRate;
        contract.methods
          .mint(address, mintAmount)
          .send({ from: address, value: String(totalAmount) });
      }
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center text-center mt-5">
        <form className="col-lg-6 shadow p-3 mb-5 bg-white rounded">
          <h4>Mint Portal</h4>
          <h5>Please connect your wallet</h5>
          {!address && <Button onClick={connectWallet}>Connect Wallet</Button>}
          <div className="my-3 card gap-3">
            <label>{address ? address : 'Wallet Address'}</label>
            <input
              ref={mintAmountRef}
              className="mx-2"
              type="number"
              defaultValue={1}
              min={1}
              max={5}
            /> 
            <label>Please select the number of NFTs to mint (1-5)</label>
            <Button onClick={mint}>Mint</Button>
          </div>
          <label>Price 0.05 ETH each mint</label>
        </form>
      </div>
    </div>
  );
}

export default App;

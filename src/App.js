import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install Metamask wallet');
      return;
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(accounts);
  };

  return (
    <div className="container">
      <div className="row justify-content-center text-center mt-5">
        <form className="col-lg-6 shadow p-3 mb-5 bg-white rounded">
          <h4>Mint Portal</h4>
          <h5>Please connect your wallet</h5>
          <Button onClick={connectWallet}>Connect Wallet</Button>
          <div className="my-3 card gap-3">
            <label>Wallet Address</label>
            <input
              className="mx-2"
              type="number"
              defaultValue={1}
              min={1}
              max={5}
            />
            <label>Please select the number of NFTs to mint</label>
            <Button>Mint</Button>
          </div>
          <label>Price 0.05 ETH each mint</label>
        </form>
      </div>
    </div>
  );
}

export default App;

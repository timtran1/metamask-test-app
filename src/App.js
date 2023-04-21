import MetaMaskSDK from '@metamask/sdk';
import {useState, useEffect} from 'react';

const options = {
    injectProvider: false,
    communicationLayerPreference: 'webrtc',
};
const MMSDK = new MetaMaskSDK(options);
const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

// import Web3 from 'web3';
// const web3 = new Web3(ethereum);

function App() {
    const [account, setAccount] = useState(null);
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        if (account) getNFTs()
    }, [account])

    async function connect() {
        const accounts = await ethereum.request({method: 'eth_requestAccounts',})
        console.log({accounts})
        setAccount(accounts[0])
    }

    async function getNFTs() {
        const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${account}`)
        const resp = await res.json()
        setNfts(resp.assets)
    }

    return (
        <div className={`text-center p-10`}>
            <h1 className={`font-bold text-3xl my-4`}>YoloYolo Test Page</h1>
            {account ?
                <div>
                    <p><span className={`font-bold`}>Connected Account:</span> {account}</p>
                    <div>
                        <h2 className={`font-bold`}>My NFTs</h2>
                        <div className={`flex items-center gap-4`}>
                            {nfts.map((nft, i) => (
                                <div key={i}>
                                    <img src={nft.image_preview_url} alt={nft.name} className={`w-full`}/>
                                    <p>{nft.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                :
                <div>
                    <button
                        className={`p-2 bg-black text-white rounded shadow cursor-pointer hover:-translate-y-0.5 transition-all duration-150`}
                        onClick={connect}
                    >
                        Connect Metamask wallet
                    </button>
                </div>
            }
        </div>
    );
}

export default App;

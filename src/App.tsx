import React from 'react';
import logo from './logo.svg';
import './App.css';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Fingerprint2 from 'fingerprintjs2';

function App() {
    const [fpHash, setFpHash] = React.useState('');
    const [fpHash2, setFpHash2] = React.useState('');
    React.useEffect(() => {
        async function getFpHash() {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            const visitorId = result.visitorId;
            setFpHash(visitorId);
        }

        getFpHash();
    }, []);

    React.useEffect(() => {
        async function getFpHash2() {
            const result = await Fingerprint2.getPromise();
            const values = result.map((component: { value: any; }) => component.value);
            const murmur = Fingerprint2.x64hash128(values.join(''), 31);
            setFpHash2(murmur);
        }

        getFpHash2();
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p className="App-link">
                    <h1> Fingerprint1 : {fpHash} </h1>
                    <h1> Fingerprint2 : {fpHash2} </h1>
                </p>
            </header>
        </div>
    );
}

export default App;

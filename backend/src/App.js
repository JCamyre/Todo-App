import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';




function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('api/').then((res) => {
      if (res) {
        setData(res);
      }
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>
          {!data ? "loading" : data}
        </h1>
      </header>
    </div>
  );
}

export default App;

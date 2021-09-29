import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';




function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('api/').then((res) => {
      if (res) {
        setData(res['data']);
        console.log(res['data']);
      }
    })
  }, []);

  return (
    <div className="App">
      <form method="POST" action="/api/upload" enctype="multipart/form-data">
        <input type="file" name="profilePicture" />
        <input type='file' name='name' />
        <input type='file' name='bio' />
        <input type='submit' />
      </form>
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
          {!data ? "loading" : data['message']}
        </h1>
      </header>
    </div>
  );
}

export default App;

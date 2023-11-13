import React from 'react';
import logo from './logo.svg';
import './App.css';
import Comp from './Comp';
import FileUpload from './Components/FileUpload';

import { BrowserRouter as Router, Route} from 'react-router-dom';
// import DownloadPage from './pages/DownloadPage';

// import DownloadButton from './Components/DownloadButton';
// import DownloadPage from './DownloadPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <Comp />
        <FileUpload />
        

        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>



        
      </header>

    </div>
  );
}

export default App;

import React from 'react';
import './DownloadButton.css';
import backgroundImg from './cherimage.jpg';

function DownloadButton() {

    //link to the server generated link to file
    const dLink = "https://imgix.bustle.com/uploads/image/2023/10/3/72cb01d4-a1e5-42f6-99d9-71958ca19eed-cher_4.jpg?w=864&h=658&fit=crop&crop=focalpoint&auto=format%2Ccompress&fp-x=0.4975&fp-y=0.3539"

    
    return (
      <div className="container">
        <div className="left-column">
          <img src={backgroundImg} alt="./cherimage.jpg" className="left-image"/>
      
              
  
        </div>

        <div className="right-column"> 
        
          <div className="download-container">
            <div className="download-info">
              <h2> DOWNLOAD TITLE</h2>
              
              <div className="download-details">
                <ul>DOWNLOAD DESCRIPTION- </ul>
              
                <ul>possibly file details(size/type/etc),   </ul>
                <ul>time left to download?,</ul>
                <ul>sender if applicable,</ul>
                <ul>hash key</ul>
              </div>
              
            </div>
            <a href={dLink} className="download-button" download>
              Download
            </a>
          </div>
        </div>

      </div>
        
      );
    }
    
    export default DownloadButton;
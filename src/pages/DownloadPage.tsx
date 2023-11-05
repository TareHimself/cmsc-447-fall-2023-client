import React from 'react';
import DownloadButton from '../Components/DownloadButton';
import {Link} from 'react-router-dom';

function DownloadPage() {
    // const dTitle: string = 'DOWNLOAD TITLE'
    // const dDescription: string = 'DOWNLOAD DESCRIPTION - I.E. TIME LEFT, AUTHOR (IF APPLICABLE), SIZE ETC'
  return (
    <body>
      <div className="DownloadPage">
        <Link to ="/download">"Open Download PAge</Link>
        
        {/* <h1>Download Page - prob download title</h1> */}

        <DownloadButton/>
        {/* <DownloadButton dlTitle = {dTitle} dlDescription={dDescription} /> */}
    
      </div>
    </body>
  );
}

export default DownloadPage;

import React, {useEffect, useState, useRef} from 'react'

import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from "./pages/HomePage.js"

function App(){
    return(
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
           
          </ul>
        </nav>
      
        <Routes>
          <Route path="/" element={<Home />}/>

          
        </Routes>
      
      </>
  
    )
  
  }
  
  export default App;

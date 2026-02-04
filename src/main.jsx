import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import React from 'react';
import ReactDom from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

ReactDom.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <HashRouter>
    <App />
  </HashRouter>

)

import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './style.css'
import OrganizerEvents from './organizer-events';
import './index.css';


render(
  <Router>
    <Routes>
      <Route path="/" element={<OrganizerEvents/>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

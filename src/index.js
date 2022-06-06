import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css';
import Events from './Events';

render(
  <Router>
    <Routes>
      <Route path="/Events" element={<Events/>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

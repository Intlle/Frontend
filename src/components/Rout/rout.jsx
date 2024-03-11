import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nodes from './Nodes.jsx';
import Card from './Card.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/nodes" element={<Nodes />} />
        <Route path="/card" element={<Card/>} />
      </Routes>
    </Router>
  );
}

export default App;
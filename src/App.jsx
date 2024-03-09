import React from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Nodes } from './pages/Nodes.jsx';
import { Card } from './pages/Card.jsx';

function App() {
    return (
        <Routes>
            <Route index element={<Nodes />} />
            <Route path="card" element={<Card />} />
        </Routes>
    )
}

export default App;
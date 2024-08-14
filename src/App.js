import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PricePage from './components/PricePage';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PricePage />} />
            </Routes>
        </Router>
    );
}

export default App;

import React from 'react';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Explore from './Pages/Explore';

const App: React.FC = () => {  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Explore />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;


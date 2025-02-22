import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import Messages from './Pages/Messages';
import Notifications from './Pages/Notifications';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Explore />} />
          <Route path='messages' element={<Messages/>}/>
          <Route path='notifications'element={<Notifications/>}/>
        </Route>
      </Routes>
    </Router>
  );
};
export default App;

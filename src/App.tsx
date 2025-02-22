import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
<<<<<<< HEAD
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import Messages from './Pages/Messages';
import Notifications from './Pages/Notifications';
=======
import Explore from './Pages/Explore';
>>>>>>> c1fdd3a558b86d4208cbdb6d9d21167914ae4bbf


const App: React.FC = () => {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Explore />} />
          <Route path='messages' element={<Messages/>}/>
          <Route path='notifications'element={<Notifications/>}/>
        </Route>
      </Routes>
=======
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Explore />} />
        </Routes>
      </Layout>
>>>>>>> c1fdd3a558b86d4208cbdb6d9d21167914ae4bbf
    </Router>
  );
};
export default App;

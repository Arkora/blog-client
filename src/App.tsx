import React from 'react'
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Newpost from './pages/Newpost';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Profile from './pages/Profile';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/newpost' element={<Newpost />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
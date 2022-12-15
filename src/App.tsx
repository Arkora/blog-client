import React from 'react'
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Newpost from './pages/Newpost';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Post from './pages/Post';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/newpost' element={<Newpost />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/post/:id' element={<Post />} />
      </Routes>
    </Router>
  )
}

export default App
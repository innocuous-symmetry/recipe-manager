import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Browser from './components/pages/Browser';
import Collection from './components/pages/Collection';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Recipe from './components/pages/Recipe';
import Register from './components/pages/Register';
import Welcome from './components/pages/Welcome';
import { useAuthContext } from './context/AuthContext';
import './sass/App.scss'

function App() {
  const authContext = useAuthContext();

  useEffect(() => {
    console.log(fetch("http://localhost:8080/auth").then(res => res.json()).then(x => console.log(x)));
  })

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/"               element={<Welcome />} />
          <Route path="/register"       element={<Register />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/profile"        element={<Profile />} />
          <Route path="/collection"     element={<Collection />} />
          <Route path="/explore"        element={<Browser />} />
          <Route path="/recipe/:id"     element={<Recipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

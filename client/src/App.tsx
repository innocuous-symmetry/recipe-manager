import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IUser } from './schemas';
import { checkCredientials } from './util/apiUtils';
import { AuthContext, defaultValue, IAuthContext } from './context/AuthContext';
import Browser from './components/pages/Browser';
import Collection from './components/pages/Collection';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Recipe from './components/pages/Recipe';
import Register from './components/pages/Register';
import Welcome from './components/pages/Welcome';
import './sass/App.scss'

function App() {
  const [user, setUser] = useState<IAuthContext>({ user: undefined });

  useEffect(() => {
    const wrapper = async () => {
      const result: IAuthContext | undefined = await checkCredientials();
      if (result == undefined) setUser({ user: undefined });
      setUser(result!);
    }

    wrapper();
  }, [])

  return (
    <BrowserRouter>
      <AuthContext.Provider value={ user }>
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
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App

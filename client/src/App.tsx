// framework tools and custom utils
import { useCallback, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext, IAuthContext, useAuthContext } from './context/AuthContext';
import { attemptLogout, checkCredientials } from './util/apiUtils';
import { IUser } from './schemas';

// pages, ui, styles
import Subscriptions from './components/pages/Subscriptions/Subscriptions';
import Browser from './components/ui/Browser';
import Collection from './components/pages/Collection';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Recipe from './components/pages/Recipe';
import Register from './components/pages/Register';
import Welcome from './components/pages/Welcome';
import AddRecipe from './components/pages/AddRecipe';
import CollectionBrowser from './components/pages/CollectionBrowser';
import { Navbar } from './components/ui';
import GroceryList from './components/pages/GroceryList';
import GroceryListCollection from './components/pages/GroceryListCollection';
import './sass/App.scss';

function App() {
  const [user, setUser] = useState<any>();
  const parentState = { user, setUser };

  const receiveChange = (() => {});

  useEffect(() => {
    const wrapper = async () => {
      try {
        const result: IAuthContext | undefined = await checkCredientials();
        
        if (result == undefined) {
          setUser({ user: undefined });
        } else {
          setUser(result);
        }
      } catch(e) {
        console.error(e);
      }
    }

    wrapper();
  }, [])

  return (
    <BrowserRouter>
      <AuthContext.Provider value={ parentState }>
        <div className="App">
          <Navbar receiveChange={receiveChange} />
          <Routes>
            <Route path="/"                       element={<Welcome />} />
            <Route path="/register"               element={<Register receiveChange={receiveChange} />} />
            <Route path="/login"                  element={<Login />} />
            <Route path="/profile"                element={<Profile />} />
            <Route path="/collections"            element={<CollectionBrowser />} />
            <Route path="/collections/:id"        element={<Collection />} />
            <Route path="/explore"                element={<Browser header="" searchFunction={() => {}} />} />
            <Route path="/recipe/:id"             element={<Recipe />} />
            <Route path="/subscriptions"          element={<Subscriptions />} />
            <Route path="/subscriptions/:id"      element={<Collection />} />

            <Route path="/add-recipe"             element={<AddRecipe />} />
            <Route path="/grocery-list"           element={<GroceryListCollection />} />
            <Route path="/grocery-list/:id"       element={<GroceryList />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App

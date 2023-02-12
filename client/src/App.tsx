// framework tools and custom utils
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import jwtDecode from 'jwt-decode';

// pages, ui, components, styles
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
import { TokenType } from './util/types';
import './sass/App.scss';

function App() {
  const { setUser, setToken } = useAuthContext();

  useEffect(() => {
    if (document.cookie) {
      const extractedToken: Partial<TokenType> = jwtDecode(document.cookie.split("=")[1]);
      setToken(document.cookie.split("=")[1]);
      setUser(extractedToken.user);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/"                       element={<Welcome />} />
          <Route path="/register"               element={<Register />} />
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
    </BrowserRouter>
  )
}

export default App

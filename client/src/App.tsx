import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/pages/Welcome';
import './sass/App.scss'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

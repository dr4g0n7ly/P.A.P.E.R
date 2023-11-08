import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className='app'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>    
  );
}

export default App;

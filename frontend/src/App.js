import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav';
import Home from './components/Home';
import Model from './components/Model'
import FastAPI from './components/FastAPI';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div className='app'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/model' element={<Model />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>    
  );
}

export default App;

import './App.css';
import {BrowserRouter , Link, NavLink, Switch, Route, Routes,} from 'react-router-dom';
import Home from './pages/index.js'
import Tatacara from './pages/tataCara.js'
import Cektilang from './pages/cekTilang.js'
import React from 'react';

function App() {
  return (
    <div>
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" caseSensitive={false} element={<Home/>}/>
        <Route path="/tatacara" caseSensitive={false} element={<Tatacara />}/>
        <Route path="/cektilang" caseSensitive={false} element={<Cektilang />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
import './App.css';
import {BrowserRouter , Link, NavLink, Switch, Route, Routes,} from 'react-router-dom';
import Home from './pages/index.js'
import Tatacara from './pages/tataCara.js'
import Cektilang from './pages/cekTilang.js'
import React from 'react';
import Login from './pages/login.js'
import Signup from './pages/signup.js'
import DashboardTilang from './pages/dashboard/dashboardTilang.js'
import DashboardMember from './pages/dashboard/dashboardMember.js'

function App() {
  return (
    <div>
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
      <Route path="/auth/login" caseSensitive={false} element={<Login/>}/>
        <Route path="/auth/signup" caseSensitive={false} element={<Signup/>}/>
        <Route path="/" caseSensitive={false} element={<Home/>}/>
        <Route path="/tatacara" caseSensitive={false} element={<Tatacara />}/>
        <Route path="/cektilang" caseSensitive={false} element={<Cektilang />}/>
        <Route path="/admin/tilang" caseSensitive={false} element={<DashboardTilang />}/>
        <Route path="/admin/member" caseSensitive={false} element={<DashboardMember/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
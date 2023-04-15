import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from '../Pages/Home';
import User from '../Pages/User';
import Login from '../Pages/Login';
import History from '../Pages/History';

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/'element={<Home/>}/>
            <Route path='/history'element={<History/>}/>
            <Route path='/user'element={<User/>}/>
            <Route path='/login'element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  );
}

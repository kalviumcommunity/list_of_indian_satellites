import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home'
import Apipage from './components/apipage'
import Mainpage from './components/mainpage'
import Mainpage2 from './components/mainpage2'
import Update from './components/updatepage';
import Edit from './components/editpage'
import Signup from './components/signup';
import Login from './components/login'
import About from './components/about';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/apipage' element={<Apipage/>}></Route>
        <Route path='/mainpage2' element={<Mainpage/>}></Route>
        <Route path='/mainpage' element={<Mainpage2/>}></Route>
        <Route path='/updatesat' element={<Update/>}></Route>
        <Route path='/editsat/:id' element={<Edit/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/about' element={<About/>}></Route>
      </Routes>
    </>
  );
}

export default App;

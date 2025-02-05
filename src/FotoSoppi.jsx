import * as React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route} from 'react-router-dom'


export default function FotoSoppi() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/*<Route path="/login" element={<Login />} />*/}
    </Routes>
  );
}

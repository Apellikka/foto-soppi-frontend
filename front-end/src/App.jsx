import * as React from 'react';
import FotoSoppi from './pages/FotoSoppi';
import Login from './pages/Login';
import { Routes, Route} from 'react-router-dom'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FotoSoppi />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

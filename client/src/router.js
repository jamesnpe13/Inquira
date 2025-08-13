import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<p>Homepage</p>} />
      <Route path='/page1' element={<p>Page 1</p>} />
      <Route path='/page2' element={<p>Page 2</p>} />
      <Route path='/dashboard' element={<p>Dashboard</p>} />
      <Route path='*' element={<p>404 Not found</p>} />
    </Routes>
  );
}

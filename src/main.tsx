import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cursor } from './components/Cursor';
import { GrainCanvas } from './components/GrainCanvas';
import { ScrollManager } from './components/ScrollManager';
import About from './pages/About';
import Home from './pages/Home';
import Work from './pages/Work';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <GrainCanvas opacity={0.03} />
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

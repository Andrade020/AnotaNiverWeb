import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adicionar" element={<Add />} />
        <Route path="/editar/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

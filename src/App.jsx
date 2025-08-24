import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import WritingPage from './pages/WritingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='main' element={<MainPage />} />
        <Route path='write' element={<WritingPage />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
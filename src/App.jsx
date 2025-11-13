import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import WritingPage from './pages/WritingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-md mx-auto shadow-2xl bg-white min-h-screen">
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path='main' element={<MainPage />} />
            <Route path='write' element={<WritingPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    );
}

export default App;
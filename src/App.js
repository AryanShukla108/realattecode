import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ContactPage from './ContactPage';

function App() {
  return (
    <Router>
      <div>
        <div className='nav-hh'>
          <div className='navhead' onClick={() => (window.location.href = '/')}>Video Games</div>
          <div className='navhead' onClick={() => (window.location.href = 'contact')}>Contact</div>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;

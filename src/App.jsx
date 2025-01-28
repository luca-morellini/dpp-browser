import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import QrReader from './pages/QrReader';
import Contact from './pages/Contact';
import Dpp from './pages/DPP';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/qr-reader" element={<QrReader />} />
          <Route path="/dpp" element={<Dpp />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

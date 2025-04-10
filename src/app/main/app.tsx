import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import RootPage from './root';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RootPage/>} />
          <Route path="/mixer" element={<div>Mixer Page</div>} />
          <Route path="/pianoroll" element={<div>Piano Roll Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

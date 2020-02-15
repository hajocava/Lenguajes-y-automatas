import React from 'react';
import Navbar from './components/Navbar'
import Trees from './views/Trees'
import RegExp from './views/RegExpresions'
import Analyzer from './views/Analyzer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Trees />
        <hr className="mt-5" />
        <RegExp />
        <hr className="mt-5" />
        <Analyzer />
      </main>
    </div>
  );
}

export default App;

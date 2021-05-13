import React from 'react';
import axios from 'axios'
import { from, of } from 'rxjs';
import { count, filter } from 'rxjs/operators';
import Navigation from './components/Navigation';
import SearchPage from './components/SearchBar';
import Countries from './components/Countries';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  
  return (
    <>
      <Navigation />
      <main>
        <br />
        <Countries />
        <pre>
          TESTING
        </pre>
      </main>
      <Footer />
    </>
  );
}

export default App;

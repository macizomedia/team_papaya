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
  const [data, setData] = useState([]);
  const [country, setCountry] = useState({})
     
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setData(res.data);
    });
  }, []);
  const handleClick = (() => {
    const countries = from(data)
    let country = countries.pipe(filter(c => c.name === 'Brazil'))
    country.subscribe(selected => console.log(selected)) 
  })
  return (
    <>
      <Navigation />
      <main>
        <br />
        <Countries />
        <SearchPage />
        <pre>
          TESTING
        </pre>
        <input type="button" value="Chile" onClick={handleClick} />
      </main>
      <Footer />
    </>
  );
}

export default App;

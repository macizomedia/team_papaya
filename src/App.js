import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <>
      <Navigation />
      <main>
        <h1>Create React App + Go API</h1>
        <h2>
          Deployed with{' '}
          <a
            href="https://vercel.com/docs"
            target="_blank"
            rel="noreferrer noopener"
          >
            Vercel
          </a>
          !
        </h2>
        <p>
          <a
            href="https://github.com/vercel/vercel/tree/main/examples/create-react-app"
            target="_blank"
            rel="noreferrer noopener"
          >
            This project
          </a>{' '}
          was bootstrapped with{' '}
          <a href="https://facebook.github.io/create-react-app/">
            Create React App
          </a>{' '}
          and contains three directories, <code>/public</code> for static assets,{' '}
          <code>/src</code> for components and content, and <code>/api</code>{' '}
          which contains a serverless <a href="https://golang.org/">Go</a>{' '}
          function. See{' '}
          <a href="/api/date">
            <code>api/date</code> for the Date API with Go
          </a>
          .
        </p>
        <br />
      </main>
      <Footer />
    </>
  );
}

export default App;

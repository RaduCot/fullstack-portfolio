import logo from './logo.svg';
import './App.css';
import React from 'react';
import Portfolio from './components/Portfolio';
import emblem from './assets/emblem.svg';

function App() {
  return (
    <div className="App font-sans">
      <Portfolio />
      <footer className="relative bg-neutral-900 text-white py-4">
        <div className="relative font-justSans text-sm container mx-auto px-4 text-center">
          <p className="">
            &copy; 2024{" "}
            <img
              src={emblem}
              alt="emblem"
              className="h-[1em] inline-block mb-0.5"
            />{" "}
            Cotorceanu Radu | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

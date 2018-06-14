import React, { Component } from 'react';
import Navbar from './components/navbar/navbar'
import Tabla from './components/tabla/tabla'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="bg-light">

        <header>
          <Navbar />
        </header>

        <div className="container">
          <Tabla />
        </div>
      </div>
    );
  }
}

export default App;

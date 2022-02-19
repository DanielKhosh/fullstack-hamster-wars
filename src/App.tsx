import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import './App.css';
import Start from './components/Start/Start'
import Play from './components/Play/Play'
import HamsterGallery from './components/Gallery/HamsterGallery'

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <header>
            <h1>Hamster-Wars</h1>
            <nav className="navMenu">
              <Link to="/">Start</Link>
              <Link className="playButton" to="/play">Play</Link>
              <Link to="/gallery">Gallery</Link>
            </nav>            
        </header>
        
        <main>
          <Switch>
            <Route path="/" exact><Start/></Route>
            <Route path="/play"><Play/></Route>
            <Route path="/gallery" ><HamsterGallery/></Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;

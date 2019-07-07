import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import home from './components/home'

import Dashboard from './components/dashboard';

const url='https://search-transcricaohackathon-mdaj6mpvrrijdhusq2ngyfk2xe.sa-east-1.es.amazonaws.com/vitorioso/_search?q=conteudo:'


function App() {
  return (
    <div className="App">
        <Router>
          <Route exact path='/home' component={home} />
          {/* <Route exact path={url} component={Dashboard}/> */}
          <Route exact path= "/dashboard/:searchWord" component={Dashboard}/>
        </Router>
    </div>
  );
}

export default App;

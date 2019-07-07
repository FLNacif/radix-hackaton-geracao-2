import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import OperadorEngie from './components/operador_engie';
import OperadorCOS from './components/operador_cos';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path='/engie/:usina' component={OperadorEngie} />
          <Route exact path= '/cos' component={OperadorCOS}/>
        </Router>
    </div>
  );
}

export default App;

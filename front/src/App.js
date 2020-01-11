import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClienteList from './components/ClienteList';
import ClienteEdit from './components/ClienteEdit';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/clientes' exact={true} component={ClienteList}/>
          <Route path='/clientes/:id' component={ClienteEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;


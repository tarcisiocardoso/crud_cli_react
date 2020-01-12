import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClienteList from './components/ClienteList';
import ClienteEdit from './components/ClienteEdit';
import LoginComponent from './components/LoginComponent';
import { CookiesProvider } from 'react-cookie';



class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/clientes' exact={true} component={ClienteList} />
            <Route path='/clientes/:id' component={ClienteEdit} />
            <Route path='/login' component={LoginComponent} />
          </Switch>
        </Router>
      </CookiesProvider>
    )
  }
}

export default App;


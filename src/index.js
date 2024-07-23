import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Playlists from './pages/Playlists';
import ProtectedRoute from './components/ProtectedRoute';

ReactDOM.render(
  <ChakraProvider>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/playlists" component={Playlists} />
      </Switch>
    </Router>
  </ChakraProvider>,
  document.getElementById('root')
);



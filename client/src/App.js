import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { getUserCookie } from './cookie';
import PrivateRoute from './components/PrivateRoute';

import Main from './components/layout';
import LoginPage from './components/loginPage';
import './App.css';

const token = getUserCookie('token');

const isAuthenticated = !!token;

function App() {
    return (
      <Router>
        <div className="App">
          <div className="app-container">
            <Route
              exact
              path="/login"
              component={LoginPage}
            />
            <Switch>
              <PrivateRoute
                exact
                path="/"
                isAuthenticated={isAuthenticated}
                component={Main}
              />
            </Switch>
          </div>
        </div>
    </Router>
    );
}

export default App;

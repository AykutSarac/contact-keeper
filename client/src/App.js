import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import { Fragment } from 'react'
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';



function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;

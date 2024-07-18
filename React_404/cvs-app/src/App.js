import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/member/Home';
import Login from './components/member/login/login';
import Signup from './components/member/signup/signup';
import Update from './components/member/update/update';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/update" component={Update} />
            </Switch>
        </Router>
    );
}

export default App;

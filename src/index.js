import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import NewsList from './components/news/NewsList';
import App from './App';
import Login from './Login';
import SprintIndex from './components/sprint/SprintIndex';
import Sprint from './components/sprint/Sprint';
import Issue from './components/issue/Issue';

import './App.css'

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';




ReactDOM.render(
    (
        <Router history={browserHistory} >
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/home" component={Home} />
                <Route path="/news" component={NewsList} />
                <Route path="/sprints" component={SprintIndex}/>
                <Route path="/sprints/:sprintid" component={Sprint}/>
                <Route path="/issues/:issueid" component={Issue}/>
                <Route path="/login" component={Login} />
            </Route>
        </Router>
    ),
    document.getElementById('root')
);
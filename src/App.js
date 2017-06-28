import React from 'react';

import './App.css';

import * as constants from './firebase_utils/constants'
import { logout } from './firebase_utils/auth'
import { Link } from 'react-router';

import Login from './Login';


var App = React.createClass({
    getInitialState() {
        return {
            uid: null
        };
    },
    endSession: function(){
        logout()
    },
    componentDidMount: function() {
        var self = this;
        constants.firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                window.localStorage.setItem(constants.storageKey, user.uid);
                self.setState({uid: user.uid});
            } else {
                window.localStorage.removeItem(constants.storageKey);
                self.setState({uid: null});
            }
        });
    },
    render : function() {
        var user = constants.firebaseAuth.currentUser ? constants.firebaseAuth.currentUser.email : ''
        console.log(user);


        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/home" className="navbar-brand">Neo</Link>
                        </div>

                        {constants.isAuthenticated() ?
                            <ul className="nav navbar-nav pull-right">
                                <li>
                                    <Link to="/news" className="navbar-brand">News</Link>
                                </li>
                                <li>
                                    <Link to="/sprints" className="navbar-brand">Manage</Link>
                                </li>
                                <li className="navbar-brand" onClick={this.endSession}>Logout
                                </li>
                            </ul>
                            :
                            <ul className="nav navbar-nav pull-right">
                                <li>
                                    <Link to="/login" className="navbar-brand">Login</Link>
                                </li>
                            </ul>


                        }

                    </div>
                </nav>
                <div>
                    {constants.isAuthenticated() ?
                        this.props.children :
                        <Login/>
                    }

                </div>
            </div>

        )
    }
});



export default App;

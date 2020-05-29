import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

export default class NavBar extends Component {

    render() {
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <a className="navbar-brand">acnh inventory</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item"><Link to="/" className="nav-link">items</Link></li>
                            <li className="navbar-item"><Link to="/add" className="nav-link">add item</Link></li>
                            <li className="navbar-item"><Link to="/user" className="nav-link">add user</Link></li>
                            <li className="navbar-item"><Link to="/days" className="nav-link">daze</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
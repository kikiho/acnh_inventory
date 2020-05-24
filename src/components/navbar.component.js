import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

    render() {
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">acnh inventory</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item"> <Link to="/" className="nav-link">items</Link></li>
                            <li className="navbar-item"><Link to="/add" className="nav-link">add item</Link></li>
                            <li className="navbar-item"><Link to="/user" className="nav-link">add user</Link></li>
                            <li className="navbar-item"><Link to="/edit" className="nav-link">edit item</Link></li>
                        </ul>
                    </div>

                </nav>
            </div>
        );
    }
}
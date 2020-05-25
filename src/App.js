import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from "./components/navbar.component";
import ItemList from "./components/items-list.component";
import CreateUserComponent from "./components/create-user.component";
import ItemForm from "./components/item-form.component";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/appStyles.css";


function App() {
  return (
    <div className="App">
        <Router>
            <div className="container">
            <NavBar />
            <br/>
            <Route path="/" exact component={ItemList} />
            <Route path="/edit/:id" exact component={ItemForm} />
            <Route path="/add" exact component={ItemForm} />
            <Route path="/user" exact component={CreateUserComponent} />
            </div>
        </Router>
    </div>
  );
}

export default App;

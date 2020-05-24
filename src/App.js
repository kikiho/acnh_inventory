import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar.component";
import ItemList from "./components/items-list.component";
import EditItemComponent from "./components/edit-item.component";
import AddItemComponent from "./components/add-item.component";
import CreateUserComponent from "./components/create-user.component";


function App() {
  return (
    <div className="App">
        <Router>
            <div className="container">
            <NavBar />
            <br/>
            <Route path="/" exact component={ItemList} />
            <Route path="/edit" exact component={EditItemComponent} />
            <Route path="/add" exact component={AddItemComponent} />
            <Route path="/user" exact component={CreateUserComponent} />
            </div>
        </Router>
    </div>
  );
}

export default App;

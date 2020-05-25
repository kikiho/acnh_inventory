import React, { Component } from 'react';
import axios from "axios";
import "./appStyles.css"

//TODO Make this styling better
const inputStyle = {
    padding: "15px",
    borderRadius: "5px",
    border: "2px solid #AD7A3E"
};

export default class CreateUserComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });

    }

    onSubmit(e) {
        e.preventDefault();

        const user = {username: this.state.username};

        axios.post("http://localhost:5000/users/add", user).then((res) => {
            console.log(res.data);
            }).catch((err) => window.alert(err));

        //reset for next add user
        this.setState({
            username: '',
        })
    }

    render() {
        return (<div>
            <div className="titleText"> Create New User</div>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="inputContainer">
                    <label className="labels">Username </label>
                    <input type="text"
                           style={inputStyle}
                           required
                           className="form-control"
                           value={this.state.username}
                           onChange={this.onChangeUsername}/></div>
                </div>
                <div className="form-group">
                    <input type="submit"
                           value ="Add User"
                           className="flatButton"/>
                </div>
            </form>
        </div>)
    }
};
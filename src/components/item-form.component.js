import React, { Component } from 'react';
import DatePicker from "react-datepicker/es";
import Spinner from 'react-bootstrap/Spinner'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const inputStyle = {
    padding: "15px",
    borderRadius: "5px",
    border: "2px solid #AD7A3E"
};
export default class ItemForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getUsersAsOptions = this.getUsersAsOptions.bind(this);

        this.state = {
            editMode: false,
            username: '',
            name: '',
            category: 'furniture',
            tags: [],
            amount: 0,
            color: '',
            date: new Date(),
            users: [],
            loading: true,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/users").then((res) => {
            console.log(res.data);
            this.setState({
                users: res.data,
                username: res.data[0].username,
                loading: false,
            });
        });

        if (this.props.match.params.id !== undefined) {
            // has an id, therefore Edit Mode
            axios.get('http://localhost:5000/items/' + this.props.match.params.id).then((res)=> {
                this.setState({
                    username: res.data.username,
                    name: res.data.name,
                    category: res.data.category,
                    tags: res.data.tags,
                    amount: res.data.amount,
                    color: res.data.color,
                    date: new Date(res.data.date),
                    loading: false,
                    editMode: true,
                })
            }).catch((err) => {
                window.alert(err);
            });
        }
    }

    onChangeUsername(e) {
        //setting state
        this.setState(
            {
                username: e.target.value
            }
        );
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeTags(e) {
        this.setState({
            tags: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangeColor(e) {
        this.setState({
            color: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date,
        });
    }

    onSubmit(e) {
        e.preventDefault(); // so that we can define our own submit behaviour

        const item = {
            username: this.state.username,
            name: this.state.name,
            category: this.state.category,
            tags: this.state.tags,
            amount: this.state.amount,
            color: this.state.color,
            date: this.state.date,
        };
        if (this.state.editMode) {
            axios.post('http://localhost:5000/items/update/' + this.props.match.params.id, item).then((res) => console.log(res.data)).catch((err) => console.log(err));

        } else {
            axios.post('http://localhost:5000/items/add', item).then((res) => console.log(res.data)).catch((err) => console.log(err));
        }

        window.location = '/';
    }

    getUsersAsOptions() {
        return this.state.users.map((user) => {
            return <option key={user.username}>{user.username}</option>
        });
    }

    render() {
        const textTitle = this.state.editMode ? "Edit Item" : "Add New Item";
        return this.state.loading ? (<Spinner animation="grow" variant="primary" />)
            :
            (
            <div>
                <div className="titleText">{textTitle}</div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="inputContainer"><label className="labels">Item Name</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.name}
                               style={inputStyle}
                               onChange={this.onChangeName}

                        /></div>
                    </div>
                    <div className="form-group">
                        <div className="inputContainer">
                            <label className="labels">Username</label>
                        <select className="form-control" id="usersDropdown"
                                onChange={this.onChangeUsername}
                                value={this.state.username}
                                style={inputStyle}
                                required>
                            {this.getUsersAsOptions()}
                        </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="inputContainer">
                            <label className="labels">Category</label>
                        <select className="form-control" id="categoryDropdown"
                                onChange={this.onChangeCategory}
                                value={this.state.category}
                                style={inputStyle}
                                required>
                            <option>furniture</option>
                            <option>materials</option>
                            <option>clothes</option>
                            <option>tools</option>
                            <option>wildlife</option>
                        </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="inputContainer">
                            <label className="labels">Tags</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.tags}
                               style={inputStyle}
                               onChange={this.onChangeTags}
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="inputContainer">
                            <label className="labels">Amount</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.amount}
                               onChange={this.onChangeAmount}
                               style={inputStyle}
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="inputContainer">
                            <label className="labels">Colour</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.color}
                               onChange={this.onChangeColor}
                               style={inputStyle}
                        /></div>
                    </div>
                    <div className="form-group">
                        <div className="inputContainer">
                            <label className="labels">Date</label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                className="picker"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value ={textTitle}
                               className="flatButton"
                        />
                    </div>
                </form>
            </div>
        )
    }
};
import React, { Component } from 'react';
import axios from "axios";
import "../App.css"
import { Link } from 'react-router-dom';


const Item = props => (
    <tr>
        <td>{props.item.username}</td>
        <td>{props.item.name}</td>
        <td>{props.item.category}</td>
        <td>{props.item.tags}</td>
        <td>{props.item.amount}</td>
        <td>{props.item.color}</td>
        <td>{props.item.date === undefined
            ? "None" : props.item.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/" + props.item._id}>edit</Link>|
            <a href="#" onClick={() => {
                props.deleteItem(props.item._id);
            }}>delete</a>
        </td>
    </tr>
);

export default class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:5000/items/").then((res) => {
            this.setState({
                items: res.data,
            })
        }).catch((err) => window.alert(err));
    }

    deleteItem(id) {
        axios.delete("http://localhost:5000/items/" + id).then((res)=>{
            window.alert(res.data);
        }).catch((err) => window.alert(err));

        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        });
    }

    buildItemList() {
        return this.state.items.map((currItem) => {
           return <Item item = {currItem} deleteItem={this.deleteItem} key={currItem._id}/>
        });
    }

    filter(e) {
        //e.target.value will be search term
        let searchTerm = e.target.value;
        if (!searchTerm || searchTerm.length ===0) {
            this.restoreInitialState();
        }
        let allItems = this.state.items;
        let filteredList = [];
        for (let item of allItems) {
            let tags = item.tags;
            for (let tag of tags) {
                if (tag.toLowerCase().search(searchTerm) !== -1) {
                    // there was a match add to filtered list
                    if (!filteredList.includes(item)) filteredList.push(item);
                }
            }
        }

        this.setState({
            items: filteredList
        });
    }

    restoreInitialState() {
        axios.get("http://localhost:5000/items/").then((res) => {
            this.setState({
                items: res.data
            })
        }).catch((err) => window.alert(err));
    }

    render() {
        return (
            <div>
            <h3>Inventory</h3>
                <input type="text"
                       className="form control form-control lg"
                       placeholder="Search By Tag"
                       onChange={this.filter}/>
                <table className="table">
                    <thead className="thread-light">
                        <tr>
                            <th>username</th>
                            <th>item name</th>
                            <th>category</th>
                            <th>tags</th>
                            <th>amount</th>
                            <th>colour</th>
                            <th>date</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.buildItemList()}
                    </tbody>
                </table>
            </div>)
    }
};
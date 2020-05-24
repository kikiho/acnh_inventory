import React, { Component } from 'react';
import axios from "axios";

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
    </tr>
);

export default class ItemList extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            items: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/items/").then((res) => {
            this.setState({
                items: res.data
            })
        }).catch((err) => window.alert(err));
    }

    deleteItem(id) {
        axios.delete("http://localhost:500/items/" + id).then((res)=>{
            window.alert(res.data);
        }).catch((err) => window.alert(err));

        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        });
    }

    buildItemList() {
        return this.state.items.map((currItem) => {
           return <Item item = {currItem} deleteExercise={this.deleteItem} key={currItem._id}/>
        });
    }

    render() {
        return (
            <div>
            <h3>Inventory</h3>
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
                        </tr>
                    </thead>
                    <tbody>
                        { this.buildItemList()}
                    </tbody>
                </table>
            </div>)
    }
};
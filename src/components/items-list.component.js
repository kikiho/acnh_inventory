import React, { Component } from 'react';
import axios from "axios";
import "../App.css"
import { Link } from 'react-router-dom';
import "./item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faEdit, faUserEdit, faTrash, faTools, faTshirt, faRulerCombined, faPaw} from '@fortawesome/free-solid-svg-icons';


const iconMap = {
    furniture: <FontAwesomeIcon icon={faCouch} size="3x"></FontAwesomeIcon>,
    materials:  <FontAwesomeIcon icon={faRulerCombined} size="3x"></FontAwesomeIcon>,
    clothes:  <FontAwesomeIcon icon={faTshirt} size="3x"></FontAwesomeIcon>,
    tools:  <FontAwesomeIcon icon={faTools} size="3x"></FontAwesomeIcon>,
    wildlife: <FontAwesomeIcon icon={faPaw} size="3x"></FontAwesomeIcon>
};

const Item = props => (
    <div className="grid-cell">
        <div className="flexContainer"> {iconMap[props.item.category]}
        <p className="itemName">{props.item.name}</p>
        <p className="itemAmount">Amount: {props.item.amount}</p>
        <p className="userThatAdded">Added By: {props.item.username}</p>
        <div className="editDeleteContainer">
            <span className="itemButton"><Link id="editLink" to={"/edit/" + props.item._id}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link></span>
            <span className="itemButton" onClick={() => {
                props.deleteItem(props.item._id);
            }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></span>
        </div>
    </div>
    </div>
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
                <div className="itemsContainer">
                    { this.buildItemList()}
                </div>
            </div>)
    }
};
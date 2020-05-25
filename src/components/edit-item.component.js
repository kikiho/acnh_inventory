import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker/es";

export default class EditItemComponent extends Component {
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

        this.state = {
            username: '',
            name: '',
            category: '',
            tags: [],
            amount: 0,
            color: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
       axios.get('http://localhost:5000/items/' + this.props.match.params.id).then((res)=> {
           this.setState({
              username: res.data.username,
              name: res.data.name,
              category: res.data.category,
              tags: res.data.tags,
              amount: res.data.amount,
              color: res.data.color,
              date: new Date(res.data.date),
           })
       }).catch((err) => {
            window.alert(err);
        });
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

        axios.post('http://localhost:5000/items/update/' + this.props.match.params.id, item).then((res) => console.log(res.data)).catch((err) => console.log(err));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Item Name</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}

                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.category}
                               onChange={this.onChangeCategory}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.tags}
                               onChange={this.onChangeTags}
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.amount}
                               onChange={this.onChangeAmount}
                        />
                    </div>
                    <div className="form-group">
                        <label>Colour</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.color}
                               onChange={this.onChangeColor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Item" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
};
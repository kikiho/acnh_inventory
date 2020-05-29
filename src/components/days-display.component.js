import React, { Component } from 'react';
import axios from "axios";
import './styles/dayStyles.css'

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednseday",
    "Thursday",
    "Friday",
    "Saturday"
];

const npcImageMap = {
    flick: "https://vignette.wikia.nocookie.net/animalcrossing/images/a/a2/NH-Flick.png/revision/latest?cb=20200403152806",
    gulliver: "https://vignette.wikia.nocookie.net/animalcrossing/images/7/74/GulliverNL.png/revision/latest?cb=20130729111729",
    leif: "https://vignette.wikia.nocookie.net/animalcrossing/images/3/3c/Leif.png/revision/latest?cb=20140721120907",
    redd: "https://vignette.wikia.nocookie.net/animalcrossing/images/6/6b/ReddNL.png/revision/latest?cb=20200425083709",
    saharah: "https://vignette.wikia.nocookie.net/animalcrossing/images/d/d7/Acnl-saharah.png/revision/latest?cb=20130707101048",
    celeste: "https://vignette.wikia.nocookie.net/animalcrossing/images/a/a5/Acnl-celeste.png/revision/latest?cb=20130703203412",
    kicks: "https://vignette.wikia.nocookie.net/animalcrossing/images/2/29/200px-Kicks_3DS.png/revision/latest?cb=20140718172000"
};

let months = [ "January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];

const Day = (props) => {
    let dateObj = new Date(props.day.date);
    let month = months[dateObj.getMonth()];
    let dayOfWeek = weekdays[dateObj.getDay()];
    let day = dateObj.getDate();
    return (
      <div className="singleDayContainer">
          <div class="dayAndMonthContainer">
          <div className="dayContainer">
              <p className="dayText">{day}</p>
              <p className="weekdayText">{dayOfWeek}</p>
          </div>
          <p className="monthText">{month}</p>
          </div>
          <div className="npcContainer">
              {getImages(props.day.npcs)}
          </div>
      </div>
    );
};

let getImages = function(npcList) {
    return npcList.map((npc) => (<div className="singleNPC"><img className="npcImage" alt={npc} src={npcImageMap[npc.toLowerCase()]}/></div>));
};


export default class DaysDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
          days: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/days/").then((res) => {
            this.setState({
               days: res.data
            });
        }).catch((err) => window.alert(err));
    }

    buildDays() {
        return this.state.days.map((currDay) =>
             <Day day = {currDay} key={currDay._id}/>
        );
    }

    render() {
        return(<div className="pageContainer">
            <input type="button" value="Add New Day"
                   className="addNewDayButton"/>
            <div className="daysContainer">{this.buildDays()}</div>
        </div>);
    }
};
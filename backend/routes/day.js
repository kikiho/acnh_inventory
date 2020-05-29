let express = require('express');
let router = express.Router();

let Day = require("../model/day.model");

router.get("/", (req, res) => {
   Day.find().then(days => res.json(days)).catch(err => res.status(400).json("Error" + err));
});

router.post("/add", (req, res) => {
   const date = req.body.date;
   const npcs = req.body.npcs;

   const newDay = new Day({date, npcs});

   newDay.save().then(()=> res.json("Day added")).catch((err) => res.status(400).json("Error" + err));
});

router.get("/:id", (req, res)=> {
   Day.findById(req.params.id).then((day)=> res.json(day)).catch((err)=>res.status(400).json("Error" + err));
});

router.delete("/:id", (req, res)=> {
   Day.findByIdAndDelete(req.params.id).then(() => res.json('Day deleted')).catch((err) => res.status(400).json("Error" +err));
});

router.post("/update/:id", (req, res) => {
   Day.findById(req.params.id).then((day) => {
      day.date = req.body.date;
      day.npcs = req.body.npcs;

      day.save().then(() => res.json("Day updated")).catch((err) => res.status(400).json("Error" + err));
   });

});

module.exports = router;
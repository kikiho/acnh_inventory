let express = require('express');
let router = express.Router();

let Item = require("../model/item.model");

router.get("/", (req, res) => {
    Item.find().then(items => res.json(items)).catch(err => res.status(400).json('Error' + err));
});

router.post("/add", (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const category = req.body.category;
    const tags = req.body.tags;
    const amount = req.body.amount;
    const color = req.body.color;
    const date = req.body.date;

    const newItem = new Item({
        username,
        name,
        category,
        tags,
        amount,
        color,
        date
    });

    newItem.save().then(()=>res.json("Item added")).catch(err => res.status(400).json('Error' + err));
});

router.get("/:id", (req, res) => {
    Item.findById(req.params.id).then(item => res.json(item)).catch(err => res.status(400).json('Error' + err));
});

router.delete("/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id).then(() => res.json(`Item deleted`)).catch(err => res.status(400).json('Error' + err));
});

router.post("/update/:id", (req, res) => {
    Item.findById(req.params.id).then((item) => {
        item.username = req.body.username;
        item.name = req.body.name;
        item.category = req.body.category;
        item.tags = req.body.tags;
        item.amount = req.body.amount;
        item.color = req.body.color;
        item.date = req.body.date;

        item.save().then(() => res.json("item updated")).catch(err => res.status(400).json("Error" +err));

    }).catch(err => res.status(400).json('Error' + err));
});

module.exports = router;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connection established")).catch((err) => console.log(err));
//
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const dayRouter = require('./routes/day');

app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/days', dayRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
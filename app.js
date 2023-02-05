const express = require('express');
const app = express();
const mongoose = require('mongoose');
const accountRoutes = require('./routes/account_routes');
const authRoutes = require('./routes/auth_routes');
const linkRoutes = require('./routes/link_routes');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Connect to MongoDB

mongoose.connect("mongodb://localhost:27017/auth")
.then((result) => {
    app.listen(3030);
}).catch((err) => console.log(err));

app.use(accountRoutes);
app.use(authRoutes);
app.use(linkRoutes);
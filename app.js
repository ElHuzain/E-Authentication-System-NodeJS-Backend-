const express = require('express');
const app = express();
const mongoose = require('mongoose');
const accountRoutes = require('./routes/account_routes');
const authRoutes = require('./routes/auth_routes');
const linkRoutes = require('./routes/link_routes');
const pageRoutes = require('./routes/page_routes');
const Functions = require('./functions.js')

// app.use((req, res) => {
//     const userAgent = req.headers['user-agent'];
//     console.log(Functions.getIPAddress(req.ip));
//     console.log(Functions.getOperatingSystem(userAgent));
//     console.log(Functions.getBrowser(userAgent));
// })

// Global
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/auth")
.then((result) => {
    app.listen(3030);
    console.log("Connected");
}).catch((err) => console.log(err));

// List routes
app.use(pageRoutes);
app.use(accountRoutes);
app.use(authRoutes);
app.use(linkRoutes);
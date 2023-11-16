require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth.js");
const tilangRoutes = require("./routes/tilangs.js");
const adminRoutes = require("./routes/admins.js");
const memberRoutes = require("./routes/members.js");

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' 
    ){
        cb(null, true);
    } else(
        cb(null, false)
    )
}

// express app
const app = express();
    
// middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
  
// routes
app.use("/api/tilang", tilangRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/member", memberRoutes);

//connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to database')
        // listen for requests
        app.listen(process.env.PORT,()=>{
            console.log('server running on port',process.env.PORT);
        })  
    })
    .catch((error) => {
        console.log(error)
    })

//

module.exports = app;
require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors')

const anprRoutes = require('./routes/anprRoutes')

// multer
const multer = require("multer");
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../_imagesPlate');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

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
app.use(cors());
app.use(router);

app.use(multer({storage:fileStorage, fileFilter:fileFilter}).single('ImagePath'))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
  
// routes
app.use('/api/anpr', anprRoutes)

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
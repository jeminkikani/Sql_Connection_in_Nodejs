require('dotenv').config();
const express = require('express')
const app = express();
// const mysql = require('mysql');
const port = process.env.PORT;
const userRoutes = require('./Routes/user.Routes');
const morgan = require('morgan');

// middlware
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

app.use('/api/users', userRoutes);


// server listen
app.listen(port ,()=>{
    console.log(`server started at http://localhost:${port}`);
})
//required packages

const express = require('express');
const fs = require('fs');

//app config
const app = express();
const PORT = 8000;
app.set('view engine','ejs')
app.use(express.urlencoded({ extended : false}))



//routes
//GET / -- index show route for the app
app.get('/', (req,res) =>{
    res.render("index.ejs");
})

app.use('/', require('./controllers/lizards'));
app.use('/', require('./controllers/animals'));

//listen on a port
app.listen(PORT, () =>{
    console.log(`port is live on ${PORT}`)
})
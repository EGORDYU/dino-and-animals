const express = require('express');
const router = express.Router();
const fs = require('fs');

// helper function to read the dino db
const readDinos = () => {
    //use the file system to read the dino json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    //parse the raw json to js
    const dinoData = JSON.parse(dinosaurs);
    //return the dino data
    return dinoData;
}

// readDinos();


//GET /dinosaurs -- READ return an array of dinos
router.get('/dinosaurs', (req,res) =>{
    let dinos = readDinos()


    if(req.query.dinoFilter){
        dinos = dinos.filter(dino => {
            return dino.name.toLowerCase().includes(req.query.dinoFilter.toLowerCase())
        })
    }

    res.render("dinos/index.ejs",{
        //equal to dinos:dinos
        dinos
    });
})
// GET /dinosaurs/new -- show route for a form that posts to POST /dinosaurs
router.get('/dinosaurs/new', (req,res) =>{
    res.render('dinos/new.ejs')
})
// POST /dinosaurs -- CREATE a new dino in the db
router.post('/dinosaurs',(req,res) =>{
    console.log(req.body);//POST form data shows up in the req.body
    const dinos = readDinos()
    //push the dino from the req.body into the array of json dinos
    dinos.push(req.body);
    //write the json file to save it to disk
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))
    //the tell browser to redirect
    //do another GET request on a specific url
    res.redirect('/dinosaurs')
})

// GET /dinosaurs/:id -- READ a single dino @ :id
router.get('/dinosaurs/:id', (req,res) => {
    //read the dino json data
    const dinos = readDinos();
    //look up one dino using the req.params
    const foundDino = dinos[req.params.id]
    // render the details template
    res.render("dinos/details.ejs",{
        dino: foundDino,
        id: req.params.id
    })
})




module.exports = router;
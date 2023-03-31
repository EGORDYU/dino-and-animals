const express = require('express');
const router = express.Router();
const fs = require('fs');

// helper function to read the dino db
const readAnimals = () => {
    //use the file system to read the dino json
    const animals = fs.readFileSync("./prehistoric_creatures.json")
    //parse the raw json to js
    const animalData = JSON.parse(animals);
    //return the dino data
    return animalData;
}

// readDinos();


//GET /dinosaurs -- READ return an array of dinos
router.get('/animals', (req,res) =>{
    let animals = readAnimals()


    if(req.query.animalFilter){
        animals = animals.filter(animal => {
            return animal.type.toLowerCase().includes(req.query.animalFilter.toLowerCase())
        })
    }

    res.render("animals/index.ejs",{
        //equal to dinos:dinos
        animals
    });
})
// GET /dinosaurs/new -- show route for a form that posts to POST /dinosaurs
router.get('/animals/new', (req,res) =>{
    res.render('animals/new.ejs')
})
// POST /dinosaurs -- CREATE a new dino in the db
router.post('/animals',(req,res) =>{
    console.log(req.body);//POST form data shows up in the req.body
    const animals = readAnimals()
    //push the animal from the req.body into the array of json animal
    animals.push(req.body);
    //write the json file to save it to disk
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(animals))
    //the tell browser to redirect
    //do another GET request on a specific url
    res.redirect('/animals')
})

// GET /dinosaurs/:id -- READ a single dino @ :id
router.get('/animals/:id', (req,res) => {
    //read the dino json data
    const animals = readAnimals();
    //look up one dino using the req.params
    const foundAnimal = animals[req.params.id]
    // render the details template
    res.render("animals/details.ejs",{
        animal: foundAnimal,
        id: req.params.id
    })
})




module.exports = router;
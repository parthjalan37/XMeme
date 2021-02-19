const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');


//GET BACK ALL THE MEMES
router.get('/', async (req, res) => {
    try{
        const memes = await Meme.find().sort({'_id':-1}).limit(100);
        res.json(memes);
    }catch(err){
        console.log(err);
        res.json([]);
    }
});

//GET BACK A SPECIFIC MEME USING ID
router.get('/:memeId', async (req, res) => {
    try{
        const meme = await Meme.findById(req.params.memeId);
        res.json(meme);
    }catch(err){
        res.status(404).json({message: "Invalid id. No meme exists for the entered id."});
    }
});

//CHECK FOR DUPLICATE MEME URL
router.post('/duplicate', async (req, res) => {
    try{
        const duplicate = await Meme.findOne({ url: req.body.url});
        if(duplicate===null){
            res.status(200).json({message: "New meme URL... Go ahead!"});
        }
        else{
            res.status(409).json({message: "This meme URL already exists. Please enter another one."});
        }
    }catch(err){
        res.json({message: err});
    }
});

//SUBMIT A MEME
router.post('/', async (req, res) => {
    const meme = new Meme({
        name: req.body.name,
        caption: req.body.caption,
        url: req.body.url,
    });
    try{
        const savedMeme = await meme.save();
        res.json({_id: savedMeme._id});
    }catch(err){
        res.json({message: err});
    }
});

//UPDATE A MEME
router.patch('/:memeId', async (req, res) => {
    try{
        const updatedMeme = await Meme.updateOne({_id: req.params.memeId},
            {$set: {caption: req.body.caption, url: req.body.url}});
        res.json(updatedMeme);
    }catch(err){
        res.status(404).json({message: "Invalid id. No meme exists for the entered id."});
    }
});

//UPDATE A MEME
router.put('/:memeId', async (req, res) => {
    try{
        const updatedMeme = await Meme.updateOne({_id: req.params.memeId},
            {$set: {name: req.body.name, caption: req.body.caption, url: req.body.url}});
        res.json(updatedMeme);
    }catch(err){
        res.status(404).json({message: "Invalid id. No meme exists for the entered id."});
    }
});

module.exports = router;
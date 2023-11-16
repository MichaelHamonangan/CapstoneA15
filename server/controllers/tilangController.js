const express = require('express');
const Tilang = require('../models/Tilang');

//Create 
const createTilang = async (req, res) => {
    const newTilang = new Tilang(req.body)
    // res.send("Hello this is bike endpoint!")
    try {
        const savedTilang = await  newTilang.save()
        res.status(200).json(savedTilang)
    }catch(err) {
        res.status(500).json(err)
    }
}

// //Create 
// const createTilangExternal = async (req, res) => {
//     const {nomorKendaraan, tanggal, lokasi} = req.body 
//     if (!req.file) {
//         const err = new Error('Please provide Image');
//         err.errorStatus = 422;
//         throw err;
//     }
//     // res.send("Hello this is bike endpoint!")
//     try {
//         // const savedTilang = await Tilang.create({nomorKendaraan, tanggal, lokasi, keterangan : "tes"})
//         // res.status(200).json(savedTilang)
//         res.send(req.file)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

//Create by api call
// export const createTilangExternal = async (req, res) => {
//     const {nomorKendaraan, tanggal, lokasi} = req.body
//     // res.send("Hello this is bike endpoint!")
//     try {
//         const dateTime = giveCurrentDateTime();
//         const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

//         // Create file metadata including the content type
//         const metadata = {
//             contentType: req.file.mimetype,
//         };

//         // Upload the file in the bucket storage
//         const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

//         // Grab the public url
//         const downloadURL = await getDownloadURL(snapshot.ref)

//         console.log('File successfully uploaded.');
//         const savedTilang = await newTilang.create({nomorKendaraan, tanggal, lokasi, keterangan : downloadURL})
//         return res.send({
//             message: 'file uploaded to firebase storage',
//             name: req.file.originalname,
//             type: req.file.mimetype,
//             downloadURL: downloadURL
//         })
//     }catch(err) {
//         res.status(500).json(err)
//     }
// }

//update
const updateTilang = async (req, res, next) => {
    try {
        const updatedTilang = await  Tilang.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedTilang)
    }catch(err) {
        res.status(500).json(err)
    }
}

//delete
const deleteTilangById = async (req, res, next) => {
    try {
        await  Tilang.deleteOne({_id: req.params.id})
        res.status(200).json("Tilang has been deleted.")
    }catch(err) {
        res.status(500).json(err)
    }
}

//findById
const findTilangById = async (req, res, next) => {
    try {
        const tilang = await  Tilang.findById(req.params.id)
        res.status(200).json(tilang)
    }catch(err) {
        res.status(500).json(err)
    }
}

// findAll
// Import necessary modules and models

const findAllTilang = async (req, res, next) => {
    try {
        const searchTerm = req.query.search;

        // If there's a search term, construct a case-insensitive regular expression
        if (searchTerm) {
            const regex = new RegExp(searchTerm, 'i');
            const query = {
                nomorKendaraan: regex,
            };

            const tilangs = await Tilang.find(query);
            res.status(200).json(tilangs);
        } else {
            // If no search term provided, fetch all tilangs
            const tilangs = await Tilang.find();
            res.status(200).json(tilangs);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createTilang,
    // createTilangExternal,
    updateTilang,
    deleteTilangById,
    findTilangById,
    findAllTilang
}

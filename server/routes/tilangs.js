const express = require("express");
const Tilang = require("../models/Tilang.js");
const {
  createTilang,
  createTilangExternal,
  updateTilang,
  deleteTilangById,
  findTilangById,
  findAllTilang,
} = require("../controllers/TilangController");
const { verifyToken, verifyAdmin } = require("../utils/verifyToken.js");

const { upload, uploadMultiple } = require('../utils/multer')
const { getStorage, ref ,uploadBytesResumable, getDownloadURL} = require('firebase/storage')
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('../utils/firebaseConfig');
const { routes } = require("../server.js");
const { spawn } = require('child_process')

//cons express = require('express');
const router = express.Router();

//Create
//testing site without verifyToken re-activate when login token has been created
router.post("/", verifyToken, verifyAdmin, createTilang);
// router.post('/',  createBike)

// router.post("/create", createTilangExternal);
// router.post('/',  createBike)

//Update
router.put("/:id", verifyToken, verifyAdmin, updateTilang); //re-activate after testing or fixed login token

// testing side
// router.put('/:id',  updateBike)
// router.delete('/:id', deleteBikeById)

//Delete
router.delete("/:id", deleteTilangById); //re-activate after testing or fixed login token

//findById
router.get("/:id", findTilangById);

//findAll
router.get("/", findAllTilang);


async function uploadImage(file, quantity) {
  const storageFB = getStorage();

  await signInWithEmailAndPassword(auth, "admin1@gmail.com", "admin1")

  if (quantity === 'single') {
      const dateTime = Date.now();
      const fileName = `images/${dateTime}`
      const storageRef = ref(storageFB, fileName)
      const metadata = {
          contentType: file.type,
      }
      const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL
  }

  if (quantity === 'multiple') {
      for(let i=0; i < file.images.length; i++) {
          const dateTime = Date.now();
          const fileName = `images/${dateTime}`
          const storageRef = ref(storageFB, fileName)
          const metadata = {
              contentType: file.images[i].mimetype,
          }

          const saveImage = await Image.create({imageUrl: fileName});
          file.item.imageId.push({_id: saveImage._id});
          await file.item.save();

          await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);

      }
      return
  }
}

router.post('/creates', upload, async (req, res) => {
    const { nomorKendaraan, tanggal, lokasi } = req.body;
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer
    }
    try {
        const buildImage = await uploadImage(file, 'single'); 

        const childPython = spawn('python', ['controllers\\pythonModel\\main.py', buildImage]);

        // Get the model output
        const tempPromise = new Promise((resolve) => {
            childPython.stdout.on('data', (data) => {
                const temp = `${data}`;
                resolve(temp);
            });
        });
        
        tempPromise.then(async (temp) => {
        console.log('violation registered by vehicle with plate number :', temp);

        const PlateNumber = temp.slice(0, -2);

        //add doc to database
        try {
            const savedTilang = await Tilang.create({nomorKendaraan : PlateNumber , tanggal, lokasi, keterangan : buildImage})
            res.status(200).json(savedTilang)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
        });
        
        childPython.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        childPython.stderr.on('close', (data) => {
            console.log(`The violation was successfully registered!`);
        });

        //   const savedTilang = await Tilang.create({nomorKendaraan, tanggal, lokasi, keterangan : buildImage})
    } catch(err) {
        console.log(err);
    } 
})

// router.get("/", async (req, res) => {
//   res.send("hello this is tilang router endpoint!");
// });

// router.post("/creates", upload.single("keterangan"), async (req, res) => {
//     try {
//         const { nomorKendaraan, tanggal, lokasi } = req.body;

//         if (!req.file) {
//           return res.status(400).send('No file uploaded.');
//         }

//         const dateTime = giveCurrentDateTime();
        
//         // Create file metadata including the content type
//         const metadata = {
//             contentType: req.file.mimetype,
//         };

//         const storageRef = ref(storage, `files/${req.file.originalname + " " + dateTime}`);
//         const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
//         const downloadURL = await getDownloadURL(snapshot.ref);

//         const savedTilang = await Tilang.create({ nomorKendaraan, tanggal, lokasi, keterangan: downloadURL });

//         res.status(200).json({
//             message: 'File uploaded to Firebase storage and Tilang created successfully',
//             tilang: savedTilang,
//             downloadURL: downloadURL,
//         });
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });

// const giveCurrentDateTime = () => {
//   const today = new Date();
//   const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//   const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   const dateTime = date + ' ' + time;
//   return dateTime;
// }

module.exports = router

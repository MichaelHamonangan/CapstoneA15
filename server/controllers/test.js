const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process')

const Violation = require('../models/anprModels')

// get all violations
const getViolations = async (req, res) => {
  const violations = await Violation.find({}).sort({createdAt: -1})

  res.status(200).json(violations)
}

// get a single violation
const getViolation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such violation'})
  }

  const violation = await Violation.findById(id)

  if (!violation) {
    return res.status(404).json({error: 'No such violation'})
  }

  res.status(200).json(violation)
}

// create a new violation
const createViolation = async (req, res) => {
    const {Type} = req.body

    if (!Type) {
        const err = new Error('Please provide Type of Violation');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
      }

    if (!req.file) {
        const err = new Error('Please provide Image');
        err.errorStatus = 422;
        throw err;
    }

    const ImagePath = req.file.path;

    //run python model
    const projectRoot = path.join(__dirname, '..');
    const filePath = path.join(projectRoot, ImagePath);
    const childPython = spawn('python', ['controllers\\pythonModel\\main.py', filePath]);

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
        const violation = await Violation.create({ImagePath, Type, PlateNumber})
        res.status(200).json(violation)
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
}

// delete a violation
const deleteViolations = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such violation'})
    }
  
    const violation = await Violation.findOneAndDelete({_id: id})

    if(!violation) {
        return res.status(400).json({error: 'No such violation'})
    }

    // deleting image file
    const imagePath = violation.ImagePath;
    const projectRoot = path.join(__dirname, '..');
    const filePath = path.join(projectRoot, imagePath);

    try {
        await fs.promises.unlink(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error('Error deleting the file:', err);
        return res.status(500).json({ error: 'Error deleting the file' });
    }

    res.status(200).json(violation)
  }

// update a violation
const updateViolations = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such violation'})
    }
  
    const violation = await Violation.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!violation) {
      return res.status(400).json({error: 'No such violation'})
    }
  
    res.status(200).json(violation)
  }

module.exports = {
    getViolations,
    getViolation,
    createViolation,
    deleteViolations,
    updateViolations
}
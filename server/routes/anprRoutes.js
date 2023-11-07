const express = require('express')
const {
  getViolations,
  getViolation,
  createViolation,
  deleteViolations,
  updateViolations
} = require('../controllers/anprControllers')


const router = express.Router()

// GET all plates
router.get('/', getViolations)

// GET a single plate
router.get('/:id', getViolation)

// POST a new plate
router.post('/', createViolation)

// DELETE a plate
router.delete('/:id', deleteViolations)

// UPDATE a plate
router.patch('/:id', updateViolations)

module.exports = router
const express = require('express')
const router = express.Router()
const { getClients,getClient, createClient, updateClient, deleteClient } = require('./actions')

// GET all
router.get('/', getClients)

// GET by ID
router.get('/:id', getClient)

// POST Create a Client
router.post('/', createClient)

// PUT Update Client's info
router.put('/:id', updateClient)

// DELETE by ID
router.delete('/:id', deleteClient)

module.exports = router

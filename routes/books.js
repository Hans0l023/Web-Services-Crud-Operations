const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
// const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate')



router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

router.post('/', isAuthenticated, booksController.createbook);
router.put('/:id', isAuthenticated, booksController.updatebook);
router.delete('/:id', isAuthenticated, booksController.deletebook);

module.exports = router;
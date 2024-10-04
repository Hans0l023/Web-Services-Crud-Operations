const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');


router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

router.post('/', validation.savebook, booksController.createbook);
router.put('/:id', validation.savebook, booksController.updatebook);
router.delete('/:id', booksController.deletebook);

module.exports = router;
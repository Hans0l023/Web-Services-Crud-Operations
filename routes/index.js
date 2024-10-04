const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //swagger.tags=['Hello World'] 
    res.send('So Far So Good');});

router.use('/books', require('./books'));

module.exports = router;
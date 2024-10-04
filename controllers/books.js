const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    const result = await mongodb.getDatabase().db().collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });

};
const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be a valid book id to locate a book');
    }
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    });
};

const createbook = async (req, res) => {
    //#swagger.tags=['Books']

    const book = {
        book_id: req.body.book_id,
        additionalInfo: req.body.additionalInfo,
        series: req.body.series,
        name: req.body.name,
        author_first: req.body.author_first,
        author_middle: req.body.author_middle,
        author_last: req.body.author_last,
        order_in_series: req.body.order_in_series
    };

    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occured while updating book')  
    }
};

const updatebook = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be a valid book id to update a book');
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
        book_id: req.body.book_id,
        additionalInfo: req.body.additionalInfo,
        series: req.body.series,
        name: req.body.name,
        author_first: req.body.author_first,
        author_middle: req.body.author_middle,
        author_last: req.body.author_last,
        order_in_series: req.body.order_in_series
    };

    const response = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book)
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while updating book')  
    }
};

const deletebook = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be a valid book id to delete a book');
    }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId })
    if (response.deletedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while updating book')  
    }
};




module.exports = {
    getAll,
    getSingle,
    createbook,
    updatebook,
    deletebook
}
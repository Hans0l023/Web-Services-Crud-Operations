const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Acess-Control-Allow-Headers',
        'Orgin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Acess-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');
    next()
});
app.use('/', require('./routes'));


mongodb.initDB((err) => {
    if(err) {
        console.log(err);
    }
    else
        app.listen(port, () => {console.log(`database is listening and Running on port ${port}`)});
});


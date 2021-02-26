const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Mew = require('./models/mew');

const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Meoww'
    })
});


app.get('/mews', (req, res) => {
    Mew.find()
    .then(mews => {
        res.json(mews);
    })
});

function isValidMew(mew) {
    return mew.name && mew.name.toString().trim() !== '' &&
            mew.content && mew.content.toString().trim() !== '';
}

app.post('/mews', (req, res) => {
    if(isValidMew(req.body)) {
        // Insert into db
        const newMew = {
            name: req.body.name.toString(),
            content: req.body.content.toString()
        };

        const mew = Mew(newMew);
        mew.save((err, data) => {
            if(err) throw err;
            res.json(data);
        })
    }
    else {
        res.status(422).json({
            message: 'Hey, name and content are required'
        });
    }
});

app.listen(PORT, () => {
    console.log('Server is listening!');
})
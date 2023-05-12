const express = require('express')
const app = express();
const {getCategories} = require('./controllers/index')
const {getReviewID} = require('./controllers/index')



app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviewID);

app.use('*', (req, res) => {
    res.status(404).send({ msg: '404 - invalid path'})
})

app.all('*', (req, res) => {
    res.status(404).send({ msg: "Not Found"})
})

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Invalid input' });
    } else next(err);
})

app.use((err, req, res, next) => {
    console.log(err)
res.status(500).send({msg: "server error"})
})


module.exports = app ;
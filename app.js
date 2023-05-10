const express = require('express')
const app = express();
const {getCategories} = require('./controllers/index')

app.get('/api/categories', getCategories);

app.use('*', (req, res) => {
    res.status(404).send({ msg: '404 - invalid path'})
})

module.exports = app ;
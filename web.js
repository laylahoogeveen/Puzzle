const express = require('express');
const app = express();
// app.use(express.static(__dirname + 'public'));
// app.use('/css', express.static(__dirname + '/Images'));
app.use(express.static('public'));
const json_puzzle = require('./json/modified/1.json');

app.engine('pug', require('pug'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/public/views');

app.get('/route', (req, res) => {
    res.json(json_puzzle);
})


app.get('/', (req,res) => {

    res.render('index');
})

app.listen(process.env.PORT || 3000);

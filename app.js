const express = require('express');
const app = express();
app.use(express.static('public'));

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', __dirname + '/public/views');

app.get('/', (req,res) => {
    res.render('index');
})

app.listen(process.env.PORT || 3000);

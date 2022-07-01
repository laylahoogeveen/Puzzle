

const express = require('express')
const path = require('path')
const app = express()
  
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
  
app.get('/', function(req, res){
  
    // Rendering our web page i.e. Demo.ejs
    // and passing title variable through it
    res.render('Demo', {
        title: 'View Engine Demo'
    })
})
  
app.listen(8080, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})

// import { compileFile } from 'pug';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const express = require('express');


// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;
// const app = express();
// // app.use(express.static(__dirname + '/static/'));


// app.set('views', './views');
// app.set('view engine', 'pug');

// // const server = http.createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.setHeader('Content-Type', 'text/plain');
// //   res.end('Hello World');
// // });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// app.get('/', (req, res) => {
// 	res.render('index');
// });

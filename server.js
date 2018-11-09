const express = require('express');
const hbs = require('hbs');

let app = express();  // creates the app
let fs = require('fs'); 

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); // set - set express configurations 

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) 
      console.log('Unable to append to server.log.');
  });
  next();
})

app.use((req, res, next) => {
  res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Homepage',
    welcomeMessage: 'Welcome to my website',
    name: 'Tailine',
  });
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Me Page',
  });
})

app.get('/bad', (req, res) => {
  res.send({
    error: 'Bad request',
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
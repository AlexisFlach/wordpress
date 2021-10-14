const express = require('express');

const {api} = require('./api')

const path = require('path')
const hbs = require('express-handlebars')

const app = express();


const data = api.generatePosts();



app.engine('hbs', hbs({
  layoutsDir: __dirname + '/views/layouts/',
  extname: 'hbs',
  defaultLayout: 'index.hbs'
  }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

console.log(data)

app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
  res.render('main', {layout: 'index', title: "My Very Interesting Blog"});
})
app.get('/blog', (req, res) => {
  res.render('blog', {layout: 'index', data: data});
})

app.listen(4000, () => {
  console.log('Server listens on port 4000');
})
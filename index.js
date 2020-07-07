const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middlewear/logger');
const members = require('./Members')

const app = express();

//init middlewear
// app.use(logger);

// Handlebars Middlewear
app.engine('handlebars', exphbs( {defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middlewear 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home page route
app.get('/', (req, res) => res.render('index', {
    title: 'Members App',
    members
}));


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//Members api routes
app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
    console.log(`Server started on port ${PORT}`);
});
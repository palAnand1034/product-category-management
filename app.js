require('dotenv').config();

const express = require('express');
const path = require('path');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const app = express();
const PORT = process.env.PORT 

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('home'); 
});

app.use(categoryRoutes);
app.use(productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
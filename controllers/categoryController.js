const db = require('../config/db');

exports.getCategories = (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render('categories', { title: 'Categories', categories: result });
    });
};

exports.addCategory = (req, res) => {
    const { CategoryName } = req.body;
    const sql = 'INSERT INTO categories (CategoryName) VALUES (?)';
    db.query(sql, [CategoryName], (err) => {
        if (err) throw err;
        res.redirect('/categories');
    });
};

// Route to Update a Category
exports.updateCategory = (req, res) => {
    const { id } = req.params; 
    const { CategoryName } = req.body; 
    const sql = 'UPDATE categories SET CategoryName = ? WHERE CategoryId = ?';

    db.query(sql, [CategoryName, id], (err, result) => {
        if (err) {
            console.error('Error updating category:', err);
            return res.status(500).send('Server Error');
        }
        res.redirect('/categories'); 
    });
};

// Route to Delete a Category
exports.deleteCategory = (req, res) => {
    const CategoryId = req.params.id; 

    const sql = 'DELETE FROM categories WHERE CategoryId = ?';
    db.query(sql, [CategoryId], (err, result) => {
        if (err) throw err;
        res.redirect('/categories'); 
    });
};



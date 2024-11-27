const db = require('../config/db');

// Get Products with Pagination
exports.getProducts = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page
    const pageSize = parseInt(req.query.pageSize) || 10; // Records per page
    const offset = (page - 1) * pageSize;

    const sqlProducts = `
        SELECT products.ProductId, products.ProductName, categories.CategoryName, products.CategoryId
        FROM products
        INNER JOIN categories ON products.CategoryId = categories.CategoryId
        LIMIT ? OFFSET ?;
    `;
    const sqlCategories = `SELECT * FROM categories`; // Fetch all categories
    const countQuery = `SELECT COUNT(*) AS total FROM products`; // Total products for pagination

    db.query(countQuery, (err, countResult) => {
        if (err) throw err;

        const totalProducts = countResult[0].total;
        const totalPages = Math.ceil(totalProducts / pageSize);

        db.query(sqlProducts, [pageSize, offset], (err, productsResult) => {
            if (err) throw err;

            db.query(sqlCategories, (err, categoriesResult) => {
                if (err) throw err;

                res.render('products', {
                    title: 'Products',
                    products: productsResult,
                    categories: categoriesResult,
                    currentPage: page,
                    totalPages,
                });
            });
        });
    });
};

// Add Product
exports.addProduct = (req, res) => {
    const { ProductName, CategoryId } = req.body;
    const sql = 'INSERT INTO products (ProductName, CategoryId) VALUES (?, ?)';
    db.query(sql, [ProductName, CategoryId], (err) => {
        if (err) throw err;
        res.redirect('/products');
    });
};

// Delete Product
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE ProductId = ?';
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.redirect('/products');
    });
};

// Update Product
exports.updateProduct = (req, res) => {
    const { ProductId, ProductName, CategoryId } = req.body;
    const sql = `
        UPDATE products
        SET ProductName = ?, CategoryId = ?
        WHERE ProductId = ?;
    `;
    db.query(sql, [ProductName, CategoryId, ProductId], (err) => {
        if (err) throw err;
        res.redirect('/products');
    });
};

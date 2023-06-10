import pool from "../configs/connectDB";
import fs from 'fs';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');


let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM products');

    return res.render('index.ejs', { dataProduct: rows })

}
let getProductDetailPage = async (req, res) => {
    let productId = req.params.id;
    let [product] = await pool.execute(`select * from products where id = ?`, [productId]);
    return res.send(JSON.stringify(product))
}
let createNewProduct = async (req, res) => {
    let { name, infomation, price } = req.body;
    let image = req.file.filename; // Lấy tên file ảnh đã tải lên


    // Di chuyển file ảnh vào thư mục public/image trên máy chủ
    fs.renameSync(req.file.path, appRoot + "/src/public/image/" + image);

    // Lưu dữ liệu ảnh vào cơ sở dữ liệu
    await pool.execute(
        "INSERT INTO products (name, infomation, price, image) VALUES (?, ?, ?, ?)",
        [name, infomation, price, image]
    );

    return res.redirect("/");
};

let getCreateProductPage = (req, res) => {
    return res.render('createproducts.ejs'); // Render trang tạo sản phẩm
};
let getAdminproduct = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM products');

    return res.render('adminproduct.ejs', { dataProduct: rows })

}
let deleteProduct = async (req, res) => {
    let productId = req.body.productId;
    await pool.execute('delete from products where id = ?', [productId])
    return res.redirect("/Adminproduct");
}
let getEditProduct = async (req, res) => {
    let id = req.params.id;
    let [product] = await pool.execute('Select * from products where id = ?', [id]);
    return res.render('updateproducts.ejs', { dataProduct: product[0] }); // x <- y
}
let postUpdateProduct = async (req, res) => {
    let { name, infomation, price, id } = req.body;
    let image = req.file ? req.file.filename : ""; // Gán giá trị mặc định nếu không có tệp ảnh

    // Kiểm tra xem tệp ảnh đã tải lên thành công hay chưa
    if (req.file) {
        // Di chuyển tệp ảnh vào thư mục public/image trên máy chủ
        fs.renameSync(req.file.path, path.join(appRoot.path, "/src/public/image/", image));
    }

    // Cập nhật thông tin sản phẩm trong cơ sở dữ liệu
    await pool.execute(
        'UPDATE products SET name = ?, infomation = ?, price = ?, image = ? WHERE id = ?',
        [name, infomation, price, image, id]
    );

    return res.redirect('/Adminproduct');
}
/////////////////////////////////////////USERS//////////////////////////








module.exports = {
    getHomepage, getProductDetailPage, createNewProduct,
    getCreateProductPage, getAdminproduct, deleteProduct, getEditProduct, postUpdateProduct
}
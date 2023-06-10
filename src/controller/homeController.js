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
let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [userId]);
    return res.send(JSON.stringify(user))
}
let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    let img = req.file.filename; // Lấy tên file ảnh đã tải lên

    // Di chuyển file ảnh vào thư mục public/image trên máy chủ
    fs.renameSync(req.file.path, appRoot + "/src/public/image/" + img);

    // Lưu dữ liệu ảnh vào cơ sở dữ liệu
    await pool.execute(
        "INSERT INTO users (firstName, lastName, email, address, img) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, email, address, img]
    );

    return res.redirect("/employees");
};
let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId])
    return res.redirect("/employees");
}
let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('Select * from users where id = ?', [id]);
    return res.render('update.ejs', { dataUser: user[0] }); // x <- y
}
let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    let img = req.file ? req.file.filename : ""; // Gán giá trị mặc định nếu không có tệp ảnh

    // Kiểm tra xem tệp ảnh đã tải lên thành công hay chưa
    if (req.file) {
        // Di chuyển tệp ảnh vào thư mục public/image trên máy chủ
        fs.renameSync(req.file.path, appRoot + "/src/public/image/" + img);
    }

    // Cập nhật thông tin người dùng trong cơ sở dữ liệu
    await pool.execute('UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ?, img = ? WHERE id = ?',
        [firstName, lastName, email, address, img, id]);

    return res.redirect('/employees');
}

let getEmployeeFilePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('employee.ejs', { dataUser: rows })
}







module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, getEmployeeFilePage, getProductDetailPage, createNewProduct,
    getCreateProductPage, getAdminproduct, deleteProduct, getEditProduct, postUpdateProduct
}
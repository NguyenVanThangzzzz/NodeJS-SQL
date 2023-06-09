import pool from "../configs/connectDB";
import fs from 'fs';
import multer from 'multer';
var appRoot = require('app-root-path');


let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('index.ejs', { dataUser: rows })

}
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

    await pool.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [firstName, lastName, email, address, id]);

    return res.redirect('/');
}

let getEmployeeFilePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('employee.ejs', { dataUser: rows })
}







module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, getEmployeeFilePage
}
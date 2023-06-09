import pool from "../configs/connectDB";

import multer from 'multer';

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
    let { firstName, lastName, email, address, img } = req.body;

    await pool.execute('insert into users(firstName, lastName, email, address,img) values (?, ?, ?, ?,?)',
        [firstName, lastName, email, address, img]);

    return res.redirect('/')
}
let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId])
    return res.redirect('/');
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
let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}
let getUsersFilePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('user.ejs', { dataUser: rows })
}
///////////////////////////////////////

let handleUploadFile = async (req, res) => {
    try {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error occurred during file upload');
    }
}






module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, getUploadFilePage, handleUploadFile, getUsersFilePage
}
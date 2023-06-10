import express from "express";
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });



const initWebRoute = (app) => {


    router.get('/', homeController.getHomepage);
    router.get('/detail/product/:id', homeController.getProductDetailPage)
    router.get('/create', homeController.getCreateProductPage);
    router.post('/create-new-product', upload.single('image'), homeController.createNewProduct);
    router.get('/Adminproduct', homeController.getAdminproduct);
    router.post('/delete-product', homeController.deleteProduct);
    router.get('/edit-product/:id', homeController.getEditProduct);
    router.post('/update-product', [upload.single('image'), homeController.postUpdateProduct]);
    ////////////////////////////////////////////////////////////
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.post('/create-new-user', upload.single('img'), homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', [upload.single('img'), homeController.postUpdateUser]);

    router.get('/employees', homeController.getEmployeeFilePage);


    return app.use('/', router)

}
export default initWebRoute;

import express from 'express'
import AdminShopsController from '../../../controllers/web/admin/shops.controller.js'
import multer from 'multer'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // fs.mkdirsSync(__dirname + 'public/uploads')
        cb(null, process.env.PWD + '/public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
        // console.log(process)

        cb(null, Date.now() + '-' + file.originalname)
    }
})

let upload = multer({ storage: storage})
// const upload = multer({ dest: 'public/uploads/' })


const adminShopsRoutes = express.Router()

adminShopsRoutes
    .route('/')
    .get(AdminShopsController.adminShops)

adminShopsRoutes
    .get('/shops', AdminShopsController.adminGetShops)

adminShopsRoutes
    .get('/shops/add', AdminShopsController.adminGetShopsAdd)

adminShopsRoutes
    .post('/shops/add', upload.single('image'), AdminShopsController.adminPostShopsAdd)

adminShopsRoutes
    .post('/shops/:key/edit', AdminShopsController.adminPostShopsEdit)

adminShopsRoutes
    .get('/shops/:key/edit', AdminShopsController.adminGetShopsEdit)

adminShopsRoutes
    .get('/shops/:key/delete', AdminShopsController.adminGetShopsDelite)

export default adminShopsRoutes
import express from 'express'
import AdminProfileController from '../../../controllers/admin/profile.controller.js'

const adminProfileRoutes = express.Router()

adminProfileRoutes
    .route('/')
    .get(AdminProfileController.adminProfile)

adminProfileRoutes

    .get('/profile', AdminProfileController.adminGetProfile)

adminProfileRoutes
    .get('/profile/:id', AdminProfileController.getDetailProfile)

adminProfileRoutes
    .get('/profile', AdminProfileController.adminGetProfileSingle)

adminProfileRoutes
    .post('/profile/:id', AdminProfileController.adminPostProfile)


export default adminProfileRoutes
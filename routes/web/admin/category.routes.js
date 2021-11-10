import express from 'express'
import AdminCategoryController from '../../../controllers/admin/category.controller.js'

const adminCategoryRoutes = express.Router()

adminCategoryRoutes
    .route('/')
    .get(AdminCategoryController.adminCategory)

adminCategoryRoutes
    .get('/category', AdminCategoryController.adminGetCategory)

adminCategoryRoutes
    .get('/category/:key', AdminCategoryController.getDetailCategory)

adminCategoryRoutes
    .get('/category/:key/delete', AdminCategoryController.adminGetCategoryDelite)

export default adminCategoryRoutes
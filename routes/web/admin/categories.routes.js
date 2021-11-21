import express from 'express'
import AdminCategoryController from '../../../controllers/web/admin/categories.controller.js'

const adminCategoryRoutes = express.Router()

adminCategoryRoutes
    .route('/')
    .get(AdminCategoryController.adminCategory)

adminCategoryRoutes
    .get('/categories', AdminCategoryController.adminGetCategory)

adminCategoryRoutes
    .get('/categories/:key', AdminCategoryController.getDetailCategory)

adminCategoryRoutes
    .get('/categories/:key/delete', AdminCategoryController.adminGetCategoryDelite)

export default adminCategoryRoutes
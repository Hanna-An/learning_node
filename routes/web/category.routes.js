import express from 'express'
import CategoryController from '../../controllers/category.controller.js'

const categoryRoutes = express.Router()

categoryRoutes
    .route('/')
    .get(CategoryController.getCategory)

categoryRoutes
    .get('/:key', CategoryController.getDetailCategory)

categoryRoutes
    .get('/:key/:key_product', CategoryController.getCategoryProduct)

export default categoryRoutes
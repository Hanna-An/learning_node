import express from 'express'
import CategoriesController from '../../controllers/web/categories.controller.js'

const categoriesRoutes = express.Router()

categoriesRoutes
    .route('/')
    .get(CategoriesController.getCategory)

categoriesRoutes
    .get('/:key', CategoriesController.getDetailCategory)

categoriesRoutes
    .get('/:key/:key_product', CategoriesController.getCategoryProduct)

export default categoriesRoutes
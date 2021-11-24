import express from 'express'
import CategoriesController from '../../controllers/api/categories.controller.js'

const categoriesRoutes = express.Router()

categoriesRoutes
    .route('/')
    .get(CategoriesController.getCategories)

categoriesRoutes
    .get('/:key', CategoriesController.getDetailCategories)

export default categoriesRoutes
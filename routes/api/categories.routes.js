import express from 'express'
import CategoriesController from '../../controllers/api/categories.controller.js'

const categoriesRoutes = express.Router()

/**
 * @openapi
 * /categories:
 *  get:
 *      tags:
 *      - name: "categories"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

categoriesRoutes
    .route('/')
    .get(CategoriesController.getCategories)

categoriesRoutes
    .get('/:id', CategoriesController.getDetailCategories)

export default categoriesRoutes
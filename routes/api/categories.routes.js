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

/**
 * @openapi
 * /categories/:id:
 *  delete:
 *      tags:
 *      - name: "categories"
 *
 */

categoriesRoutes
    .delete('/categories/:id', CategoriesController.categoryDelete)

export default categoriesRoutes
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

/**
 * @openapi
 * /categories/{:categoryKey}:
 *  get:
 *      tags:
 *      - name: "categories/{:categoryKey}"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

categoriesRoutes
    .get('/:key', CategoriesController.getDetailCategories)

export default categoriesRoutes
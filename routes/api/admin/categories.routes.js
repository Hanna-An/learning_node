import express from 'express'
import AdminCategoryController from '../../../controllers/api/admin/categories.controller.js'

const adminCategoryRoutes = express.Router()

/**
 * @openapi
 * /categories:
 *  get:
 *      tags:
 *      - name: "admin"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

adminCategoryRoutes
    .route('/')
    .get(AdminCategoryController.adminCategory)

adminCategoryRoutes
    .get('/categories/:id', AdminCategoryController.getDetailCategory)

/**
 * @openapi
 * /categories:
 *  delete:
 *      tags:
 *      - name: "admin"
 *
 */

adminCategoryRoutes
    .delete('/categories/:id', AdminCategoryController.adminCategoryDelete)

export default adminCategoryRoutes
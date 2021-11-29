import express from 'express'
import AdminProductsController from '../../../controllers/api/admin/products.controller.js'

const adminProductsRoutes = express.Router()

/**
 * @openapi
 * /products:
 *  get:
 *      tags:
 *      - name: "admin"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

adminProductsRoutes
    .route('/')
    .get(AdminProductsController.adminProducts)

adminProductsRoutes
    .get('/products/:id', AdminProductsController.getDetailProduct)

/**
 * @openapi
 * /products:
 *  delete:
 *      tags:
 *      - name: "admin"
 *
 */

adminProductsRoutes
    .delete('/products/:id', AdminProductsController.adminProductDelete)

export default adminProductsRoutes
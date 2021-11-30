import express from 'express'
import ProductsController from '../../controllers/api/products.controller.js'

const productsRoutes = express.Router()

/**
 * @openapi
 * /products:
 *  get:
 *      tags:
 *      - name: "products"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

productsRoutes
    .route('/popular')
    .get(ProductsController.getProducts)

productsRoutes
    .get('/:id', ProductsController.getDetailProducts)

/**
 * @openapi
 * /products/:id:
 *  delete:
 *      tags:
 *      - name: "products"
 *
 */

productsRoutes
    .delete('/products/:id', ProductsController.productDelete)


export default productsRoutes
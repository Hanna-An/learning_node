import express from 'express'
import ProductsController from '../../controllers/api/products.controller.js'

const productsRoutes = express.Router()

productsRoutes
    .route('/popular')
    .get(ProductsController.getProducts)

productsRoutes
    .get('/:key', ProductsController.getDetailProducts)

export default productsRoutes
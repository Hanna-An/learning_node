import express from 'express'
import ShopsController from '../../controllers/web/shops.controller.js'

const shopsRoutes = express.Router()

shopsRoutes
    .route('/')
    .get(ShopsController.getShops)

shopsRoutes
    .get('/:key', ShopsController.getDetailShops)

// shopsRoutes
//     .get('cart', ShopsController.getCartShops)

export default shopsRoutes
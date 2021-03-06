import express from 'express'
import HomeController from '../../controllers/web/home.controller.js'

const homeRoutes = express.Router()

homeRoutes
    .route('/')
    .get(HomeController.getHome)

homeRoutes
    .get('//:key', HomeController.getDetailHome)

export default homeRoutes
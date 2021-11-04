import express from 'express'
import NewsController from '../../controllers/news.controller.js'

const newsRoutes = express.Router()

newsRoutes
    .route('/')
    .get(NewsController.getNews)

newsRoutes
    .get('/:key', NewsController.getDetailNews)

export default newsRoutes
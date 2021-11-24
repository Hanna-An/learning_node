import express from 'express'
import NewsController from '../../controllers/api/news.controller.js'

const newsRoutes = express.Router()

newsRoutes
    .route('/')
    .get(NewsController.getNews)

export default newsRoutes
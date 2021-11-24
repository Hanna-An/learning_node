import express from 'express'
import ArticlesController from '../../controllers/api/articles.controller.js'

const articlesRoutes = express.Router()

articlesRoutes
    .route('/')
    .get(ArticlesController.getArticles)

articlesRoutes
    .get('/:key', ArticlesController.getDetailArticles)

export default articlesRoutes
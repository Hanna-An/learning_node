import express from 'express'
import ArticlesController from '../../controllers/web/articles.controller.js'

const articlesRoutes = express.Router()

articlesRoutes
    .route('/')
    .get(ArticlesController.getArticles)

articlesRoutes
    .get('/:key', ArticlesController.getDetailArticles)

export default articlesRoutes
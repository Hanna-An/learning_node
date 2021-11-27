import express from 'express'
import AdminArticlesController from '../../../controllers/api/admin/articles.controller.js'

const adminArticlesRoutes = express.Router()

adminArticlesRoutes
    .route('/')
    .get(AdminArticlesController.adminArticles)

adminArticlesRoutes
    .post('/articles', AdminArticlesController.adminCreateArticle)

adminArticlesRoutes
    .put('/articles/:id', AdminArticlesController.adminArticleEdit)

adminArticlesRoutes
    .get('/articles/:id', AdminArticlesController.adminGetArticle)

adminArticlesRoutes
    .delete('/articles/:id', AdminArticlesController.adminArticlesDelite)

export default adminArticlesRoutes
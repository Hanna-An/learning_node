import express from 'express'
import AdminArticlesController from '../../../controllers/web/admin/articles.controller.js'

const adminArticlesRoutes = express.Router()

adminArticlesRoutes
    .route('/')
    .get(AdminArticlesController.adminArticles)

adminArticlesRoutes
    .get('/articles', AdminArticlesController.adminGetArticles)

adminArticlesRoutes
    .get('/articles/add', AdminArticlesController.adminGetArticlesAdd)

adminArticlesRoutes
    .post('/articles/add', AdminArticlesController.adminPostArticlesAdd)

adminArticlesRoutes
    .post('/articles/:key/edit', AdminArticlesController.adminPostArticlesEdit)

adminArticlesRoutes
    .get('/articles/:key/edit', AdminArticlesController.adminGetArticlesEdit)

adminArticlesRoutes
    .get('/articles/:key/delete', AdminArticlesController.adminGetArticlesDelite)

export default adminArticlesRoutes
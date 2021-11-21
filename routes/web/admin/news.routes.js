import express from 'express'
import AdminNewsController from '../../../controllers/web/admin/news.controller.js'

const adminNewsRoutes = express.Router()

adminNewsRoutes
    .route('/')
    .get(AdminNewsController.adminNews)

adminNewsRoutes
    .get('/news', AdminNewsController.adminGetNews)

adminNewsRoutes
    .get('/news/add', AdminNewsController.adminGetNewsAdd)

adminNewsRoutes
    .post('/news/add', AdminNewsController.adminPostNewsAdd)

adminNewsRoutes
    .post('/news/:key/edit', AdminNewsController.adminPostNewsEdit)

adminNewsRoutes
    .get('/news/:key/edit', AdminNewsController.adminGetNewsEdit)

adminNewsRoutes
    .get('/news/:key/delete', AdminNewsController.adminGetNewsDelite)

export default adminNewsRoutes
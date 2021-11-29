import express from 'express'
import AdminArticlesController from '../../../controllers/api/admin/articles.controller.js'

const adminArticlesRoutes = express.Router()

/**
 * @openapi
 * /articles:
 *  get:
 *      tags:
 *      - name: "admin"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

adminArticlesRoutes
    .route('/')
    .get(AdminArticlesController.adminArticles)

adminArticlesRoutes
    .get('/articles/:id', AdminArticlesController.adminGetArticle)

/**
 * @openapi
 * /articles:
 *  post:
 *      tags:
 *      - name: "admin"
 *      requestBody:
 *          content:
 *               'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          image:
 *                              type: string
 *                          description:
 *                              type: string
 *                          key:
 *                              type: string
 *
 */

adminArticlesRoutes
    .post('/articles', AdminArticlesController.adminCreateArticle)

/**
 * @openapi
 * /articles:
 *  put:
 *      tags:
 *      - name: "admin"
 *      requestBody:
 *          content:
 *               'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          image:
 *                              type: string
 *                          description:
 *                              type: string
 *                          key:
 *                              type: string
 *
 */

adminArticlesRoutes
    .put('/articles/:id', AdminArticlesController.adminArticleEdit)

/**
 * @openapi
 * /articles/:id:
 *  delete:
 *      tags:
 *      - name: "admin"
 *
 */

adminArticlesRoutes
    .delete('/articles/:id', AdminArticlesController.adminArticlesDelite)

export default adminArticlesRoutes
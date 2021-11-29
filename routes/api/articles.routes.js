import express from 'express'
import ArticlesController from '../../controllers/api/articles.controller.js'

const articlesRoutes = express.Router()

/**
 * @openapi
 * /articles:
 *  get:
 *      tags:
 *      - name: "articles"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

articlesRoutes
    .route('/')
    .get(ArticlesController.getArticles)

articlesRoutes
    .get('/:key', ArticlesController.getDetailArticles)

/**
 * @openapi
 * /articles:
 *  post:
 *      tags:
 *      - name: "articles"
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

articlesRoutes
    .post('/articles', ArticlesController.createArticle)

/**
 * @openapi
 * /articles/:id:
 *  put:
 *      tags:
 *      - name: "articles"
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

articlesRoutes
    .put('/articles/:id', ArticlesController.articleEdit)

/**
 * @openapi
 * /articles/:id:
 *  delete:
 *      tags:
 *      - name: "articles"
 *
 */

articlesRoutes
    .delete('/articles/:id', ArticlesController.articlesDelite)

export default articlesRoutes
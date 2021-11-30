import express from 'express'
import NewsController from '../../controllers/api/news.controller.js'

const newsRoutes = express.Router()

/**
 * @openapi
 * /news:
 *  get:
 *      tags:
 *      - name: "news"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

newsRoutes
    .route('/')
    .get(NewsController.getNews)

// newsRoutes
//     .get('/:key', NewsController.getDetailNews)

/**
 * @openapi
 * /news:
 *  post:
 *      tags:
 *      - name: "news"
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
 *                          preview_description:
 *                              type: string
 *                          publish_date:
 *                              type: string
 *
 */

newsRoutes
    .post('/news', NewsController.createNews)

/**
 * @openapi
 * /news/:id:
 *  put:
 *      tags:
 *      - name: "news"
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

newsRoutes
    .put('/news/:id', NewsController.newsEdit)

/**
 * @openapi
 * /news/:id:
 *  delete:
 *      tags:
 *      - name: "news"
 *
 */

newsRoutes
    .delete('/news/:id', NewsController.newsDelete)

export default newsRoutes
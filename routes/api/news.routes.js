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

export default newsRoutes
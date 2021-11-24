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

/**
 * @openapi
 * /articles/{:articlesKey}:
 *  get:
 *      tags:
 *      - name: "articles/{:articlesKey}"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

articlesRoutes
    .get('/:key', ArticlesController.getDetailArticles)

export default articlesRoutes
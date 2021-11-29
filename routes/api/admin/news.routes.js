import express from 'express'
import AdminNewsController from '../../../controllers/api/admin/news.controller.js'

const adminNewsRoutes = express.Router()

/**
 * @openapi
 * /news:
 *  get:
 *      tags:
 *      - name: "admin"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

adminNewsRoutes
    .route('/')
    .get(AdminNewsController.adminNews)

adminNewsRoutes
    .get('/news/:id', AdminNewsController.adminGetNews)

/**
 * @openapi
 * /news:
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

adminNewsRoutes
    .post('/news', AdminNewsController.adminCreateNews)

/**
 * @openapi
 * /news:
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

adminNewsRoutes
    .put('/news/:id', AdminNewsController.adminNewsEdit)

/**
 * @openapi
 * /news:
 *  delete:
 *      tags:
 *      - name: "admin"
 *
 */

adminNewsRoutes
    .delete('/news/:id', AdminNewsController.adminNewsDelete)

export default adminNewsRoutes
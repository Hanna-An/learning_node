import express from 'express'
import SubscribeController from '../../controllers/api/subscribe.controller.js'

const subscribeRoutes = express.Router()

/**
 * @openapi
 * /subscribe:
 *  post:
 *      tags:
 *      - name: "subscribe"
 *      requestBody:
 *          content:
 *              'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *
 */

subscribeRoutes
    .route('/')
    .post(SubscribeController.postSubscribe)

export default subscribeRoutes
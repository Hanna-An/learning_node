import express from 'express'
import LoginController from '../../controllers/api/login.controller.js'

const loginRoutes = express.Router()

/**
 * @openapi
 * /login:
 *  post:
 *      tags:
 *      - name: "login"
 *      requestBody:
 *          content:
 *               'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *
 */

loginRoutes
    .route('/')
    .post(LoginController.postLogin)

export default loginRoutes
import express from 'express'
import SignupController from '../../controllers/api/signup.controller.js'

const signupRoutes = express.Router()

/**
 * @openapi
 * /signup:
 *  post:
 *      tags:
 *      - name: "signup"
 *      requestBody:
 *          content:
 *              'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *
 */

signupRoutes
    .route('/')
    .post(SignupController.postSignup)

export default signupRoutes
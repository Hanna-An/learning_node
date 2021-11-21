import express from 'express'
import SignupController from '../../controllers/web/signup.controller.js'

const signupRoutes = express.Router()

signupRoutes
    .route('/')
    .get(SignupController.getSignup)

    .post(SignupController.postSignup)

export default signupRoutes

import express from 'express'
import SignupController from '../../controllers/api/signup.controller.js'

const signupRoutes = express.Router()

signupRoutes
    .route('/')
    .post(SignupController.postSignup)

export default signupRoutes
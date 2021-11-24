import express from 'express'
import LoginController from '../../controllers/api/login.controller.js'

const loginRoutes = express.Router()

loginRoutes
    .route('/')
    .post(LoginController.postLogin)

export default loginRoutes
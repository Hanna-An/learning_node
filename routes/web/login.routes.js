import express from 'express'
import LoginController from '../../controllers/login.controller.js'

const loginRoutes = express.Router()

loginRoutes
    .route('/')
    .get(LoginController.getLogin)

    .post(LoginController.postLogin)

export default loginRoutes
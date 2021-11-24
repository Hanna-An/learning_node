import express from 'express'
import FileController from '../../controllers/api/file.controller.js'

const fileRoutes = express.Router()

fileRoutes
    .route('/')
    .post(FileController.postFile)

export default fileRoutes
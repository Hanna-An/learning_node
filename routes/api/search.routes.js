import express from 'express'
import SearchController from '../../controllers/api/search.controller.js'

const searchRoutes = express.Router()

searchRoutes
    .route('/')
    .get(SearchController.getSearch)

export default searchRoutes
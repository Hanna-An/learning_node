import express from 'express'
import VacanciesController from '../../controllers/api/vacancies.controller.js'

const vacanciesRoutes = express.Router()

vacanciesRoutes
    .route('/')
    .get(VacanciesController.getVacancies)

vacanciesRoutes
    .get('/:key', VacanciesController.getDetailVacancies)

export default vacanciesRoutes
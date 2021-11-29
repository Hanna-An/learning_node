import express from 'express'
import AdminVacanciesController from '../../../controllers/api/admin/vacancies.controller.js'

const adminVacanciesRoutes = express.Router()

/**
 * @openapi
 * /vacancies:
 *  get:
 *      tags:
 *      - name: "admin"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

adminVacanciesRoutes
    .route('/')
    .get(AdminVacanciesController.adminVacancies)

adminVacanciesRoutes
    .get('/vacancies/:id', AdminVacanciesController.getDetailVacancy)

/**
 * @openapi
 * /vacancies:
 *  delete:
 *      tags:
 *      - name: "admin"
 *
 */

adminVacanciesRoutes
    .delete('/vacancies/:id', AdminVacanciesController.adminVacancyDelete)

export default adminVacanciesRoutes
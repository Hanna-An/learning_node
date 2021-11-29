import express from 'express'
import VacanciesController from '../../controllers/api/vacancies.controller.js'

const vacanciesRoutes = express.Router()

/**
 * @openapi
 * /vacancies:
 *  get:
 *      tags:
 *      - name: "vacancies"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

vacanciesRoutes
    .route('/')
    .get(VacanciesController.getVacancies)

vacanciesRoutes
    .get('/:id', VacanciesController.getDetailVacancies)

/**
 * @openapi
 * /vacancies/:id:
 *  delete:
 *      tags:
 *      - name: "admin"
 *
 */

vacanciesRoutes
    .delete('/vacancies/:id', VacanciesController.vacancyDelete)


export default vacanciesRoutes
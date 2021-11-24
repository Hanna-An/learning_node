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

/**
 * @openapi
 * /vacancies/{:vacancyKey}:
 *  get:
 *      tags:
 *      - name: "vacancies/{:vacancyKey}"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

vacanciesRoutes
    .get('/:key', VacanciesController.getDetailVacancies)

export default vacanciesRoutes
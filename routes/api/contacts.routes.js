import express from 'express'
import ContactsController from '../../controllers/api/contacts.controller.js'

const contactsRoutes = express.Router()

/**
 * @openapi
 * /contacts:
 *  post:
 *      tags:
 *      - name: "contacts"
 *      requestBody:
 *          content:
 *               'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          message:
 *                              type: string
 *
 */

contactsRoutes
    .route('/')
    .post(ContactsController.postContacts)

export default contactsRoutes
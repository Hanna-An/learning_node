import express from 'express'
import ContactsController from '../../controllers/api/contacts.controller.js'

const contactsRoutes = express.Router()

contactsRoutes
    .route('/')
    .post(ContactsController.postContacts)

export default contactsRoutes
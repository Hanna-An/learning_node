import express from 'express'
import ProfileController from '../../controllers/web/profile.controller.js'

const profileRoutes = express.Router()

profileRoutes
    .route('/:id')
    .get(ProfileController.getProfile)

profileRoutes
    .get('/', ProfileController.getDetailProfile)

profileRoutes
    .post('/:id', ProfileController.postDetailProfile)

export default profileRoutes
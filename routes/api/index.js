import express from 'express'
import bcrypt from 'bcrypt'
import {ObjectID} from "mongodb"
import multer from 'multer'

import signupRoutes from './signup.routes.js'
import loginRoutes from './login.routes.js'
import contactsRoutes from './contacts.routes.js'
import searchRoutes from './search.routes.js'
import newsRoutes from './news.routes.js'
import articlesRoutes from './articles.routes.js'
import categoriesRoutes from './categories.routes.js'
import productsRoutes from './products.routes.js'
import vacanciesRoutes from './vacancies.routes.js'
import fileRoutes from './file.routes.js'
import subscribeRoutes from './subscribe.routes.js'
import adminArticlesRoutes from "./admin/articles.routes.js"
import adminCategoriesRoutes from "./admin/categories.routes.js"
import adminNewsRoutes from "./admin/news.routes.js"
import adminProductsRoutes from "./admin/products.routes.js"
import adminVacanciesRoutes from "./admin/vacancies.routes.js"

let apiRoutes = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(process.env.PWD + '/public/uploads')
        cb(null, process.env.PWD + '/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
let upload = multer({ storage: storage, limits: {
        fileSize: 2 * 1024 * 1024
    }})

apiRoutes.use('/signup', signupRoutes)
apiRoutes.use('/login', loginRoutes)
apiRoutes.use('/contacts', contactsRoutes)
apiRoutes.use('/search', searchRoutes)
apiRoutes.use('/news', newsRoutes)
apiRoutes.use('/articles', articlesRoutes)
apiRoutes.use('/categories', categoriesRoutes)
apiRoutes.use('/products', productsRoutes)
apiRoutes.use('/vacancies', vacanciesRoutes)
apiRoutes.use('/file', upload.single('file'), fileRoutes)
apiRoutes.use('/subscribe', subscribeRoutes)
apiRoutes.use('/admin', adminArticlesRoutes)
apiRoutes.use('/admin', adminCategoriesRoutes)
apiRoutes.use('/admin', adminNewsRoutes)
apiRoutes.use('/admin', adminProductsRoutes)
apiRoutes.use('/admin', adminVacanciesRoutes)


export default apiRoutes


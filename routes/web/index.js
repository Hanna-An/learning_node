import express from 'express'
import homeRoutes from './home.routes.js'
import categoriesRoutes from './categories.routes.js'
import profileRoutes from './profile.routes.js'
import signupRoutes from './signup.routes.js'
import loginRoutes from './login.routes.js'
import newsRoutes from './news.routes.js'
import articlesRoutes from './articles.routes.js'
import shopsRoutes from './shops.routes.js'
import adminShopsRoutes from "./admin/shops.routes.js"
import adminNewsRoutes from "./admin/news.routes.js"
import adminArticlesRoutes from "./admin/articles.routes.js"
import adminCategoryRoutes from "./admin/categories.routes.js"
import adminProfileRoutes from "./admin/profile.routes.js"
import bcrypt from "bcrypt";


let webRoutes = express.Router()

webRoutes.use('/', homeRoutes)
webRoutes.use('/categories', categoriesRoutes)
webRoutes.use('/profile', profileRoutes)
webRoutes.use('/signup', signupRoutes)
webRoutes.use('/login', loginRoutes)
webRoutes.use('/news', newsRoutes)
webRoutes.use('/articles', articlesRoutes)
webRoutes.use('/shops', shopsRoutes)
webRoutes.use('/admin', adminShopsRoutes)
webRoutes.use('/admin', adminNewsRoutes)
webRoutes.use('/admin', adminArticlesRoutes)
webRoutes.use('/admin', adminCategoryRoutes)
webRoutes.use('/admin', adminProfileRoutes)


webRoutes.get('/cart', async (req, res) => {
    res.render('cart')
})

export default webRoutes








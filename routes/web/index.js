import express from 'express'
import homeRoutes from './home.routes.js'
import categoryRoutes from './category.routes.js'
import profileRoutes from './profile.routes.js'
import loginRoutes from './login.routes.js'
import newsRoutes from './news.routes.js'
import articlesRoutes from './articles.routes.js'
import shopsRoutes from './shops.routes.js'
import adminShopsRoutes from "./admin/shops.routes.js"
import adminNewsRoutes from "./admin/news.routes.js"
import adminArticlesRoutes from "./admin/articles.routes.js"
import adminCategoryRoutes from "./admin/category.routes.js"
import adminProfileRoutes from "./admin/profile.routes.js"
import bcrypt from "bcrypt";


let webRoutes = express.Router()

webRoutes.use('/', homeRoutes)
webRoutes.use('/category', categoryRoutes)
webRoutes.use('/profile', profileRoutes)
webRoutes.use('/login', loginRoutes)
webRoutes.use('/news', newsRoutes)
webRoutes.use('/articles', articlesRoutes)
webRoutes.use('/shops', shopsRoutes)
webRoutes.use('/admin', adminShopsRoutes)
webRoutes.use('/admin', adminNewsRoutes)
webRoutes.use('/admin', adminArticlesRoutes)
webRoutes.use('/admin', adminCategoryRoutes)
webRoutes.use('/admin', adminProfileRoutes)


webRoutes.get('/signup', async (req, res) => {
    res.render('signup')
})

webRoutes.post('/signup', async (req, res) => {
    const body = req.body
    console.log(body)
    let errors = []
    const salt = await bcrypt.genSalt(10)
    let emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    let emailValue = body.email
    if (body.name === undefined || body.name.length < 3) {
        errors.push('Имя не должно быть короче 3 символов')
    }
    if (body.email === undefined) {
        errors.push('Введите email')
    }
    if (!emailRe.test(emailValue)) {
        errors.push('Введите корректный email')
    }
    if (body.password === undefined || body.password.length < 3) {
        errors.push('Пароль должен содержать не менее 3 символов')
    }
    if (errors.length > 0){
        res.send({errors: errors})
        return
    }
    console.log(req.body)
    await global.db.collection('users').insert({
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, salt)
    })
    res.redirect('/login')
})

webRoutes.get('/cart', async (req, res) => {
    res.render('cart')
})

export default webRoutes








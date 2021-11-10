import express from 'express'
import {ObjectId, ObjectID} from 'mongodb'
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

// webRoutes.get('/admin', async (req, res) => {
//     let arr = await global.db.collection('shops').find().toArray()
//     arr.forEach(function (item) {
//         item.url = req._parsedOriginalUrl.pathname + '/' + item.key
//     })
//     res.render('admin', {title: 'admin'})
// })

// webRoutes.get('/admin/shops', async (req, res) => {
//     let arr = await global.db.collection('shops').find().toArray()
//     arr.forEach(function (item) {
//         item.url = req._parsedOriginalUrl.pathname + '/' + item.key + '/edit'
//     })
//     res.render('admin/shops', {title: 'admin', shops: arr})
// })

// webRoutes.get('/admin/shops/add', async (req, res) => {
//     res.render('admin/shops/add', {})
// })

// webRoutes.post('/admin/shops/add', upload.single('image'), async (req, res) => {
//     console.log(req.file)
//     console.log(req.body)
//     const id = crypto.randomBytes(16).toString("hex")
//     console.log(id)
//     const body = req.body
//     // await global.db.collection('shops').insert({
//     //     title: body.title,
//     //     address: body.address,
//     //     image: '',
//     //     description: body.description,
//     //     key: body.title.replace(' ', '_')
//     // })
//     res.redirect('/admin/shops')
// })

// webRoutes.post('/admin/shops/:key/edit', async (req, res) => {
//     const body = req.body
//     let errors = []
//     let shops = await global.db.collection('shops').findOne({key: req.params.key})
//     if (!shops) {
//         throw new Error('404')
//     }
//     if (body.address === undefined || body.address.length === 0) {
//         errors.push('Введите адрес')
//     }
//     if (body.description.length > 300) {
//         errors.push('Описание не должно превышать 300 символов')
//     }
//     if (body.image === undefined || body.image.length === 0) {
//         errors.push('Введите ссылку на фото')
//     }
//     try {
//         await axios.get(body.image)
//     } catch (e) {
//         errors.push('Ссылка недоступна')
//     }
//     if (errors.length > 0) {
//         res.render('admin/shops/_key_edit', {shops: shops, errors: errors})
//     }
//     await global.db.collection('shops').update(
//         {key: req.params.key},
//         {
//             $set : {
//                 title: body.title,
//                 address: body.address,
//                 image: body.image,
//                 description: body.description,
//             }
//         },
//     )
//     res.redirect('/admin/shops')
// })

// webRoutes.get('/admin/shops/:key/edit', async (req, res) => {
//     let shops = await global.db.collection('shops').findOne({key: req.params.key})
//     console.log(shops)
//     if (shops) {
//         res.render('admin/shops/_key_edit', {shops: shops})
//     } else {
//         throw new Error('404')
//     }
// })
//
// webRoutes.get('/admin/shops/:key/delete', async (req, res) => {
//     await global.db.collection('shops').deleteOne({key: req.params.key})
//     res.redirect('/admin/shops')
// })

webRoutes.get('/cart', async (req, res) => {
    res.render('cart')
})

export default webRoutes








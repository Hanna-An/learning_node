import express from 'express'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import {ObjectId, ObjectID} from 'mongodb'
import newsRoutes from './news.routes.js'
import articlesRoutes from './articles.routes.js'


let webRoutes = express.Router()

webRoutes.use('/news', newsRoutes)
webRoutes.use('/articles', articlesRoutes)

webRoutes.get('/home', async (req, res) => {
    const limit = 3
    let arr = await global.db.collection('news').find().sort({_id: -1}).limit(limit).toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
    })
    res.render('home', {title: 'news', news: arr})
})

webRoutes.get('/home/:key', async (req, res) => {
    let articles = await global.db.collection('articles').findOne({key: req.params.key})
    if (articles) {
        res.render('home/_key', {articles: articles})
    } else {
        throw new Error('404')
    }
})

webRoutes.get('/cars', async (req, res) => {
    let arr = await global.db.collection('cars').find().toArray()
    res.render('cars', {title: 'cars', cars: arr})
})

webRoutes.get('/shops', async (req, res) => {
    let arr = await global.db.collection('shops').find().toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        console.log(item.key)
    })
    res.render('shops', {title: 'shops', shops: arr})
})
webRoutes.get('/shops/:key', async (req, res) => {
    let shops = await global.db.collection('shops').findOne({key: req.params.key})
    if (shops) {
        res.render('shops/_key', {shops: shops})
        } else {
            throw new Error('404')
        }
})

webRoutes.get('/category', async (req, res) => {
    let category = await global.db.collection('categories').find()
    if (category) {
        res.render('category')
    } else {
        throw new Error('404')
    }
})

webRoutes.get('/category/:key', async (req, res) => {
    let category = await global.db.collection('categories').findOne({key: req.params.key})
    if (category) {
        let products = await global.db.collection('products').find({category_id: category._id}).toArray()
        products.forEach(function (product) {
            product.url = req._parsedOriginalUrl.path + '/' + product.key
        })
        res.render('category/_key', {title: category.title, products: products})
    } else {
        throw new Error('404')
    }
})

webRoutes.get('/category/:key/:key_product', async (req, res) => {
    let category = await global.db.collection('categories').findOne({key: req.params.key})
    if (category) {
        let product = await global.db.collection('products').findOne({category_id: category._id, key: req.params.key_product})
        if (product) {
            res.render('category/_key_product', {title: category.title, product: product})
        } else {
            throw new Error('404')
        }
    } else {
        throw new Error('404')
    }
})

const upload = multer({
    dest: "./uploads"
})

webRoutes.get('/profile/:id', async (req, res) => {
    console.log(req.params.id)
    let profile = await global.db.collection('users').findOne({_id: new ObjectID(req.params.id)})
    console.log(profile)
    if (profile) {
        res.render('profile/_id', {profile: profile})
    } else {
        throw new Error('404')
    }
})

webRoutes.get('/profile', async (req, res) => {
        let profile = await global.db.collection('users').findOne()
        res.render('profile', {title: 'Profile', profile: profile})
    })

webRoutes.post('/profile/:id', async (req, res) => {
    const body = req.body
    await global.db.collection('users').update(
        {_id: new ObjectID(req.params.id)},
        {
            $set: {
                name: body.name,
                surname: body.surname,
                image: body.image
            }
        },
    )
    res.redirect('/profile')

        // const tempPath = req.file.path
        // const targetPath = path.join('./public/uploads', req.file.originalname)
        //
        // fs.rename(tempPath, targetPath, err => {
        //     if (err) return handleError(err, res)
        //
        //     res.render('profile', {title: 'profile', image: '/uploads/' + req.file.originalname})
        // })
    })

webRoutes.get('/login', async (req, res) => {
    res.render('login')
})

webRoutes.post('/login', async (req, res) => {
    console.log(req.body)
    res.send('ok')
})

webRoutes.get('/signup', async (req, res) => {
    res.render('signup')
})

webRoutes.get('/admin', async (req, res) => {
    let arr = await global.db.collection('users').find().toArray()
    res.render('admin', {title: 'admin'})
})

webRoutes.get('/admin/profile', async (req, res) => {
    let arr = await global.db.collection('users').find().toArray()
    res.render('admin/profile', {title: 'admin', profile: arr})
})


webRoutes.get('/admin/profile/:id', async (req, res) => {
    let profile = await global.db.collection('users').findOne({_id: new ObjectID(req.params.id)})
    if (profile) {
        res.render('admin/profile/_id', {profile: profile})
    } else {
        throw new Error('404')
    }
})

webRoutes.get('admin/profile', async (req, res) => {
    let profile = await global.db.collection('users').findOne()
    res.render('profile', {title: 'Profile', profile: profile})
})

webRoutes.post('/admin/profile/:id', async (req, res) => {
    const body = req.body
    await global.db.collection('users').update(
        {_id: new ObjectID(req.params.id)},
        {
            $set: {
                name: body.name,
                surname: body.surname,
                image: body.image
            }
        },
    )
    res.redirect('/admin/profile')
})

webRoutes.get('/admin', async (req, res) => {
    let arr = await global.db.collection('news').find().toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
    })
    res.render('admin', {title: 'admin'})
})

webRoutes.get('/admin/news', async (req, res) => {
    let arr = await global.db.collection('news').find().toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key + '/edit'
    })
    res.render('admin/news', {title: 'admin', news: arr})
})

webRoutes.get('/admin/news/add', async (req, res) => {
    res.render('admin/news/add', {})
})

webRoutes.post('/admin/news/add', async (req, res) => {
    console.log(req.body)
    const body = req.body
    await global.db.collection('news').insert({
        title: body.title,
        image: body.image_url,
        description: body.description,
        key: body.title.replace(' ', '_')
    })
    res.redirect('/admin/news')
})

webRoutes.post('/admin/news/:key/edit', async (req, res) => {
    console.log(req.body)
    const body = req.body
    await global.db.collection('news').update(
        {key: req.params.key},
        {
            $set : {
                title: body.title,
                image: body.image,
                description: body.description,
                key: body.title.replace(' ', '_')
            }
        },
    )
    res.redirect('/admin/news')
})

webRoutes.get('/admin/news/:key/edit', async (req, res) => {
    let news = await global.db.collection('news').findOne({key: req.params.key})
    if (news) {
        res.render('admin/news/_key_edit', {news: news})
    } else {
        throw new Error('404')
    }
})

webRoutes.get('/admin/news/:key/delete', async (req, res) => {
    await global.db.collection('news').deleteOne({key: req.params.key})
    res.redirect('/admin/news')
})

webRoutes.get('/admin', async (req, res) => {
    let arr = await global.db.collection('articles').find().toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
    })
    res.render('admin', {title: 'admin'})
})

webRoutes.get('/admin/articles', async (req, res) => {
    let arr = await global.db.collection('articles').find().toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key + '/edit'
    })
    res.render('admin/articles', {title: 'admin', articles: arr})
})

webRoutes.get('/admin/articles/add', async (req, res) => {
    res.render('admin/articles/add', {})
})

webRoutes.post('/admin/articles/add', async (req, res) => {
    console.log(req.body)
    const body = req.body
    await global.db.collection('articles').insert({
        title: body.title,
        image: body.image_url,
        description: body.description,
        key: body.title.replace(' ', '_')
    })
    res.redirect('/admin/articles')
})

webRoutes.post('/admin/articles/:key/edit', async (req, res) => {
    console.log(req.body)
    const body = req.body
    await global.db.collection('articles').update(
        {key: req.params.key},
        {
            $set : {
                title: body.title,
                image: body.image,
                description: body.description,
                key: body.title.replace(' ', '_')
            }
        },
    )
    res.redirect('/admin/articles')
})

webRoutes.get('/admin/articles/:key/edit', async (req, res) => {
    let articles = await global.db.collection('articles').findOne({key: req.params.key})
    console.log(articles)
    if (articles) {
        res.render('admin/articles/_key', {articles: articles})
    } else {
        throw new Error('404')
    }
})

webRoutes.get('/admin/articles/:key/delete', async (req, res) => {
    await global.db.collection('articles').deleteOne({key: req.params.key})
    res.redirect('/admin/articles')
})

webRoutes.get('/admin', async (req, res) => {
    let arr = await global.db.collection('categories').find().toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
    })
    res.render('admin', {title: 'admin'})
})

webRoutes.get('/admin/category', async (req, res) => {
    let arr = await global.db.collection('categories').find().toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
    })
    res.render('admin/category', {title: 'admin', category: arr})
})

webRoutes.get('/admin/category/:key', async (req, res) => {
    let category = await global.db.collection('categories').findOne({key: req.params.key})
    if (category) {
        res.render('admin/category/_key', {category: category})
    } else {
        throw new Error('404')
    }
})

webRoutes.get('/admin/category/:key/delete', async (req, res) => {
    await global.db.collection('categories').deleteOne({key: req.params.key})
    res.redirect('/admin/category')
})

export default webRoutes








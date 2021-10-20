import express from 'express'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import {ObjectId} from 'mongodb'


let webRoutes = express.Router()

webRoutes.get('/', (req, res) => {
    res.render('home', {
        title: 'Greetings form Handlebars',
        content: 'Description how to use it handlebars',
        style: 'style.css',
    })
})

webRoutes.get('/cars', async (req, res) => {
    let arr = await global.db.collection('cars').find().toArray()
    res.render('cars', {title: 'cars', cars: arr})
})

webRoutes.get('/news', async (req, res) => {
    const limit = 2
    let offset = 0
    if (req.query.page) {
        offset = req.query.page * limit - 2
    }
    let arr = await global.db.collection('news').find().skip(offset).limit(limit).toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
    })
    let count = await global.db.collection('news').count()
    let pages = parseInt(count / limit) + 1
    let arrPages = []
    for (let i = 0; i < pages; i++) {
        arrPages.push(i + 1)
    }
    res.render('news', {title: 'news', news: arr, pages: arrPages})
})

webRoutes.get('/news/:key', async (req, res) => {
        let news = await global.db.collection('news').findOne({key: req.params.key})
        if (news) {
            res.render('news/_key', {news: news})
        } else {
            throw new Error('404')
        }
})

webRoutes.get('/articles', async (req, res) => {
    const limit = 2
    let offset = 0
    if (req.query.page) {
        offset = req.query.page * limit - 2
    }
    let arr = await global.db.collection('articles').find().skip(offset).limit(limit).toArray()
    arr.forEach(function (item) {
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
    })
    let count = await global.db.collection('articles').count()
    let pages = parseInt(count / limit) + 1
    let arrPages = []
    for (let i = 0; i < pages; i++) {
        arrPages.push(i + 1)
    }
    res.render('articles', {title: 'articles', articles: arr, pages: arrPages})
})

webRoutes.get('/articles/:key', async (req, res) => {
    let articles = await global.db.collection('articles').findOne({key: req.params.key})
    if (articles) {
        res.render('articles/_key', {articles: articles})
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
    let limit = 4
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

webRoutes.route('/profile')
    .get(async (req, res) => {
        res.render('profile', {title: 'Profile'})
    })

    .post(upload.single("avatar"), (req, res) => {
        const tempPath = req.file.path
        const targetPath = path.join('./public/uploads', req.file.originalname)

        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res)

            res.render('profile', {title: 'Profile', image: '/uploads/' + req.file.originalname})
        })
    })

webRoutes.get('/login', async (req, res) => {
    res.render('login')
})

webRoutes.post('/login', async (req, res) => {
    console.log(req.body)
    res.send('ok')
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
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
    })
    res.render('admin/news', {title: 'admin', news: arr})
})

webRoutes.get('/admin/news/:key', async (req, res) => {
    let news = await global.db.collection('news').findOne({key: req.params.key})
    if (news) {
        res.render('admin/news/_key', {news: news})
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
        item.url = req._parsedOriginalUrl.pathname + '/' + item.key
    })
    res.render('admin/articles', {title: 'admin', articles: arr})
})

webRoutes.get('/admin/articles/:key', async (req, res) => {
    let articles = await global.db.collection('articles').findOne({key: req.params.key})
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


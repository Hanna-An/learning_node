import crypto from "crypto";
import axios from "axios";

export default class AdminArticlesController {

    static async adminArticles(req, res) {
        let arr = await global.db.collection('articles').find().toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        })
        return res.render('admin', {title: 'admin'})
    }

    static async adminGetArticles(req, res) {
        let arr = await global.db.collection('articles').find().toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key + '/edit'
        })
        return res.render('admin/articles', {title: 'admin', articles: arr})
    }

    static async adminGetArticlesAdd(req, res) {
        return res.render('admin/articles/add', {})
    }

    static async adminPostArticlesAdd(req, res) {
        console.log(req.body)
        const body = req.body
        await global.db.collection('articles').insert({
            title: body.title,
            image: body.image_url,
            description: body.description,
            key: body.title.replace(' ', '_')
        })
        return res.redirect('/admin/articles')
    }

    static async adminPostArticlesEdit(req, res) {
        const body = req.body
        let errors = []
        let articles = await global.db.collection('articles').findOne({key: req.params.key})
        if (!articles) {
            throw new Error('404')
        }
        if (body.title === undefined || body.title.length === 0) {
            errors.push('Введите название статьи')
        }
        if (body.description.length > 300) {
            errors.push('Описание не должно превышать 300 символов')
        }
        if (body.image === undefined || body.image.length === 0) {
            errors.push('Введите ссылку на фото')
        }
        try {
            await axios.get(body.image)
        } catch (e) {
            errors.push('Ссылка недоступна')
        }
        if (errors.length > 0) {
            res.render('admin/articles/_key_edit', {articles: articles, errors: errors})
        }
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
        return res.redirect('/admin/articles')
    }

    static async adminGetArticlesEdit(req, res) {
        let articles = await global.db.collection('articles').findOne({key: req.params.key})
        console.log(articles)
        if (articles) {
            return res.render('admin/articles/_key', {articles: articles})
        } else {
            throw new Error('404')
        }
    }

    static async adminGetArticlesDelite(req, res) {
        await global.db.collection('articles').deleteOne({key: req.params.key})
        return res.redirect('/admin/articles')
    }

}




import crypto from "crypto";
import axios from "axios";

export default class AdminNewsController {

    static async adminNews(req, res) {
        let arr = await global.db.collection('news').find().toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        })
        return res.render('admin', {title: 'admin'})
    }

    static async adminGetNews(req, res) {
        let arr = await global.db.collection('news').find().toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key + '/edit'
        })
        return res.render('admin/news', {title: 'admin', news: arr})
    }

    static async adminGetNewsAdd(req, res) {
        return res.render('admin/news/add', {})
    }

    static async adminPostNewsAdd(req, res) {
        console.log(req.body)
        const body = req.body
        await global.db.collection('news').insert({
            title: body.title,
            image: body.image_url,
            description: body.description,
            key: body.title.replace(' ', '_')
        })
        return res.redirect('/admin/news')
    }

    static async adminPostNewsEdit(req, res) {
        const body = req.body
        let errors = []
        let news = await global.db.collection('news').findOne({key: req.params.key})
        if (!news) {
            throw new Error('404')
        }
        if (body.title === undefined || body.title.length === 0) {
            errors.push('Введите название новости')
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
            res.render('admin/news/_key_edit', {news: news, errors: errors})
        }
        await global.db.collection('news').update(
            {key: req.params.key},
            {
                $set : {
                    title: body.title,
                    description: body.description,
                    image: body.image,
                    key: body.title.replace(' ', '_')
                }
            },
        )
        return res.redirect('/admin/news')
    }

    static async adminGetNewsEdit(req, res) {
        let news = await global.db.collection('news').findOne({key: req.params.key})
        if (news) {
            return res.render('admin/news/_key_edit', {news: news})
        } else {
            throw new Error('404')
        }
    }

    static async adminGetNewsDelite(req, res) {
        await global.db.collection('news').deleteOne({key: req.params.key})
        return res.redirect('/admin/news')
    }

}




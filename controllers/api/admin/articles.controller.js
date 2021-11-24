import crypto from "crypto";
import axios from "axios";

export default class AdminArticlesController {

    static async adminArticles(req, res) {
        let arr = await global.db.collection('articles').find().toArray()
        return res.send({data: arr})
    }

    static async adminGetArticles(req, res) {
        let articles = await global.db.collection('articles').find().toArray()
        return res.render({data: articles})
    }

    static async adminPostArticlesAdd(req, res) {
        const body = req.body
        await global.db.collection('articles').insert({
            title: body.title,
            image: body.image_url,
            description: body.description,
            key: body.title.replace(' ', '_')
        })
        return res.send({data: true})
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
            return res.send({data: true})
        }
        await global.db.collection('articles').update(
            {key: req.params.key},
            {
                $set: {
                    title: body.title,
                    image: body.image,
                    description: body.description,
                    key: body.title.replace(' ', '_')
                }
            },
        )
        return res.send({data: true})
    }

    static async adminGetArticlesEdit(req, res) {
        let articles = await global.db.collection('articles').findOne({key: req.params.key})
        console.log(articles)
        if (articles) {
            return res.render({data: articles})
        } else {
            throw new Error('404')
        }
    }

    static async adminGetArticlesDelite(req, res) {
        await global.db.collection('articles').deleteOne({key: req.params.key})
        return res.send({data: true})
    }
}




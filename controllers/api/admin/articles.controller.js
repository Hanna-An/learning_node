import crypto from "crypto"
import axios from "axios"
import {ObjectId} from "mongodb"

export default class AdminArticlesController {

    static async adminArticles(req, res) {
        let arr = await global.db.collection('articles').find().toArray()
        return res.send({data: arr})
    }

    static async adminCreateArticle(req, res) {
        const body = req.body
        await global.db.collection('articles').insert({
            title: body.title,
            image: body.image_url,
            description: body.description,
            key: body.title.replace(' ', '_')
        })
        return res.send({data: true})
    }

    static async adminArticleEdit(req, res) {
        const body = req.body
        let errors = []
        let articles = await global.db.collection('articles').findOne({_id: new ObjectId(req.params.id)})
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
            {_id: new ObjectId(req.params.id)},
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

    static async adminGetArticle(req, res) {
        let articles = await global.db.collection('articles').findOne({_id: new ObjectId(req.params.id)})
        if (articles) {
            return res.send({data: articles})
        } else {
            throw new Error('404')
        }
    }

    static async adminArticlesDelite(req, res) {
        await global.db.collection('articles').deleteOne({_id: new ObjectId(req.params.id)})
        return res.send({data: true})
    }
}




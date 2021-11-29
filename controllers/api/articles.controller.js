import { ObjectId } from "mongodb"
import axios from "axios";

export default class ArticlesController {
    static async getArticles(req, res) {
        let arr = await global.db.collection('articles').find().toArray()
        res.send({data: arr})
    }

    static async getDetailArticles(req, res) {
        let article = await global.db.collection('articles').findOne({_id: new ObjectId(req.params.id)})
        if (article) {
            res.send({data: article})
        } else {
            res.send({error: 'article not exist'})
        }
    }
    static async createArticle(req, res) {
        const body = req.body
        await global.db.collection('articles').insert({
            title: body.title,
            image: body.image_url,
            description: body.description,
            key: body.title.replace(' ', '_')
        })
        res.send({data: true})
    }

    static async articleEdit(req, res) {
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
            res.send({data: true})
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
        res.send({data: true})
    }

    static async articlesDelite(req, res) {
        await global.db.collection('articles').deleteOne({_id: new ObjectId(req.params.id)})
        res.send({data: true})
    }
}



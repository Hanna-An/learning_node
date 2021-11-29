import {ObjectId} from "mongodb";
import axios from "axios";

export default class NewsController {
    static async getNews(req, res) {
        let arr = await global.db.collection('news').find().toArray()
        res.send({data: arr})
    }
    static async getNews(req, res) {
        let news = await global.db.collection('news').findOne({_id: new ObjectId(req.params.id)})
        if (news) {
            res.send({data: news})
        } else {
            throw new Error('404')
        }
    }

    static async createNews(req, res) {
        const body = req.body
        await global.db.collection('news').insert({
            title: body.title,
            image: body.image_url,
            description: body.description,
            key: body.title.replace(' ', '_'),
            preview_description: body.preview_description,
            publish_date: new Date()
        })
        res.redirect('/news')
    }

    static async newsEdit(req, res) {
        const body = req.body
        let errors = []
        let news = await global.db.collection('news').findOne({_id: new ObjectId(req.params.id)})
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
            res.send({news: news, errors: errors})
        }
        await global.db.collection('news').update(
            {id: req.params.id},
            {
                $set : {
                    title: body.title,
                    description: body.description,
                    image: body.image,
                    key: body.title.replace(' ', '_')
                }
            },
        )
        res.send({data: true})
    }

    static async newsDelete(req, res) {
        await global.db.collection('news').deleteOne({_id: new ObjectId(req.params.id)})
        res.send({data: true})
    }
}



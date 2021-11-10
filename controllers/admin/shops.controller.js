import crypto from "crypto";
import axios from "axios";

export default class AdminShopsController {

    static async adminShops(req, res) {
        let arr = await global.db.collection('shops').find().toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        })
        return res.render('admin', {title: 'admin'})
    }

    static async adminGetShops(req, res) {
        let arr = await global.db.collection('shops').find().toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key + '/edit'
        })
        return res.render('admin/shops', {title: 'admin', shops: arr})
    }

    static async adminGetShopsAdd(req, res) {
        return res.render('admin/shops/add', {})
    }

    static async adminPostShopsAdd(req, res) {
        const id = crypto.randomBytes(16).toString("hex")
        console.log(id)
        const body = req.body
        // await global.db.collection('shops').insert({
        //     title: body.title,
        //     address: body.address,
        //     image: '',
        //     description: body.description,
        //     key: body.title.replace(' ', '_')
        // })
        return res.redirect('/admin/shops')
    }

    static async adminPostShopsEdit(req, res) {
        const body = req.body
        let errors = []
        let shops = await global.db.collection('shops').findOne({key: req.params.key})
        if (!shops) {
            throw new Error('404')
        }
        if (body.address === undefined || body.address.length === 0) {
            errors.push('Введите адрес')
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
            res.render('admin/shops/_key_edit', {shops: shops, errors: errors})
        }
        await global.db.collection('shops').update(
            {key: req.params.key},
            {
                $set: {
                    title: body.title,
                    address: body.address,
                    image: body.image,
                    description: body.description,
                }
            },
        )
        return res.redirect('/admin/shops')
    }

    static async adminGetShopsEdit(req, res) {
        let shops = await global.db.collection('shops').findOne({key: req.params.key})
        console.log(shops)
        if (shops) {
            return res.render('admin/shops/_key_edit', {shops: shops})
        } else {
            throw new Error('404')
        }
    }

    static async adminGetShopsDelite(req, res) {
        await global.db.collection('shops').deleteOne({key: req.params.key})
        return res.redirect('/admin/shops')
    }

}




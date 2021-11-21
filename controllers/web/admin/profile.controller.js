import crypto from "crypto";
import axios from "axios";
import {ObjectID} from "mongodb";

export default class AdminProfileController {

    static async adminProfile(req, res) {
        let arr = await global.db.collection('users').find().toArray()
        return res.render('admin', {title: 'admin'})
    }

    static async adminGetProfile(req, res) {
        let arr = await global.db.collection('users').find().toArray()
        return res.render('admin/profile', {title: 'admin', profile: arr})
    }

    static async getDetailProfile(req, res) {
        let profile = await global.db.collection('users').findOne({_id: new ObjectID(req.params.id)})
        if (profile) {
            return res.render('admin/profile/_id', {profile: profile})
        } else {
            throw new Error('404')
        }
    }

    static async adminGetProfileSingle(req, res) {
        let profile = await global.db.collection('users').findOne()
        return res.render('profile', {title: 'Profile', profile: profile})
    }

    static async adminPostProfile(req, res) {
            const body = req.body
            let errors = []
            let profile = await global.db.collection('users').findOne()
            if (!profile) {
                throw new Error('404')
            }
            if (body.birth_date === undefined || body.birth_date.length === 0) {
                errors.push('Введите дату рождения')
            } else {
                let birth_date = String(body.birth_date).split('-')
                let year = birth_date[0]
                let month = birth_date[1]
                let day = birth_date[2]
                if (year !== undefined){
                    year = Number(year)
                    if (year < 1900 || year > 2200) {
                        errors.push('Столько не живут')
                    }
                }
                if (month !== undefined) {
                    month = Number(month)
                    if (month < 1 || month > 12) {
                        errors.push('Месяцев всего 12')
                    }
                }
                if (day !== undefined) {
                    day = Number(day)
                    if (day < 1 || day > 31) {
                        errors.push('В месяце не может быть больше 31 дня')
                    }
                }
            }
        if (body.name === undefined || body.name.length === 0) {
            errors.push('Введите имя')
        }
        if (body.surname === undefined || body.surname.length === 0) {
            errors.push('Введите фамилию')
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
                return res.render('admin/profile/_id', {profile: profile, errors: errors})
            }
            await global.db.collection('users').update(
                {_id: new ObjectID(req.params.id)},
                {
                    $set: {
                        name: body.name,
                        surname: body.surname,
                        image: body.image,
                        birth_date: body.birth_date
                    }
                },
            )
            return res.redirect('/profile')
        }

}




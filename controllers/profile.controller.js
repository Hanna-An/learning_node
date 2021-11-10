import {ObjectID} from "mongodb";

export default class ProfileController {
    static async getProfile(req, res) {
        let profile = await global.db.collection('users').findOne({_id: new ObjectID(req.params.id)})
        if (profile) {
            return res.render('profile/_id', {profile: profile})
        } else {
            throw new Error('404')
        }
    }

    static async getDetailProfile(req, res) {
        const body = req.body
        let profile = await global.db.collection('users').findOne()
        return res.render('profile', {title: 'Profile', profile: profile})
    }

    static async postDetailProfile(req, res) {
        const body = req.body
        console.log(body)
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
        if (errors.length > 0) {
            res.render('admin/profile/_id', {profile: profile, errors: errors})
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
        res.redirect('/profile')
    }
}

    // const tempPath = req.file.path
    // const targetPath = path.join('./public/uploads', req.file.originalname)
    //
    // fs.rename(tempPath, targetPath, err => {
    //     if (err) return handleError(err, res)
    //
    //     res.render('profile', {title: 'profile', image: '/uploads/' + req.file.originalname})
    // })




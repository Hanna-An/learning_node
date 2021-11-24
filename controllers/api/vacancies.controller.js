
export default class VacanciesController {
    static async getVacancies(req, res) {
        let arr = await global.db.collection('vacancies').find().toArray()
        res.send({data: arr})
    }

    static async getDetailVacancies(req, res) {
        let vacancy = await global.db.collection('vacancies').findOne({key: req.params.key})
        if (vacancy) {
            res.send({data: vacancy})
        } else {
            res.send({error: 'vacancy not exist'})
        }
    }
}



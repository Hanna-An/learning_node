
/**
 * @openapi
 * /contacts:
 *  post:
 *      tags:
 *      - name: "contacts"
 *      requestBody:
 *          content:
 *               'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          message:
 *                              type: string
 *
 */

export default class ContactsController {
    static async postContacts(req, res) {
        const body = req.body
        let errors = []
        let emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        let emailValue = body.email
        if (body.name === undefined || body.name.length < 3) {
            errors.push('Имя не должно быть короче 3 символов')
        }
        if (!emailRe.test(emailValue)) {
            errors.push('Введите корректный email')
        }
        if (body.email === undefined) {
            errors.push('Введите email')
        }
        if (body.message === undefined || body.message.length === 0) {
            errors.push('Введите сообщение')
        }
        if (errors.length > 0) {
            res.send({errors: errors})
            return
        }
        await global.db.collection('contacts').insert(
            {
                name: body.name,
                email: body.email,
                message: body.message
            }
        )
        res.send({data: true})
    }
}



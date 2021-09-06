export default class Users {
    static saveUser(req, res) {
        req.on('data', chunk => {
            let data = JSON.parse(chunk)
                if (data.name === "") {
                    console.error('поле не должно быть пустым')
                }
            console.log(data)
console.log(this.getAge(data.birth_date))
            let minAge = 12
            if (this.getAge(data.birth_date) < minAge) {
                // throw new Error('слишком юн1')
                console.error('слишком юн1')
            }
        })
        req.on('end', () => {

            }
        )
        // res.end('post')
        console.log('users')
    }
    static getAge(date) {
        let ageSeconds = (new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)
        return ageSeconds.toFixed(0)
    }
}


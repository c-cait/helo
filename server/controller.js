const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;

        //check to see if user exists
        const user = await db.check_user(username)

        if(!username[0]){
            return res.status(404).send('user does not exist')
        }

        const authenticated = bcrypt.compareSync(password, user[0].password)
        if(authenticated){
            req.session.user = {
                userId: user[0].id,
                username: user[0].username,
                profile_pic: user[0].profile_pic
            }
            return res.status(200).send(req.session.user)
        } else {
            return res.status(403).send('username or password incorrect')
        }
        
    },

    register: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;

        const existingUser = await db.check_user(username)

        if(existingUser[0]){
            return res.status(409).send('user already exists')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

        const random = Math.floor((Math.random() * 1000) + 1)

        const profile_pic = `https://robohash.org/${random}`

        const newUser = await db.register_user(username, hash, profile_pic)

        req.session.user = {
            userId: newUser[0].id,
            username: newUser[0].username,
            profile_pic: newUser[0].profile_pic
        }

        return res.status(200).send(req.session.user)
    },

    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(400)
        }
    }
}
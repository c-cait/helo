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

    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const {userPosts, search} = req.query
        
        let posts;

        if(!req.session.user){
            return res.sendStatus(404)
        }

        //const userId = req.session.user.userId

        console.log(req.session.user)
        

        //userposts is true and there is a search
       if(userPosts === 'true' && search !== ''){
           //respond with all posts where the title contains the search
           posts = await db.get_all_users_and_search(search)
       } 
        //userposts is false and there is no search 
       else if(userPosts === 'false' && search === ''){
           //respond with all the posts that do NOT contain the current user
           posts = await db.get_all_posts_not_currUser(req.session.user.userId)
       }
       else if(userPosts === 'false' && search !== ''){
             //respond with all the posts the do NOT contain the current user and where the title contains the search 
            posts = await db.get_search_not_currUser(req.session.user.userId, search)
       }
       else if(userPosts === 'true' && search === ''){
           //respond with all the posts
           posts = await db.get_all_users_and_posts()
       }
       res.status(200).send(posts)
    },

    getPost: async (req, res) => {
        const db = req.app.get('db')

        const { postId } = req.params

        post = await db.get_post(postId)

        res.status(200).send(post[0])
    },

    createPost: async (req, res) => {
        const db = req.app.get('db')

        const {title, img, content} = req.body

        const {author_id} = req.params

        const newPost = await db.create_post(title, img, content, author_id);

        res.status(200).send(newPost)
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db')

        const {postId} = req.params

        const deletedPost = await db.delete_post(postId)

        res.sendStatus(200)
    },

    logout: (req, res) => {

        req.session.destroy()

        res.sendStatus(200)

    }
}
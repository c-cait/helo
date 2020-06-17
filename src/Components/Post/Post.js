import React, {Component} from 'react';
import Axios from 'axios';
import './Post.css';
import {connect} from 'react-redux';

class Post extends Component {
    constructor(props){
        super();
        this.state = {
            title: '',
            content: '',
            img: '',
            username: '',
            profile_pic: '',
            author_id: ''
        }
    }

    componentDidMount(){
        // console.log('props', this.props)
        // console.log('postId', this.props.match.params.postid)
        console.log('i mounted')
        this.getPost()
    }

    getPost = () => {
        const {postid} = this.props.match.params
        Axios.get(`/api/post/${postid}`)
        .then(res => {
            console.log('res.data', res.data)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                img: res.data.img, 
                username: res.data.username,
                profile_pic: res.data.profile_pic,
                author_id: res.data.author_id
            })
            console.log('updated state')
        })
        .catch(err => console.log(err))
    }

    deletePost = () => {
        const {postid} = this.props.match.params
        Axios.delete(`/api/post/${postid}`)
        .then(res => {
            console.log('succesful delete')
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log('redux',this.props.id)
        const {title, content, img, username, profile_pic} = this.state
        return(
            <div className='single-post-container'>
                <h1 className='single-post-title'>{title}</h1>
                <div className='content-section'>
                    <img className='single-post-img' src={img} alt='post pic' />
                    <p className='single-post-content'>{content}</p>
                </div>
                
                <p>
                    <img className='single-post-profile-pic' alt='user pic' src={profile_pic}/>
                    written by: {username}
                </p>
                {/* if the current logged in userid matches the authorid then show the delete btn */}
                {this.props.id === this.state.author_id ? <button onClick={() => this.deletePost()}>Delete</button> : ''}
            </div>
            
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Post);
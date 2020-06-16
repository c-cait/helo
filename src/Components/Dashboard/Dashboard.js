import React, {Component} from 'react';
import './Dashboard.css';
import {FiSearch} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            userPosts: true,
            search: '',
            posts: []
        }
    }

    componentDidMount(){
        Axios.get(`/api/posts/?userPosts=true&search=`)
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    handleSearch = (val) => {
        this.setState({
            search: val
        })
    }

    handleCheckBox = (val) => {
        this.setState({
            userPosts: val
        })
    }

    getPosts = () => {
        const {userPosts, search} = this.state
        Axios.get(`/api/posts/?userPosts=${userPosts}&search=${search}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    render(){
        return(
            <div className='dashboard-container'>
                <div className='input-container'>
                    <div className='search-section'>
                        <input
                        className='input-box-dashboard'
                        type='text'
                        placeholder='Search By Title'
                        onChange={(e) => this.handleSearch(e.target.value)}
                        ></input>
                        <button 
                        onClick={() => this.getPosts()}
                        className='search-btn'>
                            <FiSearch className='search-icon'/>
                        </button>
                        <button className='reset-btn'>
                            Reset
                        </button>
                    </div>
                    <div className='my-posts'>
                        My Posts
                        <input
                        onChange={(e) => this.handleCheckBox(e.target.checked)} 
                        checked = {this.state.userPosts}
                        type='checkbox'>
                        </input>
                    </div>
                </div>
                <div className='posts'>
                 hello, {this.props.id}
                {this.state.posts.map(post => (
                    <div key={post.post_id} className='post-container'>
                        <div className='post-title'>{post.title}</div>
                        <div>
                            <div className='post-username'>written by: {post.username}</div>
                            <img className='post-profile-pic' src={post.profile_pic} alt='user pic'/>
                            <Link 
                                to={{
                                pathname: `/post/${post.post_id}`,
                            }}>View Post</Link>
                        </div>
                    </div>    
                ))}

                </div>
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard);
import React, {Component} from 'react';
import './Form.css';
import Axios from 'axios';
import {connect} from 'react-redux';

class Form extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    handleTitle = (val) => {
        this.setState({
            title: val
        })
    }

    handleImage = (val) => {
        this.setState({
            img: val
        })
    }

    handleContent = (val) => {
        this.setState({
            content: val
        })
    }

    createPost = () => {
        const {title, img, content} = this.state
        Axios.post(`api/post/${this.props.id}`, {title, img, content})
        .then(res => {
            this.setState({
                title: '',
                img: '',
                content: ''
            })
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }


    render(){
        return(
            <div className='new-post-container'>
                <div className='new-post-section'>
                    New Post
                    <input 
                        onChange={(e) => this.handleTitle(e.target.value)}
                        className='new-post-input' placeholder='Title'>
                    </input>
                    <input 
                        onChange={(e) => this.handleImage(e.target.value)}
                        className='new-post-input' placeholder='Image URL'>
                    </input>
                    <input 
                        onChange={(e) => this.handleContent(e.target.value)}
                        className='new-post-input' placeholder='Content'>
                    </input>
                    <button 
                    onClick={() => this.createPost()}
                    className='new-post-btn'>Post</button>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Form);
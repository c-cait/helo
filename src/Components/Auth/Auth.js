import React, {Component} from 'react';
import './Auth.css';
import {FaRegGrinTongueWink} from 'react-icons/fa';
import Axios from 'axios';
import {connect} from 'react-redux';
import {user} from '../../redux/reducer';

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handlePassword = (val) => {
        this.setState({
            password: val
        })
    }

    handleUsername = (val) => {
        this.setState({
            username: val
        })
    }

    register = (e) => {
        e.preventDefault();
        const { username, password } = this.state
        console.log('pre register')
        Axios.post('/api/auth/register', {username, password})
        .then( res => {
            const {userId, username, profile_pic} = res.data
            this.props.user(userId, username, profile_pic)
            this.props.history.push('/dashboard')
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    login = (e) => {
        e.preventDefault();
        const { username, password } = this.state
        Axios.post('/api/auth/login', {username, password})
        .then( res => {
            console.log(res.data)
            const {userId, username, profile_pic } = res.data
            this.props.user(userId, username, profile_pic)
            this.props.history.push('/dashboard')
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className='auth-container'>
                <div className='auth-section'>
                    <FaRegGrinTongueWink className='wink'/>
                    <div className='auth-title'> Helo </div>

                    <form>
                        <div className='input'>
                            Username: 
                            <input 
                            type='text'
                            value={this.state.username}
                            onChange={e => this.handleUsername(e.target.value)}
                            className='input-box'/>
                        </div> 

                        <div className='input'>
                            Password: 
                            <input 
                            type='password'
                            value={this.state.password}
                            onChange={e => this.handlePassword(e.target.value)}
                            className='input-box'/>
                        </div>

                        <button 
                        onClick ={(e) => this.login(e)}
                        className='input-btn right'>Login</button>
                        <button 
                        onClick ={(e) => this.register(e)}
                        className='input-btn left'>Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {user})(Auth);
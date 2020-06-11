import React, {Component} from 'react';
import './Auth.css';
import {FaRegGrinTongueWink} from 'react-icons/fa';

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
                            onChange={e => this.handleUsername(e.target.value)}
                            className='input-box'/>
                        </div> 

                        <div className='input'>
                            Password: 
                            <input 
                            type='password'
                            onChange={e => this.handlePassword(e.target.value)}
                            className='input-box'/>
                        </div>

                        <button className='input-btn right'>Login</button>
                        <button className='input-btn left'>Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth;
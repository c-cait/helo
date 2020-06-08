import React, {Component} from 'react';
import './Auth.css';
import {FaRegGrinTongueWink} from 'react-icons/fa';

class Auth extends Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div className='auth-container'>
                <div className='auth-section'>
                    <FaRegGrinTongueWink className='wink'/>
                    <div className='auth-title'> Helo </div>

                    <form>
                        <div className='input'>
                            Username: <input className='input-box'></input>
                        </div> 
                        <div className='input'>
                            Password: <input className='input-box'></input>
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
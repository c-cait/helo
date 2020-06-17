import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import {AiOutlineHome} from 'react-icons/ai';
import {BsFilePost} from 'react-icons/bs';
import {IoIosPower} from 'react-icons/io';
import {connect} from 'react-redux';
import Axios from 'axios';

class Nav extends Component {
    constructor(){
        super()
    }

    logout(){
        Axios.delete('/api/auth/logout')
        .then(res => {
            console.log('ended session')
        })
    }

    render(){
        return(
            <div className='nav-container'>
                <div className='nav-section-top'>
                    <img src={this.props.profile_pic} alt='profile pic' className='profile-pic'/>
                <div className='username'>{this.props.username}</div>
                    <div><Link to='/dashboard'><AiOutlineHome className='nav-icon'/></Link></div>
                    <div><Link to='/new'><BsFilePost className='nav-icon'/></Link></div>
                </div>
                
                <Link to='/'><IoIosPower className='power-icon' onClick={() => this.logout()}/></Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Nav);
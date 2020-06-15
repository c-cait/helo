import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import {AiOutlineHome} from 'react-icons/ai';
import {BsFilePost} from 'react-icons/bs';
import {IoIosPower} from 'react-icons/io';
import {connect} from 'react-redux';
import {user} from '../../redux/reducer';



class Nav extends Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div className='nav-container'>
                <div className='nav-section-top'>
                    <img src={this.props.profile_pic} alt='profile pic' className='profile-pic'/>
                <div className='username'>{this.props.username}</div>
                    <Link to='/dashboard'><AiOutlineHome className='nav-icon'/></Link>
                    <Link to='/new'><BsFilePost className='nav-icon'/></Link>
                </div>
                
                <Link to='/'><IoIosPower className='power-icon'/></Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Nav);
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import {AiOutlineHome} from 'react-icons/ai';
import {BsFilePost} from 'react-icons/bs';
import {IoIosPower} from 'react-icons/io'

class Nav extends Component {
    constructor(){
        super()
    }

    render(){

        return(
            <div className='nav-container'>
                <div className='nav-section-top'>
                    <Link to='/dashboard'><AiOutlineHome className='nav-icon'/></Link>
                    <Link to='/new'><BsFilePost className='nav-icon'/></Link>
                </div>
                
                <Link to='/'><IoIosPower className='power-icon'/></Link>
            </div>
        )
    }
}

export default Nav;
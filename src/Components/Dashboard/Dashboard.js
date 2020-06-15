import React, {Component} from 'react';
import './Dashboard.css';
import {FiSearch} from 'react-icons/fi';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            userPosts: true,
            search: ''
        }
    }

    handleSearch = (val) => {
        this.setState({
            search: val
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
                        <button className='search-btn'>
                            <FiSearch className='search-icon'/>
                        </button>
                        <button className='reset-btn'>
                            Reset
                        </button>
                    </div>
                    <div className='my-posts'>
                        My Posts
                        <input 
                        value = {this.state.userPosts}
                        type='checkbox'>
                        </input>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Dashboard;
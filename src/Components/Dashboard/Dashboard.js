import React, {Component} from 'react';
import './Dashboard.css'

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            input: ''
        }
    }

    render(){
        return(
            <div className='dashboard-container'>
                <div className='input-container'>
                    <input
                    type='text'
                    placeholder='Search By Title'
                    ></input>
                    <button className='search-btn'>

                    </button>
                    <button className='reset-btn'>
                        Reset
                    </button>
                </div>
            </div>
        )
    }
}

export default Dashboard;
import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {withRouter} from 'react-router-dom';

const Navigation = withRouter(props => props.location.pathname === '/' ? '' : <Nav />)

function App() {
  return (
    <div className="App">
      <Navigation />
    {routes}
    </div>
  );
}

export default App;

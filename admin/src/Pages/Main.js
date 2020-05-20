import React from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './login/Login';
import PrivateRoute from './privateRoute'
import AdminIndex from './AdminIndex';
const Main  = ()=>{
    return(
        <Router>
            <Switch>
                <Route path="/login/"  component={Login} />
                <PrivateRoute path='/' component={AdminIndex}/>
            </Switch>
        </Router>
    )
}

export default Main;
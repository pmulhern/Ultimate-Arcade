// Restricting the user from visiting the /login and /register routes as they are already logged into the system
import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

// First condition below is checking if user is authenticated
const PrivateRoute = ({component : Component, roles, ...rest})=>{
    const { isAuthenticated, user} = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(!isAuthenticated)
                return <Redirect to={{ pathname: '/login', 
                                       state : {from : props.location}}}/>

// Second condition is checking the role and restricting them accrodingly (No /Admin access) by sending to home page
            if(!roles.includes(user.role))
                return <Redirect to={{ pathname: '/', 
                                 state : {from : props.location}}}/>
            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;
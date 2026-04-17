import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {

    const { user, loader } = useAuth();

    if(loader){
        return <div className='flex items-center justify-center'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
    if(!user){
        return <Navigate to="/sign-in"> </Navigate>
    }

    return children ;
};

export default PrivateRoute;
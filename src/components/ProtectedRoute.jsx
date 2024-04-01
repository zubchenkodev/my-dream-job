import {useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import GlobalLoader from "./GlobalLoader";
import { Fragment } from "react";



const ProtectedRoute = ({children}) => {
    const {isLoading, user} = useSelector(state => state.auth);

    if(isLoading) {
        return <GlobalLoader />
    }

    if(!user) {
        return <Navigate to="/login" />
    }
    
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default ProtectedRoute
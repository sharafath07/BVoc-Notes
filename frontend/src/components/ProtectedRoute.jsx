import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../Context/Context';

function ProtectedRoute({ children }) {
    const { token } = useContext(Context);

    if (token === '') {

        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    return children
}

export default ProtectedRoute
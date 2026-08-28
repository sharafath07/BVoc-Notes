import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../Context/Context';

function ProtectedRoute({ children, toUrl }) {
    const { token } = useContext(Context);

    if (token === '') {

        return (
            <Navigate
                to={toUrl}
                replace
            />
        );
    }

    return children
}

export default ProtectedRoute
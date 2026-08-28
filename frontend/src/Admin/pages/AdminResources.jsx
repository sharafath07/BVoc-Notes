import React from 'react'
import { Link } from 'react-router-dom'

function AdminResources() {
    return (
        <div className='m-100'>
            <Link to='/admin/dashboard/resources/add'>ADD</Link>
        </div>
    )
}

export default AdminResources

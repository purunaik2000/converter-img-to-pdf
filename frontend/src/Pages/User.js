import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './User.css';

export default function User() {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [])
    return (
        <div>
            {!user && <Navigate to="/login" replace={true} />}
            <div className='container'>
                <div className='box'>
                    <h1>User Detail</h1>
                    <div className='field'>
                        <div>Name: </div>
                        <div>{user?.name}</div>
                    </div>
                    <div className='field'>
                        <div>Mobile: </div>
                        <div>{user?.mobile}</div>
                    </div>
                    <div className='field'>
                        <div>Email: </div>
                        <div>{user?.email}</div>
                    </div>
                    <div className='btn' onClick={() => { localStorage.removeItem('user'); <Navigate to='/login' replace={true}/>; setUser(null) }} >Logout</div>
                </div>
            </div>
        </div>
    );
}

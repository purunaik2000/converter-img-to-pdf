import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

import Alert from '../components/Alert';

import './Login.css'

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [profile, setProfile] = useState({ name: '', email: '', mobile: '', password: ''});
  const [registered, setRegistered] = useState(true);
  const [alert, setAlert] = useState('');
  const [firstLogin, setFirstLogin] = useState(false);

  const url = 'http://localhost:3000/dev/users/';
  const user = JSON.parse(localStorage.getItem('user'));

  async function loginHandler() {
    setAlert('wait...')
    await fetch(url + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((val) => {
        console.log('Success:', val);
        setAlert(val.message)
        if (val.status) {
          setTimeout(() => localStorage.setItem('user', JSON.stringify(val.data)), 1000);
          setTimeout(()=>setFirstLogin(true), 1000);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    if (user) setData({ email: '', password: '' });
  }

  function gotToRegisterHandler() {
    setRegistered(false)
  }

  function goToLoginHandler() {
    setProfile({ name: '', email: '', mobile: '', password: ''});
    setRegistered(true)
  }

  async function registerHandler() {
    setAlert('wait...')
    await fetch(url + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then((val) => {
        console.log('Success:', val);
        if (val.status) {
          setRegistered(true)
        }
        setAlert(val.message)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    if (registered) setProfile({name: '', email: '', password: '', mobile: ''})
  }

  return (
    <div className='login'>
      {firstLogin && <Navigate to="/" replace={true} />}
      {!firstLogin && user && <Navigate to="/user" replace={true} />}
      {registered && <div className='form-container'>
        <div className='form'>
          <h1>Login</h1>

          <div className='row'>
            <label>Email: </label>
            <input onChange={(e) => setData({ ...data, email: e.target.value })} value={data.email} placeholder='example@gmail.com'></input>
          </div>

          <div className='row'>
            <label>Password: </label>
            <input onChange={(e) => setData({ ...data, password: e.target.value })} value={data.password} type='password' placeholder='Example@123'></input>
          </div>

          <div>
            <div className='btn' onClick={loginHandler}>Login</div>
            <div className='btn' onClick={gotToRegisterHandler}>Register</div>
          </div>

        </div>
      </div>}
      {!registered && <div className='form-container'>
        <div className='form'>
          <h1>Register</h1>

          <div className='row'>
            <label>Name: </label>
            <input onChange={(e) => setProfile({ ...profile, name: e.target.value })} value={profile.name} type='name' placeholder='John' autoFocus></input>
          </div>

          <div className='row'>
            <label>Mobile: </label>
            <input onChange={(e) => setProfile({ ...profile, mobile: e.target.value })} value={profile.mobile} type='mobile' placeholder='mobile'></input>
          </div>

          <div className='row'>
            <label>Email: </label>
            <input onChange={(e) => setProfile({ ...profile, email: e.target.value })} value={profile.email} type='email' placeholder='example@gmail.com'></input>
          </div>

          <div className='row'>
            <label>Password: </label>
            <input onChange={(e) => setProfile({ ...profile, password: e.target.value })} value={profile.password} type='password' placeholder='Example@123'></input>
          </div>

          <div>
            <div className='btn' onClick={goToLoginHandler}>{'< login'}</div>
            <div className='btn' onClick={registerHandler}>Create</div>
          </div>

        </div>
      </div>}
      {alert && <Alert msg={alert} set={setAlert} />}
    </div>
  );
}
/*import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [name, setName] = useState("");

  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }

  const getUsername = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/getUser`, {
      method: 'POST',

      headers: {
        "auth-token": localStorage.getItem("token")
      },

    });

    const json = await response.json();
    setName(json.name);
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      getUsername();
    }
  },[])


  return (
    <nav className="bg-emerald-900 text-white px-3 py-3 flex justify-end w-full">
      <ul className="flex items-center">
        <li className="mx-5 cursor-pointer"><Link to="/" className=' underline underline-offset-4 decoration-white'>Home</Link></li>
        <li className="mx-5 cursor-pointer "><Link to="/" className='font-bold' >{name}</Link></li>
      </ul>
      { !localStorage.getItem("token") ?<div>
        <button className="text-white font-bold bg-emerald-400 px-3 py-2 mx-3"><Link to="/login">Log in</Link></button>
        <button className="text-white font-bold bg-emerald-400 px-3 py-2 mx-3"><Link to="/signup">Sign up</Link></button>
      </div>:<button className="text-white font-bold bg-emerald-400 px-3 py-2 mx-3" onClick={handleLogout}>Log out</button>}
    </nav>

  )
}*/


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home');
  };

  const getUsername = async () => {
    const response = await fetch(`http://3.111.40.134:8000/auth/getUser`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
      },
    });

    const json = await response.json();
    setName(json.name);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUsername();
    }
  }, []);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Task Manager
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </Link>
        </Button>
        
        {/* <Button color="inherit">
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </Button> */}
       
        {localStorage.getItem('token') ? (
          <>
            <Button color="inherit">
              <Link
                to="/"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                {name}
              </Link>
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit">
              <Link
                to="/login"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/signup"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Sign up
              </Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Lists from './Lists';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './Welcome.css'
import image1 from './images/taskm.webp';
import image2 from "./images/3.png";
import image3 from "./images/goolecal.webp"
export default function Welcome() {
  return (
    
    <div>
      <div class="mblock">
      <img width="800"  height ="500"className="ione"src={image1}></img>
     
     
    
    <div className=" welcome-container">
      <i>STUDENT PLANNER</i>
      <h2 class="sub" >Create and Manage your tasks 📔</h2>
      </div>
      </div>
      
      <div class="iblock"> 
       <Link to="/login"> <img  className="taskimage"width="400"  height="400"src={image2}></img></Link>
       
       <Link to="/cal"> <img className='taskimage2' width="400" height="400" src={image3}></img></Link>
       <h1 class="text">Create events through calendars</h1>

      </div>
      





      <p>
      <Link to="/login" className="login-link">
          <button className="login-button">Login</button>
        </Link>
      </p>
    </div>
  )
}
import React from 'react'
import Login from './Login'
import Signup from './Signup'
import { useAuth } from "../contexts/AuthProvider";
import History from './History';
import { Grid,Button } from '@mui/material';
export default function Home() {
    const {token} = useAuth();
    
    return (
        <>
       <h2 style={{textAlign:"center",color:"#333"}}>Welcome to Expense Tracker</h2>
       <div className='HomePage'>
       <Button variant="contained">Login</Button>
               <Button variant="contained">SignUp</Button>
       </div>
        </>
        
    )
}

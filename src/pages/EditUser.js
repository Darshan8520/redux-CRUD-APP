import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getSingleUser, getUpdateUser, loadUsers } from '../redux/action';
const EditUser = () => {
  const {id}= useParams()
  const {user} =useSelector((state)=>state.data)
    const [state,setState]= useState({
        name : "",
        email : "",
        contact : "",
        address : "",
    })
    const [error,setError]=useState()
    const {name,email,contact,address}=state
    const navigate =useNavigate()
    const dispatch= useDispatch()
    const handleInputChange=(e)=>{
      let {name,value}= e.target
      setState({...state, [name]: value})
    }
    const handleSubmit=(e)=>{
    e.preventDefault()  
    if(!name || !email || !contact || !address ){
        setError("Please Enter All Input Field")
    }else{
     dispatch(getUpdateUser(state,id))
     dispatch(loadUsers())
     navigate("/")
     setError("")
    }
    }
    useEffect(()=>{
    dispatch(getSingleUser(id))
    },[])
    useEffect(()=>{
 if(user){
  setState({...user})
 }
    },[user])
  return (
    <div>  
<Button color='secondary'style={{width:'100px',marginTop:"20px"}} variant='contained' type="submit" onClick={()=>navigate("/")}>Go Back </Button>
        <h2>Edit User</h2>
        {error && <h3 style={{color: 'red'}}>{error}</h3>}
        <form onSubmit={handleSubmit}>
        <Box
            marginTop="10px"
              component=""
              sx={{
                '& > :not(style)': { m: 1 , width: '270px'},
              }}
              noValidate
              autoComplete="off">
        <TextField id="standard-basic" label="name" value={name} name='name' type='text'onChange={handleInputChange}/><br/>
        <TextField id="standard-basic" label="email" value={email}name='email' type='email'onChange={handleInputChange}/><br/>
        <TextField id="standard-basic" label="contact" value={contact} name='contact' type='number'onChange={handleInputChange}/><br/>
        <TextField id="standard-basic" label="address" value={address} name='address' type='text'onChange={handleInputChange}/><br/>
        <Button color='primary'style={{width:'100px'}} variant='contained' type="submit"> Update </Button>
        </Box>
        </form>
    </div>
  )
}

export default EditUser;

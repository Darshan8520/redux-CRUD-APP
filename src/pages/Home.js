import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/action';
import '../App.css';
import  ButtonGroup  from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))


const Home = () => {
  const { users } = useSelector(state => state.data)
  const dispatch = useDispatch()
  const history = useNavigate()

  useEffect(() => {
    dispatch(loadUsers())
  })
  const handleDelete =(id)=>{
    if(window.confirm("Are you sure Want To Delete User?")){
      dispatch(deleteUser(id))
    }
  }

  return (
    <div>
      <div style={{marginTop:10}}>
      <Button color='primary' variant='contained'onClick={()=>history("/addUser")}> Add User </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ marginTop: 20 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center" >{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.contact}</StyledTableCell>
                <StyledTableCell align="center">{user.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup variant="text" aria-label="text button group">
                    <Button  style={{marginRight:20 ,borderRadius: 10}}
                     variant='contained' color="secondary"onClick={()=> handleDelete(user.id)}>Delete</Button>
                    <Button style={{borderRadius: 10}} variant='contained' color ="primary" onClick={()=>history(`/editUser/${user.id}`)}>Edit</Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default Home

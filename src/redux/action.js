// import { type } from '@testing-library/user-event/dist/type'
// import { type } from '@testing-library/user-event/dist/type'
import * as types from './actiontype'
import axios from 'axios'
const getUsers =(users)=>({
    type :types.GET_USERS,
    payload : users
})

const userDeleted =()=>({
    type : types.DELETE_USER
})

const userAdd =()=>({
    type :types.ADD_USER
})

const getUser=(user)=>({
    type : types.GETSINGLE_USER,
    payload : user
})
const UpdateUser=(user)=>({
    type : types.UPDATE_USER
})
export const loadUsers =()=>{
    return function(dispatch){
        axios.get(`${process.env.REACT_APP_API}`)
        .then((resp)=>{
            console.log(resp);
            dispatch(getUsers(resp.data))
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export const deleteUser =(id)=>{
    return function(dispatch){
        axios.delete(`${process.env.REACT_APP_API}/${id}`)
        .then((resp)=>{
            console.log(resp);
            dispatch(userDeleted())
            dispatch(loadUsers())
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export const addUser =(user)=>{
    return function(dispatch){
        axios.post(`${process.env.REACT_APP_API}`,user)
        .then((resp)=>{
            console.log(resp);
            dispatch(userAdd())
            dispatch(loadUsers())
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export const getSingleUser =(id)=>{
    return function(dispatch){
        axios.get(`${process.env.REACT_APP_API}/${id}`)
        .then((resp)=>{
            console.log(resp);
            dispatch(getUser(resp.data))
            
        }).catch((err)=>{
            console.log(err)
        })
    }
}
export const getUpdateUser =(user,id)=>{
    return function(dispatch){
        axios.put(`${process.env.REACT_APP_API}/${id}`,user)
        .then((resp)=>{
            console.log(resp);
            dispatch(UpdateUser())
            
        }).catch((err)=>{
            console.log(err)
        })
    }
}
import { GET_APP_DATA_FAILURE, GET_EMAIL_LIST_REQUEST, GET_EMAIL_LIST_SUCCESS,GET_APP_DATA_REQUEST,GET_APP_DATA_SUCCESS, SET_BODY } from "./actionType"
import axios from "axios";

const getEmailDataRequest = () => {
    return{
        type:GET_EMAIL_LIST_REQUEST
    }
}
 const getEmailDataSuccess=(payload)=>{
    return{
        type:GET_EMAIL_LIST_SUCCESS,
        payload
    }
}
 const getEmailDataFailure=(payload)=>{
    return{
        type:GET_APP_DATA_FAILURE,
        payload
    }
}

const getEmailBodyRequest = () => {
    return{
        type:GET_APP_DATA_REQUEST
    }
}
 const getEmailBodySuccess=(payload)=>{
    return{
        type:GET_APP_DATA_SUCCESS,
        payload
    }
}
 const getEmailBodyFailure=(payload)=>{
    return{
        type:GET_APP_DATA_FAILURE,
        payload
    }
}

export const getEmailData=(page=null)=>(dispatch)=>{
    dispatch(getEmailDataRequest());
    axios.get(`https://flipkart-email-mock.now.sh/?page=${page}`)
        .then(res => {
            dispatch(getEmailDataSuccess(res.data.list))
        })           
    .catch(err=>dispatch(getEmailDataFailure(err)));
}

export const getEmailBodyData=(id=null)=>(dispatch)=>{
    dispatch(getEmailBodyRequest());
    axios.get(`https://flipkart-email-mock.now.sh/?id=${id}`)
        .then(res => {
            dispatch(getEmailBodySuccess(res.data?.body))
        })           
    .catch(err=>dispatch(getEmailBodyFailure(err)));
}

export const setBody=(payload)=>{
    return{
        type:SET_BODY,
        payload
    }
}
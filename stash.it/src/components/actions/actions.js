import axios from 'axios'

import axiosWithAuth from '../../axiosWithAuth'

/* LOGIN ACTIONS */

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START })
  return axios
    .post('https://localhost:3000/login', creds)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.payload })
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: true })
    })
}

/* FETCH LISTS ACTIONS */

export const FETCH_LISTS_START = 'FETCH_LISTS_START'
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS'
export const FETCH_LISTS_FAILURE = 'FETCH_DATA_FAILURE'

export const fetchLists = user_id => dispatch => {
  dispatch({ type: FETCH_LISTS_START })
  axios
    .get(`https://localhost:3000/tabs/${user_id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(res => {
      dispatch({ type: FETCH_LISTS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: FETCH_LISTS_FAILURE })
    })
}

/* ADD LIST ACTIONS */

export const ADD_LIST = 'ADD_LIST'
export const ADD_LIST_FAILURE = 'ADD_LIST_FAILURE'

export const addList = newList => dispatch => {
  axiosWithAuth()
    .post(`https://localhost:3000/tabs`, newList)
    .then(res => {
      dispatch({ type: ADD_LIST, payload: res.data })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: ADD_LIST_FAILURE, payload: err.response })
    })
}

/* DELETE ACTIONS */

export const DELETE_START = 'DELETE_START'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'

export const deleteList = id => dispatch => {
  dispatch({ type: DELETE_START })
  axiosWithAuth()
    .delete(`https://localhost:3000/tabs/${id}`)
    .then(res => {
      dispatch({ type: DELETE_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err);
    });
};
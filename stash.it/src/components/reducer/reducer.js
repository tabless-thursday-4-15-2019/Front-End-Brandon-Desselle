import {
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  ADD_LIST,
  ADD_LIST_FAILURE,
  DELETE_START,
  DELETE_SUCCESS,
  LOGIN_FAILURE
} from '../actions/actions'

/* INT STATE */

const initialState = {
  tests: [],
  lists: {},
  loggingIn: false,
  error: null,
  fetchingLists: false,
  token: localStorage.getItem('token'),
  user_id: localStorage.getItem('user_id')
}

/* REDUCER */

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true,
        error: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        error: false,
        token: action.payload,
        user_id: localStorage.getItem('user_id')
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: true
      }
    case FETCH_LISTS_START:
      return {
        ...state,
        fetchingLists: true,
        error: null
      }
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        lists: Object.assign(state.lists, action.payload),
        fetchingLists: false,
        error: null
      }
    case FETCH_LISTS_FAILURE:
      return {
        ...state,
        fetchingLists: false,
        error: action.payload
      }
    case ADD_LIST:
      if (Object.keys(state.lists).includes(action.payload.category)) {
        return {
          ...state,
          lists: {
            ...state.lists,
            [action.payload.category]: [
              ...state.lists[action.payload.category],
              action.payload
            ]
          }
        }
      } else {
        return {
          ...state,
          lists: {
            ...state.lists,
            [action.payload.category]: [action.payload]
          }
        }
      }

    case ADD_LIST_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_START:
      return {
        error: ''
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        lists: action.payload
      }
    default:
      return state
  }
}

export default reducer;
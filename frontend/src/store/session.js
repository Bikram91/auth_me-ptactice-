import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

// export const logout = async user => (
//         csrfFetch("api/session", {
//             method: "DELETE"
//         })
// )

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
  }

export const signup = (user) => async (dispatch) => {
    const {username, email, password} = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
          })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
    storeCurrentUser(data.user)
  dispatch(setCurrentUser(data.user));
  return response;
};

// export const logoutUser = user => async dispatch => {
//         let res = await logout();
//         // error handling if above request fails
//         dispatch(removeUser(user.id));
//       };

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
  };

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };

  const initialState = { 
    user: JSON.parse(sessionStorage.getItem("currentUser"))
  };
//   const initialState = {
//     user: null
//   }

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
    

   


export default sessionReducer;

// import {csrfFetch} from "../store/csrf"

// // Action Type
// const LOGIN_USER = "users/lOGIN_USER"
// const LOGOUT_USER = "users/LOGOUT_USER"
// // Action Creators
// export const receiveUser = user => ({
//     type: LOGIN_USER,
//     payload: user
// });
// // Action Creators
// export const removeUser = userId => ({
//     type: LOGOUT_USER,
//     payload: userId
// });
// // API fetch
// export const login = async user => (
//     csrfFetch("api/session", {
//         method: "POST",
//         body: JSON.stringify(user)
//     })
// )
// // Api fetch
// export const logout = async user => (
//     csrfFetch("api/session", {
//         method: "DELETE"
//     })
// )
// // thunk ACTION CREATOR
// export const loginUser = user => async dispatch => {
//     let res = await login(user);
//     let data = await res.json()
//     dispatch(receiveUser(data))
// }

// export const logoutUser = user => async dispatch => {
//     let res = await logout();
//     // error handling if above request fails
//     dispatch(removeUser(user.id));
//   };
// // 

//   const sessionReducer = (state ={}, action) => {
//     switch(action.type) {
//         case LOGIN_USER:
//             return {...state, user: action.payload.user };
//         case LOGOUT_USER:
//         return { ...state, user: null };
//         default: 
//             return state;
//     }
//   } 

//   export default sessionReducer;




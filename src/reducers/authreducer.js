const Initial_state={
    userName:'Admin',
    loggedIn:false
} ;

const authReducer = (state = Initial_state,action)=>{
    switch(action.type){
        case "LOGIN":return {
            ...state,
            userName: action.payload.username,
            loggedIn: action.payload.userLoggedIn
          };
        case "LOGOUT":return {
            ...state,
            userName: action.payload.username,
            loggedIn: action.payload.userLoggedIn
          };
        case "REGISTER":return {
            ...state,
            userName: action.payload.username,
            loggedIn: action.payload.userLoggedIn
          };
        default:return state;
    }
}

export default authReducer;
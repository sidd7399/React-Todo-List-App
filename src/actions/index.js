export const Login =(user)=>{
    return {
        type:"LOGIN",
        payload:user
    }
}

export const Logout =(user)=>{
    return {
        type:"LOGOUT",
        payload:user
    }
}
export const Register =(user)=>{
    return {
        type:"REGISTER",
        payload:user
    }
}


// todo items reducers 

export const Create_Todo =(todoList)=>{
    return {
        type:"CREATE_TODO",
        payload:todoList
    }
}

export const Toggle_Todo =(todoId)=>{
    return {
        type:"TOGGLE_TODO",
        payload:todoId
    }
}

export const Delete_Todo =(todoId)=>{
    return {
        type:"DELETE_TODO",
        payload:todoId
    }
}
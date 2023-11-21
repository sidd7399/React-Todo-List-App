const Initial_state=[];


// {
//     title:'',
//     description:'',
//     author:'',
//     dateCreated:Date.now(),
//     complete:false
// };


const todoReducer = (state = Initial_state,action)=>{
    switch(action.type){
        case "CREATE_TODO":
            const todo = {
            id:new Date().getTime(),
            title: action.payload.title,
            description: action.payload.description,
            author:action.payload.author,
            dateCreated:action.payload.dateCreated,
            complete:false,
            dateCompleted:null
          }
          
          return [...state, todo]
          case "TOGGLE_TODO":
            const updatedTodos = state.map((todo) => {
              if (todo.id === action.payload) {
                // Toggle the 'complete' status
                const updatedTodo = { ...todo, complete: !todo.complete };
                
                // Update the 'dateCompleted' field if the todo is marked as complete
                if (updatedTodo.complete==true) {
                  updatedTodo.dateCompleted = Date.now();
                } else {
                  updatedTodo.dateCompleted = null;
                }
          
                return updatedTodo;
              } else {
                return todo;
              }
            });
          
            return updatedTodos;
        case "DELETE_TODO":
            const filterTodo =  state.filter((todo)=>todo.id!=action.payload);
            return filterTodo;

        default:return state;
    }
}

export default todoReducer;
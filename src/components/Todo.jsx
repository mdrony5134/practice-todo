import { useEffect, useReducer } from "react"

const initialTodo = {
  list: [],
  title: '',
  description: ''
}

const todoReducer = (todo, action) =>{

  const {title, description, list} = todo;
  switch(action.type){
    case "SET_TITLE":
      return{
        ...todo, 
        title: action.payload
      }
    case "SET_DESCRIPTION":
      return{
        ...todo,
        description: action.payload
      }
    case "ADD_TODO":
      return{
        title:"", 
        description:"",
        list: [...list,{title, description}]
      }
  }
}

const Todo = () => {
  // get item localstorage
const storeData = JSON.parse(localStorage.getItem("lists")) || []

const [todo, dispatch] = useReducer(todoReducer, {...initialTodo, list: storeData})
const {title, description} = todo;


// data set in localstorage
useEffect(()=>{
  localStorage.setItem("lists",JSON.stringify(todo.list))
},[todo.list])

  return (
    <> 
    <h1>My Todo List</h1>
     <div className="todo-wrapper">
      <div className="todo-input">
        <div className="todo-input-item">
          <input 
          type="text" 
          placeholder="Enter Your Task"
          value={title}
          onChange={(e)=>dispatch({type: "SET_TITLE", payload: e.target.value})}
          />
        </div>

       <div className="todo-input-item">
          <input 
          type="text" 
          placeholder="Task Description"
          value={description}
          onChange={(e)=>dispatch({type:"SET_DESCRIPTION", payload: e.target.value})}
          />
       </div>

      <button className="primary-btn" onClick={()=>dispatch({type:"ADD_TODO"})}>Add</button>

     </div>

      <div className="todo-list">
         {todo.list.map(({title, description}, index)=>{
          return(
            <div className="todo-list-item" key={index}>
               <div>
                  <h1>{title}</h1>
                  <p>{description}</p>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={()=>handelDelete(index)}>Delete</button>
               </div>
            </div>
          )
         })}

      </div>
     </div>
    </>
  )
}

export default Todo
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs"
import { useEffect, useState } from "react"
const todolistkey ="todolistkey";

export const useTodolist = (selectDate)=>{
  const defaultTodolist = [];
  const [todolist , setTodolist] = useState(defaultTodolist);
  const [input , setinput] = useState("");

  const addtodo = ()=>{
    const len = todolist.length;
    const lastid = len === 0 ? 0:todolist[len-1].id 
    const newtodolist = [
        ...todolist ,{
            id: lastid + 1,
            content:input,
            date:selectDate,
            issucess:false,
        }
      
    ]
    setTodolist(newtodolist);
    AsyncStorage.setItem(todolistkey,JSON.stringify(newtodolist));/***/
  }
  const removetodo = (todoId) => {
    const newTodoList = todolist.filter((todo)=>todo.id !== todoId);
    setTodolist(newTodoList);
    AsyncStorage.setItem(todolistkey,JSON.stringify(newTodoList));

  }
  const toogletodo = (todoid) => {
    const newTodoList =  todolist.map((todo)=>{
        if (todoid != todo.id ) return todo;
        return {
            ...todo,
        issucess:!todo.issucess,
        }});
        setTodolist(newTodoList);
        AsyncStorage.setItem(todolistkey,JSON.stringify(newTodoList));
  }

  const resetInput = ()=>{
    setinput("");
  }

  const filteredTodoList = todolist.filter((todo)=>{
    const isSame = dayjs(todo.date).isSame(selectDate,'date');
    return isSame;
  });
  

  useEffect(()=>{
    init();
  },[]);
  
  const init = async() =>{
    const result = await AsyncStorage.getItem(todolistkey);
    if(result){
      const newtodolist = JSON.parse(result);
      console.log('newTodoList',typeof newtodolist , newtodolist);
      setTodolist(newtodolist);
    }
    
  }

  return{
    filteredTodoList,
    todolist,
    addtodo,
    toogletodo,
    removetodo,
    setinput,
    input,
    resetInput,
    }
}
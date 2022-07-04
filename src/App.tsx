import { Header } from "./components/Header"
import './global.css'
import { Task } from "./components/Task"
import { TaskList } from "./components/TaskList"
import { v4 as uuidv4 } from 'uuid';
import { client } from "./services/api";
import { useEffect, useState } from "react";
import { Taskmodel } from "./models/Taskmodel";


function App() {
  const [tasks, setTasks ] = useState<Taskmodel[]>([])

  async function handleCreateNewTask(text: string) {
    try{
      await client.post('/tasks', {
        id: uuidv4(),
        text: text,
        isChecked: false
      });

      await getAlltask();
      return true;
      
    }catch(e: any ) {
      alert(e.message)
      return false;
    }    
  }

  async function handleCheckTask(task: Taskmodel) {
    try{
      await client.patch(`/tasks/${task.id}`, {
        isChecked: !task.isChecked
      });

      await getAlltask()
      
    }catch(e: any ) {
      alert(e.message)
    }    
  }
   
  async function handleonDeleteTask(id: string) {
    try{
      await client.delete(`/tasks/${id}`);
      await getAlltask()
      
    }catch(e: any ) {
      alert(e.message)
    }    
  }
   
  async function getAlltask() {
    try{
      const { data } = await client.get<Taskmodel[]>('/tasks');
      setTasks(data)
      
    }catch(e: any ) {
      alert(e.message) 
    }    
  }

  useEffect(()=>{
    getAlltask()
  }, [])

  return (
    <>
      <Header />
      <Task 
        onCreateNewTask={handleCreateNewTask}/>
      <TaskList
        onCheckTask={handleCheckTask}
        onDeleteTask={handleonDeleteTask}
        tasks={tasks}/>
    </>    
  )
}

export { App }

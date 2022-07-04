import { ClipboardText, Trash, Check } from "phosphor-react";
import { Taskmodel } from "../models/Taskmodel";
import styles from './TaskList.module.css'

interface TaskProps {
    tasks: Taskmodel[];
    onCheckTask: (task: Taskmodel) => Promise<void>;
    onDeleteTask: (id: string) => Promise<void>;
}

export function TaskList({tasks, onCheckTask, onDeleteTask}: TaskProps) { 

    async function handleTaskCheck(task: Taskmodel) {       
         await onCheckTask(task) 
    }
   
    async function handleDeleteTask(id: string) {      
        if( confirm("Pressione um botão 'Ok' para confirmar!") == true ) {
            await onDeleteTask(id) 
        }       
   }

    function checkTitle(isCheck:boolean) {
        return isCheck ? 'Marcar como concluída' : 'Remove da lista de concluída';
    }

    function taskCheck(isCheck:boolean) {
        return isCheck ? styles.taskChecked : styles.taskCheck;
    }
    const noTaskState = tasks.length == 0 ? true : false;

    const taskCountDone = tasks.filter(task=> task.isChecked === true)
    
    return (
        <div className={styles.taskList}>
            <div className={styles.wrapper}>

                <div className={styles.taskCount}>
                    <div className={styles.newTask}>
                        <strong>Tarefas criadas</strong>
                        <span>{tasks.length}</span>
                    </div>
                    <div className={styles.taskDone}>
                        <strong>Concluídas</strong>
                        <span>{`${taskCountDone.length} de ${tasks.length}`}</span>
                    </div>
                </div>

                <div className={styles.withOutTask} hidden={!noTaskState}>
                    <div className={styles.withOutTaskContent}>
                        <p><ClipboardText size={56} /></p>
                        <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                        <p><span>Crie tarefas e organize seus itens a fazer</span></p>   
                    </div>        
                </div>
                
                {tasks.map((task: Taskmodel)=>(
                    <div className={styles.taskListBox} key={task.id}>
                        <header>
                            <button title={checkTitle(task.isChecked)} 
                                onClick={()=>handleTaskCheck(task)} name="check">                             
                                <Check className={taskCheck(task.isChecked)}/> 
                            </button>
                            <button title='Remover tarefa'
                                onClick={()=> handleDeleteTask(task.id)}
                                name="delete">
                                <Trash size={16} />
                            </button>
                        </header>                    
                        <p data-check={task.isChecked}>{task.text}</p>
                    </div> 
                ))}

            </div>
        </div>
        
    )
}
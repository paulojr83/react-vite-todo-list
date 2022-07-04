import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from './Task.module.css'

interface TaskProps {
    onCreateNewTask: (text: string) => Promise<boolean>;
}

export function Task({onCreateNewTask}: TaskProps) {
    const [task, setTask] = useState('')

    async function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
        const saved = await onCreateNewTask(task);
        if( !!saved ) {
            setTask('');
        }        
    }
    
    function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
        setTask(event.target.value);
    }

    return (       
        <div className={styles.task}>
            <form className={styles.taskForm} onSubmit={handleCreateNewTask} >
                <input type="text" 
                    placeholder="Adicione uma nova tarefa"
                    required
                    onChange={handleNewTaskTextChange}
                    value={task}
                />
                <button type="submit" >                
                    Criar
                    <PlusCircle size={16} />
                </button> 
            </form>
        </div>
    )
}
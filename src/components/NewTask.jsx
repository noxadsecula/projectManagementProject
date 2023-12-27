import { useState } from "react"
export default function NewTask({onAdd}) {
    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(e) {
        setEnteredTask(e.target.value)
    }

    function handleClick() {
        if(enteredTask.trim() === '') {
            return
        }
        onAdd(enteredTask)
        setEnteredTask('');
        

    }
    return(
        <div className="flex items-center gap-4">
            <input onChange={handleChange} value={enteredTask} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200 focus:outline-none focus:outline-stone-500"/>
            <button onClick={handleClick} className="text-stone-700 hover:text-stone-200 bg-stone-300 hover:bg-stone-500 px-2 py-1 rounded-sm">Add Task</button>
        </div>
    )
}
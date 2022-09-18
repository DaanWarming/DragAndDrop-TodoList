import {useEffect, useState}  from 'react';
import TodoHeader from "./TodoHeader"
import TodoList from "./TodoList"

function Todo() {
    const [taskId, setTaskId] = useState(6)
    const [taskLeft, setTaskLeft] = useState(0)
    const [newTask, setNewTask] = useState("")
    const [newTaskCheck, setNewTaskCheck] = useState(false)
    const [displayListStatus, setDisplayListStatus] = useState("all")
    const [taskList, setTaskList] = useState([
        {
            text: "Complete Todo App",
            isDone: true,
            id: "0"
        },
        {
            text: "Push project to GitHub",
            isDone: true,
            id: "1"
        },
        {
            text: "Jog around the park 3x",
            isDone: false,
            id: "2"
        },
        {
            text: "10 minutes meditation",
            isDone: false,
            id: "3"
        },
        {
            text: "Read for 1 hour",
            isDone: false,
            id: "4"
        },
        {
            text: "Pick up groceries",
            isDone: false,
            id: "5"
        }
    ]);
    const [displayList, setDisplayList] = useState(taskList)
    const [darkMode, setDarkMode] = useState(false)
    // Add new task

    function changeDarkMode() {
        setDarkMode(!darkMode)
        document.body.classList.toggle('body--darkmode')
    }

    function resetNewTask() {
        setNewTask("")
        setNewTaskCheck(false)
    }

    function handleChange(e) {
        setNewTask(e.target.value)
    }

    function handleCheck(e) {
        setNewTaskCheck(e.target.checked)
    }

    function addTask() {
        setTaskList([
        ...taskList, 
        {
            text: newTask,
            isDone: newTaskCheck,
            id: taskId.toString()
        }
        ])
    }

    // Change task status

    function handleCheckBox(id) {
        setTaskList(
            taskList.map(obj => {
                if (obj.id === id) {
                    return {...obj, isDone: !obj.isDone}
                } else {
                    return obj
                }
            }))
    }

    function handleDelete(taskId) {
        setTaskList(
            taskList.filter(t => t.id !== taskId)
        )
    }

    // Changes tasks buttons

    function tasksLeft(taskList) {
        const tasksToDo = taskList.filter(item => item.isDone === false);
        setTaskLeft(tasksToDo.length)
    }

    function clearCompleted(e) {
        e.preventDefault()
        setTaskList(
            taskList.filter(task => task.isDone === false)
        )
    }

    function showAll(e) {
        e.preventDefault()
        setDisplayList(taskList)
        setDisplayListStatus("all")
    }

    function showActive(e) {
        e.preventDefault()
        setDisplayListStatus("active")
        setDisplayList(taskList.filter(task => task.isDone === false))
    }

    function showCompleted(e) {
        e.preventDefault()
        setDisplayListStatus("completed")
        setDisplayList(taskList.filter(task => task.isDone === true))
    }

    function correctList() {
        if (displayListStatus === "completed") {
            setDisplayList(taskList.filter(task => task.isDone === true))
        } else if (displayListStatus === "active") {
            setDisplayList(taskList.filter(task => task.isDone === false))
        } else {
            setDisplayList(taskList)
        }
    }

    useEffect(() => {
        setTaskId(taskId + 1)
        tasksLeft(taskList)
        correctList()
    }, [taskList])


    return (
        <div className="body--class">
            <TodoHeader resetNewTask={resetNewTask} newTask={newTask} newTaskCheck={newTaskCheck} handleChange={handleChange} handleCheck={handleCheck} addTask={addTask} changeDarkMode={changeDarkMode} darkMode={darkMode}/>
            <TodoList taskList={taskList} taskLeft={taskLeft} handleCheckBox={handleCheckBox} handleDelete={handleDelete} clearCompleted={clearCompleted} displayList={displayList} showAll={showAll} showActive={showActive} showCompleted={showCompleted} displayListStatus={displayListStatus} darkMode={darkMode} />
        </div>
    )
}

export default Todo
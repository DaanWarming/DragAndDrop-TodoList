import {useState}  from 'react';
import IconCross from "./images/icon-cross.svg"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



function TodoList({taskList, taskLeft, handleCheckBox, handleDelete, clearCompleted, displayList, showAll, showActive, showCompleted, displayListStatus, darkMode, handleOnDragEnd, characters}) {


  function RenderList() {
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
              <ul className={darkMode ? "list--container list--container--dark-mode side-margins" : "list--container side-margins"} {...provided.droppableProps} ref={provided.innerRef}>
                {displayList.map((task , index) => {
                  return (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <li className={darkMode ? "list__task list__task--dark-mode" : "list__task"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <input type="checkbox" checked={task.isDone} onChange={() => handleCheckBox(task.id)} className={darkMode ? "check-box check-box--dark-mode" : "check-box"}></input>
                          {task.isDone ? <p className={darkMode ? "list__task__text--done list__task__text--done--dark-mode" : "list__task__text--done"}><s>{task.text}</s></p> : <p className={darkMode ? "list__task__text list__task__text--dark-mode" : "list__task__text"}>{task.text}</p>}
                          <img src={IconCross} onClick={() => handleDelete(task.id)} className="list__task__delete-icon"></img>
                          {provided.placeholder}
                        </li>
                      )}
                    </Draggable>
                  )  
                })}
              </ul>
            )}
        </Droppable>
      </DragDropContext>
    )
  }

  return (
    <div className="todo-list">
      <form className='padding-container'>
        <RenderList />
        <div className={darkMode ? "list__info--container list__info--container--dark-mode side-margins" : "list__info--container side-margins"}>
          <p className="list__info--items-left">{taskLeft} item left</p>
          <button onClick={clearCompleted} className="list__info--clear-btn">Clear Completed</button>
        </div>

        <div className={darkMode ? "list__buttons--container list__buttons--container--dark-mode side-margins" : "list__buttons--container side-margins"}>
          <button onClick={showAll} className={displayListStatus == "all" ? "list__buttons--btn--active" : "list__buttons--btn"}>All</button>
          <button onClick={showActive} className={displayListStatus == "active" ? "list__buttons--btn--active list__buttons--active-btn" : "list__buttons--active-btn list__buttons--btn"}>Active</button>
          <button onClick={showCompleted} className={displayListStatus == "completed" ? "list__buttons--btn--active" : "list__buttons--btn"}>Completed</button>
        </div>
      </form>
    </div>
  );
}

export default TodoList;

import {useState}  from 'react';
import IconCross from "./images/icon-cross.svg"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



function TodoList({taskList, taskLeft, handleCheckBox, handleDelete, clearCompleted, displayList, showAll, showActive, showCompleted, displayListStatus, darkMode}) {
  const [characters, updateCharacters] = useState(displayList)

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }


  function RenderList() {
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
              <ul className={darkMode ? "list--container list--container--dark-mode side-margins" : "list--container side-margins"} {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({text, id, isDone} , index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li className={darkMode ? "list__task list__task--dark-mode" : "list__task"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <input type="checkbox" checked={isDone} onChange={() => handleCheckBox(id)} className={darkMode ? "check-box check-box--dark-mode" : "check-box"}></input>
                          {isDone ? <p className={darkMode ? "list__task__text--done list__task__text--done--dark-mode" : "list__task__text--done"}><s>{text}</s></p> : <p className={darkMode ? "list__task__text list__task__text--dark-mode" : "list__task__text"}>{text}</p>}
                          <img src={IconCross} onClick={() => handleDelete(id)} className="list__task__delete-icon"></img>
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

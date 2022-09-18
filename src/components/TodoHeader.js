import {useState}  from 'react';
import IconMoon from "./images/icon-moon.svg"
import IconSun from "./images/icon-sun.svg"

function TodoHeader({resetNewTask, newTask, newTaskCheck, handleChange, handleCheck, addTask, changeDarkMode, darkMode}) {

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault()
            addTask()
            resetNewTask()
        }
    }

    return (
        <div className='header--container'>
            <header className={darkMode ? "header header-dark-mode" : "header"}>
                <div className='padding-container'>
                    <div className='header__top--container side-margins'>
                        <h1 className='header__top--logo'>TODO</h1>
                        <img src={darkMode ? IconSun : IconMoon}className="header__top--darkmode-icon" onClick={changeDarkMode}></img>
                    </div>
                    
                    <form className={darkMode ? 'header__input--container header__input--container--dark-mode side-margins' : 'header__input--container side-margins'}>
                        <input type="checkbox" checked={newTaskCheck} onChange={handleCheck} onKeyDown={handleKeyDown} className={darkMode ? "check-box check-box--dark-mode" : "check-box"}></input>
                        <input type="text" value={newTask} placeholder="Create a new todo..." onChange={handleChange} onKeyDown={handleKeyDown} className={darkMode ? "header__input--text header__input--text--dark-mode" : "header__input--text"}></input>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default TodoHeader;

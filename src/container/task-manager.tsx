import React, {Component} from 'react';
import '../App.css';
import TaskStatus from './task-status';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

interface IProps{
}

interface IState{
}

class TaskManager extends Component{
 
    render(){
        return(
            <div className="main-container">
                <div className="main-title">Task Manager</div>
                <DndProvider backend={HTML5Backend}>
                    <TaskStatus />
                </DndProvider>
            </div>
        )
    }
}



export default TaskManager
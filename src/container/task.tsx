import React, {Component} from 'react';
import {compose} from 'redux';
import '../App.css';
// import {DragSource} from 'react-dnd';
// import {ItemTypes} from './constants';
import {ITask} from '../interfaces/task';
// import {statuses} from '../data/status';
// import {connect} from 'react-redux';
// import { changeStatus,dragTaskToStatusActive } from '../actions/tasks';
import TaskItem from './taskItem';


interface IProps{
    task: ITask[];
    // changeStatus:any;
    // isDragging: any;
    // connectDragSource: any;
}

interface IState{
}

class Task extends Component<IProps,IState>{
    constructor(props: IProps){
        super(props)
    }

    render(){
        return ( 
            this.props.task.map(task =>(
                    <TaskItem key={task.id} id={task.id} name={task.taskName} status={task.status} />
                ))
        )
        
    }
}


export default Task
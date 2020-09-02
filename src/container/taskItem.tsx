import React, {Component} from 'react';
import {compose} from 'redux';
import '../App.css';
import {DragSource} from 'react-dnd';
import {ItemTypes} from './constants';
import {ITask} from '../interfaces/task';
import {statuses} from '../data/status';
import {connect} from 'react-redux';
import { changeStatus, changeTaskName, removeTask } from '../actions/tasks';
import TaskDeleteIcon from '../component/task-delete-icon';
import '../icon.css';
import '../fields.css';

interface IProps{
    name:string;
    id:number;
    status:string;
    changeStatus:any;
    removeTask:any;
    isDragging: any;
    connectDragSource: any;
    changeTaskName:any;
}

interface IState{
}

const taskSpec = {
    beginDrag(props:any){
        console.log("begin drag", props.status);
        return {
            name: props.name,
            id: props.id,
            status: props.status
        }
    },
    endDrag(props:any,monitor:any,component:any){
        if(monitor.didDrop()){
            const dragItem = monitor.getItem();
            const dropResult = monitor.getDropResult();

            console.log("You dropped ", dragItem.name, 'into ', dropResult.name)
            props.changeStatus(dragItem.id,dropResult.name)
        }else{
            const dragItem = monitor.getItem();
            console.log(dragItem.name, dragItem.id, dragItem.status)
            return;
        }
    }
}

let collect = (connect:any, monitor:any) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class TaskItem extends Component<IProps,IState>{
    constructor(props: IProps){
        super(props)
    }

    handleChange = (e: React.FormEvent<HTMLSelectElement>, id: number) => {
        this.props.changeStatus(id,e.currentTarget.value);
    }

    changeTaskName = (e: React.ChangeEvent<HTMLInputElement>, id: number) =>{
        this.props.changeTaskName(id,e.currentTarget.value)
    }

    removeTask = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: number) =>{
        console.log(id)
        this.props.removeTask(id);
    }


    render(){
        const {id,name,status} = this.props;
        const {isDragging, connectDragSource} = this.props;
        return connectDragSource(
            <div className="task-size" key={id}>
                        <div className="container-input-task">
                            <input className="input-task" type="text" value={name} 
                            onChange={e => this.changeTaskName(e,id)}/>
                        </div>
                        <div className="task-bottom-container">
                        <span className="status-dropdown">
                        <select className="status-select" value={status} onChange={e => this.handleChange(e,id)} name="Status" id="status">
                        {statuses.map(status =>(
                           <option key={status.id} value={status.statusName}>{status.statusName}</option>
                        ))}
                        </select>
                        </span>
                        <span onClick={e => this.removeTask(e,id)} className="delete-icon"><TaskDeleteIcon/></span>
                        </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        changeStatus: (id:number, status:string) => {
            dispatch(changeStatus(id,status));
        },
        changeTaskName: (id: number, name: string) =>{
            dispatch(changeTaskName(id,name))
        },
        removeTask: (id:number) => {
            dispatch(removeTask(id))
        }
    };
};

export default connect(null,mapDispatchToProps)(DragSource(ItemTypes.Task,taskSpec,collect)(TaskItem))


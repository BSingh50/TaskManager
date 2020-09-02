import React, {Component} from 'react';
import Task from './task';
import {connect} from 'react-redux';
import {DropTarget} from 'react-dnd';
import {ItemTypes} from './constants';
import { ITask } from '../interfaces/task';
import '../App.css';
import {statusTaskOptions} from '../data/status-task-dropdown';
import StatusTaskMenu from '../component/status-task-menu';
import AddIcon from '@material-ui/icons/Add';
import {addTask} from '../actions/tasks';
import '../icon.css';

interface IProps{
    statusName:string,
    statusId: number,
    addTask:any;
    canDrop:any,
    isOver:any,
    connectDropTarget:any
    taskList:ITask[],
}

interface IState{
}

const TaskStatusSpec = {
    drop(props:any){
        return {name: props.statusName}
    }
}

let collect = (connect: any, monitor: any) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}


  
class StatusItem extends Component<IProps,IState>{

    constructor(props: IProps){
        super(props);
    }

    addTaskIcon = (e:any) => {
        const newId = this.props.taskList.length > 0
        ? this.props.taskList[this.props.taskList.length - 1].id 
        : 0;
        this.props.addTask({id: newId + 1, taskName: 'new task', status: this.props.statusName});
    }

    render(){
        const {taskList,statusName} = this.props;
        const {canDrop, isOver, connectDropTarget} = this.props;
        console.log(taskList)
        return connectDropTarget (
            <div className="status">
                <div className="status-container">
                <div className="header-container">
                    <span className="status-name">{statusName}</span>
                    <span className="dropdown"><StatusTaskMenu tasks={taskList} status={statusName}/></span>
                </div>
                <Task task={taskList.filter(task => task.status == statusName)}/>
                <div className="add-task-icon"><AddIcon className='icon-add'  onClick={e => this.addTaskIcon(e)} /></div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state:any){
    return{
        taskList: state.task
    }
}

const mapDispatchToProps = (dispatch:any) =>{
    return {
        addTask: (newTask: ITask) => {
            dispatch(addTask(newTask))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DropTarget(ItemTypes.Task,TaskStatusSpec,collect)(StatusItem))
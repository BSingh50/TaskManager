import { RECEIVE_TASKS } from '../actions/tasks';
import {ITask} from '../interfaces/task';
import {tasksData} from '../data/task';
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const DRAG_TASK_TO_STATUS_ACTIVE = 'DRAG_TASK_TO_STATUS'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME'
export const REMOVE_ALL_TASKS = 'REMOVE_ALL_TASKS'
export const REMOVE_TASK = 'REMOVE_TASK'
export const MOVE_ALL_TASKS_TO_STATUS = 'MOVE_ALL_TASKS_TO_STATUS'

interface ActionA {
    type: 'RECEIVE_TASKS';
    Tasks: ITask[];
}

interface ActionB {
    type: 'CHANGE_STATUS';
    id: number;
    status: string;
}

interface ActionC {
    type: 'ADD_TASK';
    newTask: ITask;
} 

interface ActionD {
    type: 'CHANGE_TASK_NAME';
    id: number;
    newTaskName: string;
} 

interface ActionE {
    type: 'REMOVE_TASK';
    id: number;
}

interface ActionF {
    type: 'REMOVE_ALL_TASKS';
    status: string
}

interface ActionG {
    type: 'MOVE_ALL_TASKS_TO_STATUS';
    currentStatus: string,
    newStatus: string
}


interface State {
    [key: number]: any;
    task: ITask[];  
  }

const initialState: State = {
    task: tasksData
  };

type Action = ActionA | ActionB | ActionC | ActionD | ActionE | ActionF | ActionG;

export default function tasks(state=initialState,action:Action):State {
    switch(action.type){
        case RECEIVE_TASKS:
            return {
                ...state,
                ...action.Tasks
            }
        case CHANGE_STATUS:
            return{
                ...state,
                task:state.task.map(t => (t.id === action.id ? {...t, status:action.status} : t))
                
            }
        case ADD_TASK:
            return{
                ...state,
                task: [...state.task, action.newTask]
            }
        case CHANGE_TASK_NAME:
            return{
                ...state,
                task: state.task.map(t => (t.id == action.id ? {...t, taskName: action.newTaskName} : t))
            }
        case REMOVE_TASK:
            return {
                task: state.task.filter(t => t.id != action.id)
            }
        case REMOVE_ALL_TASKS:
            return {
                task: state.task.filter(t => t.status != action.status)
            }
        case MOVE_ALL_TASKS_TO_STATUS:
            return {
                ...state,
                task: state.task.map(t => (t.status == action.currentStatus ? {...t, status:action.newStatus}: t))
            }
        
        default:
            return state
    }
}
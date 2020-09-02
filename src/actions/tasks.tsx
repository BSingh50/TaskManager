import {ITask} from '../interfaces/task'
import {CHANGE_STATUS,ADD_TASK,CHANGE_TASK_NAME,REMOVE_ALL_TASKS, REMOVE_TASK, MOVE_ALL_TASKS_TO_STATUS} from '../reducers/tasks'


export const RECEIVE_TASKS = 'RECEIVE_TASKS'
// export const CHANGE_STATUS = 'CHANGE_STATUS'
// export const ADD_TASK = 'ADD_TASK';
// export const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME';


export function receiveTasks(tasks: ITask[]){
    return{
        type: RECEIVE_TASKS,
        tasks
    }
}

export function changeStatus(task_id: number, status: string){
    return{
        type:CHANGE_STATUS,
        id:task_id,
        status:status
    }
}

export function addTask(newTask: ITask){
    return{
        type:ADD_TASK,
        newTask: newTask
    }
}

export function changeTaskName(id: number, newTaskName: string){
    return{
        type:CHANGE_TASK_NAME,
        id: id,
        newTaskName:newTaskName
    }
}

export function removeTask(id: number){
    return{
        type:REMOVE_TASK,
        id: id
    }
}

export function removeAllTasks(status: string){
    return{
        type:REMOVE_ALL_TASKS,
        status: status
    }
}

export function moveAllTasksToStatus(currentStatus: string, newStatus: string){
    return {
        type: MOVE_ALL_TASKS_TO_STATUS,
        currentStatus: currentStatus,
        newStatus: newStatus

    }
}
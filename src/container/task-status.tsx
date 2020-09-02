import React, {Component} from 'react';
import '../App.css';
import {statuses} from '../data/status';
import {ITask} from '../interfaces/task';
import StatusItem from './status-item';
interface IProps{
}

interface IState{
}

class TaskStatus extends Component<IProps,IState>{

        constructor(props: IProps){
            super(props);
        }

        render(){
            return ( 
                statuses.map(status=>(
                    <StatusItem key={status.id} statusId={status.id} statusName={status.statusName} />
                    )
                )
            )
        }
}


export default TaskStatus
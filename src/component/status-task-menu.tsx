import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import {addTask,removeAllTasks,moveAllTasksToStatus} from '../actions/tasks';
import {connect} from 'react-redux';
import {ITask} from '../interfaces/task';
import '../MuiStyles.css'
import {statuses} from '../data/status';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const theme = createMuiTheme({
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 10,
      },
    props: {
      // Name of the component
      MuiButtonBase: {
        // The properties to apply
        disableRipple: true // No more ripple, on the whole application!
      },
    }
  });

  const useStyles = () => ({
    MuiMenuItemRoot: {
      FontSize: 0.6,
    }
  });

function StatusTaskMenu(props:any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElSub, setAnchorElSub] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openSubMenu = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAnchorElSub(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElSub(null);
  };

  const addTask = () =>{
    setAnchorEl(null);
    const newId = props.tasks[props.tasks.length - 1].id;
    props.addTask({id: newId + 1, taskName: 'new task', status: props.status});
  }

  const removeAllTasks = () =>{
    setAnchorEl(null);
    props.removeAllTasks(props.status);
  }

  const moveAllTasksToStatus = (e: React.MouseEvent<HTMLLIElement, MouseEvent>,newStatus: string) =>{
    setAnchorElSub(null);
    console.log(props.status,newStatus)

    props.moveAllTasksToStatus(props.status,newStatus);
  }

  return (
    <MuiThemeProvider theme={theme}>
    <div>
    <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon className="icon-dots"
 />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={addTask}>Add Task</MenuItem>
        <MenuItem onClick={removeAllTasks}>Remove All Tasks</MenuItem>
        <MenuItem onClick={openSubMenu}>Move All Tasks to Status</MenuItem>
      </Menu>
      <Menu
        className="subMenu"
        id="simple-menu"
        anchorEl={anchorElSub}
        keepMounted
        open={Boolean(anchorElSub)}
        onClose={handleClose}
      >
        {statuses.map(status =>
          <MenuItem key={status.id} onClick={e => moveAllTasksToStatus(e, status.statusName)}>{status.statusName}</MenuItem>
        )}
      </Menu>
    </div>
    </MuiThemeProvider>
  );
}

const mapDispatchToProps = (dispatch:any) =>{
    return {
        addTask: (task: ITask) =>{
            dispatch(addTask(task))
        },
        removeAllTasks: (status: string) => {
          dispatch(removeAllTasks(status))
        },
        moveAllTasksToStatus: (currentStatus: string, newStatus: string) => {
          dispatch(moveAllTasksToStatus(currentStatus,newStatus))
        }
    }
}

export default connect(null,mapDispatchToProps)(StatusTaskMenu)

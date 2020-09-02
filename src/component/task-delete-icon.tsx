import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { AnyIfEmpty } from 'react-redux';
import React from 'react';

const styles = (theme:any) => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 15,
    cursor:'pointer'
  },
});

function TaskDeleteIcon(props:any){
    const { classes } = props;

        return(
            <DeleteIcon className={`${classes.icon} icon-bin`} />
        )
}

export default withStyles(styles)(TaskDeleteIcon)

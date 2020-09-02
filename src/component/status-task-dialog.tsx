import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function StatusTaskDialog(props:any) {
  const [open, setOpen] = React.useState(false);


  return (
    <div>
      <Dialog open={props.open} onClose={props.handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Move to Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose Status to move all tasks to
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Status"
            type="status"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
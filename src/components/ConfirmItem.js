

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import './confirmmodel.css'; // Import the sci-fi themed CSS

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ConfirmModal({ open, handleClose }) {
  const [exiting, setExiting] = useState(false);

  const handleDialogClose = () => {
    setExiting(true);
    setTimeout(() => {
      handleClose();
      setExiting(false);
    }, 500); // Match this duration with the exit animation
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={exiting ? 'dialog-exit' : 'dialog-enter'}
        PaperProps={{
          className: 'sci-fi-modal-container'
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="sci-fi-modal-title"
        >
          {"How to make a purchase with Sindhuli Bazar Express "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="sci-fi-modal-content"
          >
            ONLY AVAILABLE FOR SINDHULI MADHI<p/>
            step-1: select the quantity of item you want to purchase
            <p /> step-2: click on -Order with Whatsapp- Button and continue to chat
            <p /> step-3: you will be in dealer message box, forward the already typed order message and wait for Confirmation
            <p /> step-4: Once you get the confirm message- send the payment to the qr provided in chat
            <p /> step-5: Share your live location in the chat and address details
            <p /> step-6: Your delivery will be on your door step in a while
          </DialogContentText>
        </DialogContent>
        <DialogActions className="sci-fi-modal-actions">
          <Button
            onClick={handleDialogClose}
            className="sci-fi-modal-button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDialogClose}
            autoFocus
            className="sci-fi-modal-button"
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import "./confirmmodel.css"; // Import the sci-fi themed CSS

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
        className={exiting ? "dialog-exit" : "dialog-enter"}
        PaperProps={{
          className: "sci-fi-modal-container",
        }}
      >
        <DialogTitle id="alert-dialog-title" className="sci-fi-modal-title">
          How to make a purchase with Sindhuli Bazar Express
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="sci-fi-modal-content"
            component="div"
          >
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
              ONLY AVAILABLE FOR SINDHULI MADHI
            </div>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                Step 1: Select the quantity of the item you want to purchase.
              </li>
              <li>
                Step 2: Click on the <strong>Order with WhatsApp</strong> button
                and continue to chat.
              </li>
              <li>
                Step 3: You'll be taken to the dealer’s message box — just
                forward the pre-typed order message and wait for confirmation.
              </li>
              <li>
                Step 4: Once confirmed, send your payment to the QR code
                provided in the chat.
              </li>
              <li>
                Step 5: Share your live location and full delivery address in
                the chat.
              </li>
              <li>
                Step 6: Your order will be delivered to your doorstep shortly.
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>

        <DialogActions className="sci-fi-modal-actions">
          <Button onClick={handleDialogClose} className="sci-fi-modal-button">
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

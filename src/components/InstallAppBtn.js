import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";

const InstallAppBtn = ({ drawerMode = false }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showInstallBtn, setShowInstallBtn] = useState(true);
  const [showAlert, setShowAlert] = useState(false); // ← for custom alert

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowDialog(true); // Ask install on first prompt
    };

    window.addEventListener("beforeinstallprompt", handler);

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (isStandalone) {
      setShowInstallBtn(false);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleUserResponse = (agree) => {
    setShowDialog(false);
    if (agree) {
      setShowInstallBtn(true);
    }
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("✅ User accepted install");
        setShowInstallBtn(false);
      } else {
        console.log("❌ User dismissed install");
      }
    } else {
      setShowAlert(true); // Show custom alert
    }
  };

  return (
    <>
      {/* Install Confirmation Dialog */}
      <Dialog open={showDialog} onClose={() => handleUserResponse(false)}>
        <DialogTitle>
          Would you like to install this app for faster access?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleUserResponse(false)}>No</Button>
          <Button onClick={() => handleUserResponse(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Custom Alert Dialog for fallback */}
      <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
        <DialogTitle>⚠️ Cannot Install</DialogTitle>
        <DialogContent>
          <Typography>
            This app might already be installed or is not installable on this browser.
            <br />
            To install manually, open your browser menu (three dots ⋮) and select{" "}
            <strong>“Install App”</strong> or <strong>“Add to Home Screen”</strong>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAlert(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Install Button (only if user agreed) */}
      {showInstallBtn && (
        <Button
          variant="contained"
          color={drawerMode ? "warning" : "primary"}
          startIcon={<DownloadIcon />}
          onClick={handleInstall}
          sx={{
            mt: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: 14,
            px: 2,
            py: 1,
            background: drawerMode
              ? "linear-gradient(90deg, #FBA518 60%, #F9CB45 100%)"
              : "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
            color: "#fff",
            boxShadow: drawerMode
              ? "0 2px 6px rgba(251, 165, 24, 0.3)"
              : "0 2px 6px rgba(25, 118, 210, 0.3)",
            "&:hover": {
              background: drawerMode
                ? "linear-gradient(90deg, #F9CB45 60%, #FBA518 100%)"
                : "linear-gradient(90deg, #1565c0 60%, #1976d2 100%)",
            },
          }}
        >
          Install App
        </Button>
      )}
    </>
  );
};

export default InstallAppBtn;

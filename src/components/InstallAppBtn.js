import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

const InstallAppBtn = ({ drawerMode }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } else {
      alert("App might already be installed or this browser doesn't support manual installation.");
    }
  };

  return (
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
  );
};

export default InstallAppBtn;

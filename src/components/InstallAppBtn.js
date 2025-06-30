import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

const InstallAppBtn = ({ drawerMode }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShow(false);
        setDeferredPrompt(null);
      }
    }
  };

  if (!show) return null;

  return (
    <Button
      variant="contained"
      color={drawerMode ? "warning" : "primary"}
      startIcon={<DownloadIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />}
      onClick={handleInstall}
      sx={{
        borderRadius: 999,
        fontWeight: 600,
        ml: { xs: 1, sm: 2 },
        boxShadow: drawerMode ? "0 2px 8px rgba(251, 165, 24, 0.12)" : "0 2px 8px rgba(25, 118, 210, 0.08)",
        textTransform: "none",
        fontSize: { xs: 11, sm: 13, md: 15 },
        px: { xs: 1, sm: 2 },
        py: { xs: 0.5, sm: 1 },
        minWidth: { xs: 0, sm: 90 },
        height: { xs: 28, sm: 34 },
        background: drawerMode
          ? {
              xs: "linear-gradient(90deg, #FBA518 60%, #F9CB45 100%)",
              sm: "linear-gradient(90deg, #FBA518 60%, #F9CB45 100%)"
            }
          : {
              xs: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
              sm: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)"
            },
        color: drawerMode ? "#fff" : "#fff",
        border: "none",
        letterSpacing: 0.5,
        transition: "all 0.2s",
        whiteSpace: 'nowrap',
        '&:hover': {
          background: drawerMode
            ? "linear-gradient(90deg, #F9CB45 60%, #FBA518 100%)"
            : "linear-gradient(90deg, #1565c0 60%, #1976d2 100%)",
          color: "#fff",
        },
      }}
    >
      <span style={{ fontWeight: 600, letterSpacing: 0.5 }}>Install App</span>
    </Button>
  );
};

export default InstallAppBtn;

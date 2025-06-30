import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

const InstallAppBtn = ({ drawerMode }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true); // show button only if install is available
    };

    window.addEventListener("beforeinstallprompt", handler);

    // If already installed (PWA), hide the install button
    const isInStandaloneMode = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isInStandaloneMode()) {
      setShowInstallBtn(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
        setShowInstallBtn(false); // hide after install
      } else {
        console.log("User dismissed the A2HS prompt");
      }
    } else {
      alert("App might already be installed or not installable on this browser.");
    }
  };

  if (!showInstallBtn) return null; // Hide button if not installable

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

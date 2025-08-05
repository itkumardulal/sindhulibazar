import React, { useState } from "react";

export default function Rpmcheckup() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nepal Leadership Technology PVT. LTD.</h1>
      <h2 style={styles.heading}>PC Health Checkup Instructions</h2>

      <div style={styles.section}>
        <h3 style={styles.subheading}>1. Check System Model</h3>
        <pre style={styles.codeBlock}>
          wmic computersystem get model,name,manufacturer
        </pre>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>2. Check IP Address</h3>
        <pre style={styles.codeBlock}>ipconfig</pre>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>3. Check Serial Number</h3>
        <pre style={styles.codeBlock}>wmic bios get serialnumber</pre>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>4. Check System Tag</h3>
        <pre style={styles.codeBlock}>wmic systemsystem get tag</pre>
      </div>

      {/* Additional PC Health Checks */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>5. Check Available Disk Space</h3>
        <pre style={styles.codeBlock}>
          wmic logicaldisk get size,freespace,caption
        </pre>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>6. Check CPU Usage</h3>
        <pre style={styles.codeBlock}>wmic cpu get loadpercentage</pre>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>7. Check RAM Usage</h3>
        <pre style={styles.codeBlock}>
          wmic os get freephysicalmemory,totalvisiblememorysize
        </pre>
      </div>

      {/* OS Check */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>8. Check Operating System</h3>
        <pre style={styles.codeBlock}>wmic os get caption</pre>
      </div>

      {/* New System Checks */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>9. Run System File Checker (SFC)</h3>
        <pre style={styles.codeBlock}>sfc /scannow</pre>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>10. Check Disk for Errors (CHKDSK)</h3>
        <pre style={styles.codeBlock}>chkdsk /f /r</pre>
      </div>

      {/* Hard Disk Health Check */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>11. Check Hard Disk Health</h3>
        <pre style={styles.codeBlock}>wmic diskdrive get status</pre>
      </div>

      {/* Dropdown Button */}
      <div style={styles.dropdownContainer}>
        <button onClick={toggleDropdown} style={styles.dropdownButton}>
          Show Extra PC Health Check Commands
        </button>

        {isDropdownOpen && (
          <div style={styles.dropdownContent}>
            {/* Extra Commands */}
            <div style={styles.section}>
              <h3 style={styles.subheading}>
                12. Check for Installed Software
              </h3>
              <pre style={styles.codeBlock}>wmic product get name</pre>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subheading}>13. Check System Uptime</h3>
              <pre style={styles.codeBlock}>wmic os get lastbootuptime</pre>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subheading}>
                14. Check Network Adapter Status
              </h3>
              <pre style={styles.codeBlock}>
                wmic nic get adaptertype,netconnectionid,status
              </pre>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subheading}>15. Check Memory Usage</h3>
              <pre style={styles.codeBlock}>
                wmic memorychip get capacity,devicelocator
              </pre>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subheading}>16. Check System Events Log</h3>
              <pre style={styles.codeBlock}>
                wevtutil qe System /f:text /c:5
              </pre>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subheading}>17. Check System Services</h3>
              <pre style={styles.codeBlock}>sc query</pre>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subheading}>
                18. Check Battery Health (Laptop)
              </h3>
              <pre style={styles.codeBlock}>
                wmic path win32_battery get batterystatus
              </pre>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subheading}>19. Check Windows Version</h3>
              <pre style={styles.codeBlock}>winver</pre>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subheading}>
                20. Check Disk Partition Information
              </h3>
              <pre style={styles.codeBlock}>diskpart</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    color: "#f1f1f1",
    padding: "40px",
    borderRadius: "10px",
    fontFamily: "'Courier New', Courier, monospace",
    maxWidth: "850px",
    margin: "40px auto",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    textAlign: "left",
  },
  title: {
    textAlign: "center",
    fontSize: "34px",
    color: "#76c7c0",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  heading: {
    textAlign: "center",
    fontSize: "30px",
    color: "#76c7c0",
    marginBottom: "30px",
  },
  section: {
    marginBottom: "26px",
  },
  subheading: {
    fontSize: "22px",
    color: "#f39c12",
    marginBottom: "12px",
  },
  codeBlock: {
    backgroundColor: "#2c3e50",
    padding: "18px",
    borderRadius: "8px",
    fontSize: "16px",
    color: "#ecf0f1",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  dropdownContainer: {
    textAlign: "center",
    marginTop: "40px",
  },
  dropdownButton: {
    backgroundColor: "#f39c12",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    transition: "background-color 0.3s",
    fontWeight: "bold",
  },
  dropdownContent: {
    marginTop: "20px",
    backgroundColor: "#34495e",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  },
};

// Clean & Human-readable initialization
export const initializePi = () => {
  if (window.Pi) {
    try {
      window.Pi.init({ version: "1.5", sandbox: true });
      console.log("✅ Pi SDK initialized for Sandbox");
    } catch (error) {
      console.error("❌ Pi SDK init failed:", error);
    }
  }
};

// Initializing Pi SDK for Sandbox environment
export const initPiSDK = () => {
  if (window.Pi) {
    window.Pi.init({ version: "1.5", sandbox: true });
    console.log("Pi SDK initialized in Sandbox mode");
  } else {
    console.error("Pi SDK script not found");
  }
};

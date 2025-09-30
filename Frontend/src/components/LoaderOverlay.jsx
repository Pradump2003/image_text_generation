// LoaderOverlay.jsx
import { Circles } from "react-loader-spinner";

export default function LoaderOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.6)", // semi-transparent
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Circles height="80" width="80" color="#007bff" ariaLabel="loading" />
    </div>
  );
}

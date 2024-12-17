import React from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = ({ url }) => (
    <div style={styles.container}>
        <QRCode value={url} size={400} fgColor="#000000" bgColor="#ffffff" />
    </div>
);
const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "white", // White background
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        width: "250px",
        height: "250px",
    },
    name: {
        fontSize: "28px", // Font size for the device name
        fontWeight: "bold", // Bold text
        color: "#007acc", // Dark blue color for the text
        margin: 0, // Remove default margin
    },
};
export default QRCodeGenerator;

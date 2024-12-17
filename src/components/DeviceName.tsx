import React from "react";

type DeviceNameProps = {
    name: string; // The name of the device to display
};

const DeviceName: React.FC<DeviceNameProps> = ({ name }) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.name}>{name}</h1>
        </div>
    );
};

const styles = {
    container: {
        marginBottom: "20px", // Space below the name
        textAlign: "center", // Center the text
        padding: "10px 0", // Padding for the container
        backgroundColor: "#e6f7ff", // Light blue background
        borderRadius: "8px", // Rounded corners
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
    },
    name: {
        fontSize: "28px", // Font size for the device name
        fontWeight: "bold", // Bold text
        color: "#007acc", // Dark blue color for the text
        margin: 0, // Remove default margin
    },
};

export default DeviceName;

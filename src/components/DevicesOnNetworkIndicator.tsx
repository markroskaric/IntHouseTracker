import React from "react";

// Define the props for the DevicesOnNetworkIndicator component
interface DevicesOnNetworkIndicatorProps {
    deviceCount: number; // Prop to specify the number of devices
}

const DevicesOnNetworkIndicator: React.FC<DevicesOnNetworkIndicatorProps> = ({ deviceCount }) => {
    return (
        <div style={styles.container}>
            <div style={styles.indicator}>
                <span style={styles.deviceCount}>{deviceCount}</span>
            </div>
            <span style={styles.statusText}>Device on Network</span>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "white", // White background
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        width: "250px",
        height: "60px",
    },
    indicator: {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "10px",
        backgroundColor: "#3992FF", // Blue background for the indicator
        color: "white", // White text for the count
        fontWeight: "bold",
        fontSize: "16px",
    },
    statusText: {
        fontSize: "16px",
        color: "#333", // Dark text for contrast
        fontWeight: "500",
    },
};

export default DevicesOnNetworkIndicator;

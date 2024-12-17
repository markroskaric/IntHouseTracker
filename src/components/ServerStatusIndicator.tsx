import React from "react";

type ServerStatusIndicatorProps = {
    isOnline: boolean; // Prop to determine online status
    text: string;
};

const ServerStatusIndicator: React.FC<ServerStatusIndicatorProps> = ({ isOnline, text }) => {
    return (
        <div style={styles.container}>
            <div
                style={{
                    ...styles.indicator,
                    backgroundColor: isOnline ? "#48bb78" : "#f56565",
                    animation: !isOnline ? "pulse 1.5s infinite" : "none", // Apply animation only when offline
                }}
            >
                <div
                    style={{
                        ...styles.dot,
                        backgroundColor: "#fff", // Set the dot color to white for both statuses
                    }}
                ></div>
            </div>
            <span style={styles.statusText}>
                {isOnline ? `${text} is Online` : `${text} is Offline`}
            </span>
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
        border: `3px solid #e3e3e3`, // Border color can remain based on status if needed
        transition: "transform 0.2s",
    },
    dot: {
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        // The dot color is now consistent for both online and offline
    },
    statusText: {
        fontSize: "16px",
        color: "#333", // Dark text for contrast
        fontWeight: "500",
    },
};

// Add keyframes for the pulse animation
const pulseAnimation = `
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
`;

// Create a style element and append the keyframes
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = pulseAnimation;
document.head.appendChild(styleSheet);

export default ServerStatusIndicator;

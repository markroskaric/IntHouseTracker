import React, { useEffect } from "react";

type LightStatusProps = {
    status: number;
};

const LightStatus: React.FC<LightStatusProps> = ({ status }) => {
    // Determine color based on status range
    let color;
    switch (true) {
        case status >= 200 && status <= 299:
            color = "green";
            break;
        case status >= 400 && status <= 499:
            color = "red";
            break;
        default:
            color = "yellow";
            break;
    }

    const statusDetails = {
        red: {
            color: "#f56565", // Tailwind red-500
            label: "Status: Red",
        },
        yellow: {
            color: "#ecc94b", // Tailwind yellow-500
            label: "Status: Yellow",
        },
        green: {
            color: "#48bb78", // Tailwind green-500
            label: "Status: Green",
        },
    };

    return (
        <div style={styles.container}>
            <div
                style={{
                    ...styles.indicator,
                    backgroundColor: statusDetails[color].color,
                    animation: color === "red" ? "pulse 1.5s infinite" : "none", // Apply pulse animation if red
                }}
            >
                <div
                    style={{
                        ...styles.dot,
                        backgroundColor: "#fff", // White dot in center
                    }}
                ></div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
    },
    indicator: {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "10px",
        border: `3px solid #e3e3e3`, // Light border color
        transition: "transform 0.2s", // Smooth scaling transition
    },
    dot: {
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        border: "2px solid #e3e3e3",
    },
};

// Define keyframes for the pulse animation
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

// Inject the pulse animation into the document's styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = pulseAnimation;
document.head.appendChild(styleSheet);

export default LightStatus;

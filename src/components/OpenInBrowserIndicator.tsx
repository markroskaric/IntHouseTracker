import React from "react";

type OpenInBrowserIndicatorProps = {
    isOnline: boolean; // Prop to determine online status
    link: string; // URL to open in the browser
};

const OpenInBrowserIndicator: React.FC<OpenInBrowserIndicatorProps> = ({ isOnline, link }) => {
    return (
        <div style={styles.container} className="justify-between">
            <span style={styles.statusText}>{isOnline ? "Open in Browser" : "Offline"}</span>
            {isOnline && (
                <a href={link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                    ↗️
                </a>
            )}
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
        position: "relative",
    },
    statusText: {
        fontSize: "16px",
        color: "#333", // Dark text for contrast
        fontWeight: "500",
        marginRight: "5px",
    },
    link: {
        textDecoration: "none",
        color: "#3992ff", // Link color
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        marginLeft: "10px", // Space between text and icon
    },
};

export default OpenInBrowserIndicator;

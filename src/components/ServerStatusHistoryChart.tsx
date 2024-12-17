import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Label,
} from "recharts";

// Function to format date and time from the input string
const formatTime = (timeString) => {
    const date = new Date(timeString); // Create a Date object
    return date.toISOString().slice(0, 19).replace("T", " "); // Format to 'YYYY-MM-DD HH:MM:SS'
};

// Custom tooltip content
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { time, status } = payload[0].payload; // Get time and status from payload
        return (
            <div style={styles.tooltip}>
                <p>{`Time: ${formatTime(time)}`}</p>
                <p>{`Status: ${status === 1 ? "Online" : "Offline"}`}</p>
            </div>
        );
    }
    return null;
};

const ServerStatusHistoryChart = ({ data }) => {
    return (
        <div style={styles.chartContainer}>
            <h2 style={styles.title}>Server Status History</h2>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e3e3e3" />
                    <XAxis
                        dataKey="time"
                        tickFormatter={formatTime} // Format time on X-axis
                        tick={{ fontSize: 10 }}
                    />
                    <YAxis
                        domain={[0, 1]}
                        tickFormatter={(value) => (value === 1 ? "Online" : "Offline")}
                        tick={{ fontSize: 15 }}
                        ticks={[0, 1]} // Only show 0 and 1 on the Y axis
                        padding={{ top: 20, bottom: 20 }} // Add padding to Y-axis
                    >
                        <Label
                            value="Status"
                            angle={-90}
                            position="insideLeft"
                            style={{ textAnchor: "middle", fontSize: 16 }}
                        />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} /> {/* Use custom tooltip */}
                    <Line
                        type="step" // Change to "step" for step-like transitions
                        dataKey="status"
                        stroke="#3992ff"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                        isAnimationActive={true}
                        animationDuration={1500}
                        animationBegin={0}
                        animationEasing="ease-in-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const styles = {
    chartContainer: {
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        marginTop: "20px",
    },
    title: {
        fontSize: "16px",
        color: "#333",
        marginBottom: "10px",
    },
    tooltip: {
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
    },
};

export default ServerStatusHistoryChart;

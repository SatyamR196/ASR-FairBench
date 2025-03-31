import React from "react";
import Plot from "react-plotly.js";

const plotStyle = {
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: "10px",
    backgroundColor: "white",
    width: "100%",
    height: "auto",
};

function BoxPlot({ werData, title, mb=50 }) {
    if (!werData || Object.keys(werData).length === 0) {
        return <p>No data available for {title}.</p>;
    }

    // Convert werData into Plotly box plot format
    const data = Object.keys(werData).map((category) => ({
        type: "box",
        y: werData[category], // Array of WER values
        name: category, // Label (e.g., Male, Female, English, Spanish)
        boxmean: true,
        // boxpoints: false,
        // boxmode: "whisker",
        // boxpoints: "suspectedoutliers", // Show only suspected outliers, not extreme ones
        // quartilemethod: "inclusive",
    }));

    const layout = {
        title: {
            text: `WER Distribution Over ${title}`,
            font: { size: 20 },
        },
        yaxis: {
            title: {
                text: "WER",
                font: { size: 16 },
            },
        },
        xaxis: {
            title: {
                text: title,
                font: { size: 16 },
            },
        },
        autosize: true,
        margin: { t: 50, l: 50, r: 50, b: mb },
    };

    return (
        <div style={plotStyle}>
            <Plot
                data={data}
                layout={layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}

export default BoxPlot;

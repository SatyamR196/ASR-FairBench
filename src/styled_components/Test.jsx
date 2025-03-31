// // import React from "react";
// // import ReactSpeedometer from "react-d3-speedometer";

// // const Speedometer = ({value}) => (
// //     // let val = 50
// //   <ReactSpeedometer
// //     maxValue={100}
// //     value={value} // Current speed
// //     needleColor="steelblue"
// //     segments={10} // Keep segments same
// //     segmentColors={[
// //       "green", "green", // Low-speed zones
// //       "#FFD700", "#FFD700", "#FFD700", // Mid-speed zones (bright yellow)
// //       "red", "red", "red", "red", "red" // High-speed danger zones
// //     ]}
// //     textColor="black"
// //     needleTransitionDuration={4000}  
// //     needleTransition="easeElastic"
// //     currentValueText={`Score : ${value}`}
// //     needleHeightRatio={0.7}
// //   />
// // );

// // export default Speedometer;


// //-----------------
// import {React, useState,useEffect} from "react";
// import ReactSpeedometer from "react-d3-speedometer";

// const CustomSpeedometer = ({value}) => {

//     const [width, setWidth] = useState(window.innerWidth);

//     // Function to update width on resize
//     useEffect(() => {
//         const handleResize = () => setWidth(window.innerWidth);
        
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return(<div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
//         <ReactSpeedometer
//             maxValue={100}
//             value={value} // Set needle position
//             needleColor="steelblue" // Light blue needle
//             segments={5} // Five segments
//             segmentColors={[
//             "rgb(106, 215, 45)",        // Very Good
//             "rgb(174, 226, 40)",      // Good (Light Green)
//             "rgb(255, 237, 44)",      // Ok (Yellow)
//             "rgb(254, 186, 0)",       // Bad
//             "#ff4b33"           // Very Bad
//             ]}
//             customSegmentLabels={[
//             { text: "Very Good", position: "INSIDE", color: "black" },
//             { text: "Good", position: "INSIDE", color: "black" },
//             { text: "Ok", position: "INSIDE", color: "black" },
//             { text: "Bad", position: "INSIDE", color: "black" },
//             { text: "Very Bad", position: "INSIDE", color: "black" },
//             ]}
//             textColor="#606060" // Light gray text color
//             ringWidth={50} // Adjust the thickness of the gauge
//             // width={width < 600 ? 300 : 500} // ✅ Responsive width
//             // height={width < 600 ? 200 : 300} // ✅ Responsive height
//             width={width/3} // Size of the gauge
//             height={width/3} // Height of the gauge
//             forceRender={true}
//             needleHeightRatio={0.77}
//             fluidWidth={true}
//             currentValueText={`WER % : ${value}`}
//         />
//   </div>
// )};

// export default CustomSpeedometer;

// import React from "react";
// import Plot from "react-plotly.js";

// // const plotStyle = {
// // borderRadius: '15px', // Adds rounded corners
// // overflow: 'hidden', // Ensures content follows the border radius
// // boxShadow: '0 4px 10px rgba(0,0,0,0.1)', // Optional shadow for a better look
// // padding: '10px', // Adds some spacing
// // backgroundColor: 'red', // Background color for contrast
// // width:'100%'
// // };

// const plotStyle = {
//     borderRadius: "15px",
//     overflow: "hidden",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//     padding: "10px",
//     backgroundColor: "white",
//     width: "100%", // ✅ Makes the div take full width
//     height: "auto", // ✅ Adjusts height automatically
// };

// function BoxPlot() {

//     var Male = {
//         type: "box",
//         y: [10, 15, 20, 32, 25, 30, 35],
//         // boxmean: 'sd',
//         name: "Male",
//     };
//     var Female = {
//         type: "box",
//         y: [10, 20, 30, 40, 42, 45, 50],
//         // boxmean: 'sd',
//         name: "Female",
//     };
    
//     const data = [Male, Female];
    
//     const layout = {
//         title: {
//             text: "WER distribution over Gender", // Title of the graph
//             font: { size: 20 }, // Adjust font size
//         },
//         yaxis: {
//             title: {
//                 text: "WER", // Y-axis label
//                 font: { size: 16 }, // Adjust font size
//             },
//         },
//         xaxis: {
//             title: {
//                 text: "Gender", // X-axis label
//                 font: { size: 16 }, // Adjust font size
//             },
//         },
//         autosize: true, // ✅ Auto resizes based on container size
//         margin: { t: 50, l: 50, r: 50, b: 50 }, // Adjust margins to fit labels properly
//     };

//     return (
//         <div style={plotStyle}>
//             <Plot
//                 data={data}
//                 layout={layout}
//                 useResizeHandler={true} // ✅ Enables responsiveness
//                 style={{ width: "100%", height: "100%" }} // ✅ Adjusts to parent div
//             />
//         </div>
//     );
// }

// export default BoxPlot;


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

// let graphData = {
//     Leaderboard:
//     {
//         Model: "OpenAi/whisper",
//         WER: 0.15,
//         FS: 0.87,
//         FS_G: 8.41,
//         FS_L: 0.85,
//         FS_SEG: 0.8,
//         FS_E: 0.8,
//     },
//     Gender_WER: [
//         { gender: "Female", WER: 0.21 },
//         { gender: "Male", WER: 3.4 },
//     ],
//     Gender_FS: [
//         { gender: "Female", FS: 100 },
//         { gender: "Male", FS: 0 },
//     ],
//     Language_WER: [
//         { language: "Arabic         ", WER: 0.212729 },
//         { language: "Cantonese      ", WER: 1.212068 },
//         { language: "Creole         ", WER: 0.000269 },
//         { language: "Dutch          ", WER: 0.052911 },
//         { language: "English        ", WER: 0.605722 },
//         { language: "English/Turkish", WER: 0.058468 },
//         { language: "Filipino       ", WER: 4.070723 },
//         { language: "French         ", WER: 0.249689 },
//         { language: "German         ", WER: 0.010594 },
//         { language: "Hindi          ", WER: 0.074335 },
//         { language: "Hmong          ", WER: 0.003966 },
//         { language: "Indonesian     ", WER: 1.310732 },
//         { language: "Italian        ", WER: 0.084189 },
//         { language: "Japanese       ", WER: 0.444385 },
//         { language: "Korean         ", WER: 1.413439 },
//         { language: "Laotian        ", WER: 0.006913 },
//         { language: "Malay          ", WER: 0.277746 },
//         { language: "Malaysian      ", WER: 4.926222 },
//         { language: "Mandarin       ", WER: 2.13223 },
//         { language: "Marathi        ", WER: 14.055673 },
//         { language: "Nepali         ", WER: 6.601094 },
//         { language: "Other          ", WER: 15.543521 },
//         { language: "Portuguese     ", WER: 0.070227 },
//         { language: "Russian        ", WER: 0.065017 },
//         { language: "Spanish        ", WER: 10.63583 },
//         { language: "Tagalog        ", WER: 0.117161 },
//         { language: "Turkish        ", WER: 0.001305 },
//         { language: "Ukrainian      ", WER: 7.689632 },
//         { language: "Urdu           ", WER: 35.922864 },
//         { language: "Vietnamese     ", WER: 0.120431 },
//     ],
//     Language_FS: [
//         { language: "Arabic         ", FS: 99.408560 },
//         { language: "Cantonese      ", FS: 96.626637 },
//         { language: "Creole         ", FS: 100.000000 },
//         { language: "Dutch          ", FS: 99.853456 },
//         { language: "English        ", FS: 98.314561 },
//         { language: "English/Turkish", FS: 99.83798 },
//         { language: "Filipino       ", FS: 88.668819 },
//         { language: "French         ", FS: 99.3056 },
//         { language: "German         ", FS: 99.971256 },
//         { language: "Hindi          ", FS: 99.793817 },
//         { language: "Hmong          ", FS: 99.989706 },
//         { language: "Indonesian     ", FS: 96.351979 },
//         { language: "Italian        ", FS: 99.766384 },
//         { language: "Japanese       ", FS: 98.763686 },
//         { language: "Korean         ", FS: 96.066068 },
//         { language: "Laotian        ", FS: 99.981505 },
//         { language: "Malay          ", FS: 99.227569 },
//         { language: "Malaysian      ", FS: 86.28731 },
//         { language: "Mandarin       ", FS: 94.065125 },
//         { language: "Marathi        ", FS: 60.873081 },
//         { language: "Nepali         ", FS: 81.624865 },
//         { language: "Other          ", FS: 56.731265 },
//         { language: "Portuguese     ", FS: 99.805252 },
//         { language: "Russian        ", FS: 99.819755 },
//         { language: "Spanish        ", FS: 70.393116 },
//         { language: "Tagalog        ", FS: 99.674599 },
//         { language: "Turkish        ", FS: 99.997115 },
//         { language: "Ukrainian      ", FS: 78.59 },
//         { language: "Urdu           ", FS: 0.0 },
//         { language: "Vietnamese     ", FS: 99.66 },
//     ],
//     SEB_WER: [
//         { SEB: "Affluent", WER: 0.212729 },
//         { SEB: "Low ", WER: 0.04692 },
//         { SEB: "Medium", WER: 0.057459 },
//     ],
//     SEB_FS: [
//         { SEB: "Affluent", FS: 0.0 },
//         { SEB: "Low ", FS: 100.00 },
//         { SEB: "Medium", FS: 93.64 },
//     ],
//     Ethnicity_WER: [
//         { ethnicity: "Asian, South Asian or Asian American", WER: 99.95 },
//         { ethnicity: "Black or African American", WER: 0.0 },
//     ],
//     Ethnicity_FS: [
//         { ethnicity: "Asian, South Asian or Asian American", FS: 0.21 },
//         { ethnicity: "Black or African American", FS: 170.18 },
//     ],
// };
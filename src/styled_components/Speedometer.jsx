import {React, useState,useEffect} from "react";
import ReactSpeedometer from "react-d3-speedometer";

const CustomSpeedometer = ({value,w}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [fontValue, setFontValue] = useState(width < 560 ? "10px" : "16px");
    useEffect(() => {
        const handleResize = () => {    
            setWidth(window.innerWidth);
            setFontValue(window.innerWidth < 560 ? "10px" : "16px");
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    value = Math.round(value * 100) / 100;
    return(<div style={{ width: "100%", maxWidth: "500px",minHeight:"300px", margin: "0 auto", display: 'flex', aliginItems: 'center'  }}>
        <ReactSpeedometer
            maxValue={100}
            value={value} // Set needle position
            needleColor="steelblue" // Light blue needle
            segments={5} // Five segments
            labelFontSize={fontValue}
            segmentColors={[
                "#ff4b33",           // Very Bad
                "rgb(254, 186, 0)",       // Bad
                "rgb(255, 237, 44)",      // Ok (Yellow)
                "rgb(174, 226, 40)",      // Good (Light Green)
                "rgb(106, 215, 45)",        // Very Good
            ]}
            customSegmentLabels={[
                { text: "Highly Biased", position: "INSIDE", color: "black" },
                { text: "Biased", position: "INSIDE", color: "black" },
                { text: "Borderline Fair", position: "INSIDE", color: "black" },
                { text: "Fair", position: "INSIDE", color: "black" },
                { text: "Highly Fair", position: "INSIDE", color: "black" },
            ]}
            textColor="#606060" // Light gray text color
            ringWidth={50} // Adjust the thickness of the gauge
            // width={width < 600 ? 300 : 500} // ✅ Responsive width
            // height={width < 600 ? 200 : 300} // ✅ Responsive height
            // width={width/3} // Size of the gauge
            // height={width/3} // Height of the gauge
            forceRender={true}
            needleHeightRatio={0.77}
            fluidWidth={true}
            currentValueText={`% Fairness Score : ${value}`}
        />
  </div>
)};

export default CustomSpeedometer;

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend,Label,CartesianGrid ,ResponsiveContainer } from "recharts";


export default function WER_GenderChart({graphData,title,labelY,xAxis,yAxis,angle,bMargin,height,colorStroke,colorFill}) {
    const data = graphData;
    console.log(graphData,);
    let margins = { top: 30, right: 20, left: 0, bottom: bMargin } 
  return (
    <div style={{ width: "100%", height: height, background: "white", borderRadius: "15px", padding: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",margin:"auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        
        <BarChart data={data} margin={margins}>
          <text x="50%" y="10" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold" fill="#333">
            {title}
          </text>
          <CartesianGrid strokeDasharray="3 3" stroke="lightgray" />
          {/* X-Axis with dark-colored labels */}
          <XAxis dataKey={xAxis} tick={{ fontSize: 14, fill: "#333", fontWeight: "bold" }} interval={0}  angle={angle} textAnchor="end">
            {/* <Label value="Gender" offset={0} position="insideBottom" /> */}
          </XAxis>
          {/* Y-Axis with dark-colored labels */}
          <YAxis tick={{ fontSize: 14, fill: "#333", fontWeight: "bold" }} >
            {/* <Label value={labelY} offset={-10} angle={-90} position="left" /> */}
          </YAxis>
          {/* <Tooltip /> */}
          <Tooltip 
            contentStyle={{ backgroundColor: "#f75e5e", color: "#fff", borderRadius: "8px", border: "1px solid #da0000" }} 
            itemStyle={{ color: "#fff" }} 
          />
          {/* <Legend /> */}
          
          {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
          <Bar dataKey={yAxis} fill={colorFill} stroke={colorStroke} barSize={50} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

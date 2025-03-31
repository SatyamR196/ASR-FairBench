import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Table from '../styled_components/Table';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../DataContext";
import { ProgressSpinner } from 'primereact/progressspinner';
        

export function Leaderboard({baseUrl}) {

  const [products, setProducts] = useState(null);
  const dt = useRef(null);

  let data = [
    { Model: "OpenAi/whisper", WER: 0.15, FS: 0.87, FS_G: 8.41, FS_L: 0.85, FS_SEG: 0.8, FS_E: 0.8 },
    { Model: "OpenAi/whisper-mini", WER: 0.25, FS: 0.8, FS_G: 0.85, FS_L: 0.75, FS_SEG: 0.65, FS_E: 0.8 }
  ]

  // const {baseUrl} = useContext(DataContext) ;
  // console.log(baseUrl);
  useEffect(() => {

    const fetchData = async () => {
      const headers = {
        'ngrok-skip-browser-warning': "10008"
      };
      const res = await axios.get(`${baseUrl}/fetch`, { headers });
      console.log(baseUrl);
      let Data = res.data.data; // Await the promise
      const uniqueData = Data.filter((value, index, self) =>
        index === self.findIndex((t) => t.Model === value.Model)
      );
      console.log(uniqueData)
      setProducts(uniqueData); // Set the resolved data to state
    };

    fetchData();

  }, []);


  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    // const doc = new jsPDF();
    const doc = new jsPDF({ orientation: 'landscape' });

    // Add heading
    // Set font size and get page width
    doc.setFontSize(16);
    const pageWidth = doc.internal.pageSize.width; // Get page width
    const text = 'Leaderboard Report';
    const textWidth = doc.getTextWidth(text); // Get text width
    const xPosition = (pageWidth - textWidth) / 2; // Center position

    // Add centered heading
    doc.text(text, xPosition, 15);

    // Define table headers
    const columns = [
      { header: 'Model Name', dataKey: 'Model' },
      { header: 'Fairness Adjusted ASR Score', dataKey: 'FAAS' },
      { header: 'Average WER', dataKey: 'WER' },
      { header: 'Average RTFX', dataKey: 'RTFX' },
      { header: 'Overall Fairness Score', dataKey: 'FS' },
      { header: 'Fairness Score (Gender)', dataKey: 'FS_G' },
      { header: 'Fairness Score (First Language)', dataKey: 'FS_L' },
      { header: 'Fairness Score (Socioeconomic Background)', dataKey: 'FS_SEG' },
      { header: 'Fairness Score (Ethnicity)', dataKey: 'FS_E' }
    ];

    // Convert data into row format
    const rows = products.map(row => columns.map(col => row[col.dataKey]));

    // Call autoTable properly
    autoTable(doc, {
      theme: 'grid',
      head: [columns.map(col => col.header)], // Table headers
      body: rows, // Table data
      startY: 20, // Set Y position after the heading
      styles: { lineWidth: 0.15 }, // Ensure grid lines are visible
      headStyles: { textColor: 255, lineWidth: 0.15 } // Ensure header has grid lines
    });

    doc.save('Leaderboard.pdf');
  };


  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Tooltip target=".tooltip-btn" />
      <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} className="tooltip-btn" data-pr-tooltip="Export CSV" />
      {/* <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" /> */}
      <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} className="tooltip-btn" data-pr-tooltip="Export PDF" />
    </div>
  );

  return (<>
    <h1>Leaderboard</h1>
    <h3>Track Top performing models</h3>
    {products ? (<div className="card border-round-3xl overflow-hidden shadow-2">
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable ref={dt} header={header} value={products} removableSort showGridlines sortField="FAAS" sortOrder={-1} tableStyle={{ minWidth: '20rem' }}>
        <Column field="Model" header="Model Name" sortable filter></Column>
        <Column field="FAAS" header="Fairness Adjusted ASR Score" sortable></Column>
        <Column field="WER" header="Average WER" sortable></Column>
        <Column field="RTFX" header="Average RTFX" sortable></Column>
        <Column field="FS" header="Overall Fairness Score" sortable></Column>
        <Column field="FS_G" header="Fairness Score (Gender)" sortable></Column>
        <Column field="FS_L" header="Fairness Score (First Language)" sortable></Column>
        <Column field="FS_SEG" header="Fairness Score (Socioeconomic Background)" sortable></Column>
        <Column field="FS_E" header="Fairness Score (Ethnicity)" sortable></Column>
      </DataTable>
    </div>) 
    : 
    (<ProgressSpinner style={{width: '200px', height: '200px'}} strokeWidth="3"/>)} 
    
    
    <br></br>
  </>)
}



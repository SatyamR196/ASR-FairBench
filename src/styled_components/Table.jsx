import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
    
function Table() {
    const [products, setProducts] = useState([]);
      useEffect(() => {
        let data = [
          { Model : "OpenAi/whisper", WER : 0.15, FS : 0.87, FS_G: 0.9, FS_L :0.85, FS_SEG:0.8, FS_E:0.8},
          { Model : "OpenAi/whisper-mini", WER : 0.25, FS : 0.8, FS_G: 0.85, FS_L :0.75, FS_SEG:0.65, FS_E:0.8}
        ]
    
        // let data = [
        //   { code: 1, name: "Laptop", category:"A+", quantity: 1000 },
        //   { code: 2, name: "Phone", category:"A+", quantity: 500 },
        //   { code: 3, name: "Tablet", category:"A+", quantity: 300 },
        // ];
        setProducts(data);
      }, []);

  return (
    <div>
      <div className="card">
            <DataTable value={products} showGridlines tableStyle={{ minWidth: '25rem' }}>
                <Column field="Model" header="Model Name" sortable></Column>
                <Column field="WER" header="Average WER" sortable filter></Column>
                <Column field="FS" header="Overall Fairness Score" sortable></Column>
                <Column field="FS_G" header="Fairness Score (Gender)" sortable></Column>
                <Column field="FS_L" header="Fairness Score (First Language)" sortable></Column>
                <Column field="FS_SEG" header="Fairness Score (Socioeconomic Background)" sortable></Column>
                <Column field="FS_E" header="Fairness Score (Ethnicity)" sortable></Column>
            </DataTable>
          </div>
    </div>
  )
}

export default Table

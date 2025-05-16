import React, { useState, useRef,useEffect } from 'react';
import { Toast } from 'primereact/toast';
import SpinnerIcon from './SpinnerIcon';
import SpinnerIcon2 from './SpinnerIcon2';
import styled from 'styled-components';
import axios from 'axios';
import { ProgressBar } from "primereact/progressbar";
// import { baseUrl } from '../App'; // Adjust the import path as necessary

export default function ProgressToast({baseUrl}) {
    const isFirstRender = useRef(true); // Track initial render
    const [visible, setVisible] = useState(false);
    let [auditProgress, setAuditProgress] = useState(0);
    let [running, setRunning] = useState(false);
    let [model, setModel] = useState(null);
    const toastBC = useRef(null);

    useEffect(() => {
        let interval;

        interval = setInterval(async () => {
        try {
            const response = await axios.get(`${baseUrl}/status`);
            console.log("Response:", response.data);
            setAuditProgress(Math.round(response.data["%_completed"]*100)/100) ; 
            setModel(response.data["model"]);
            setRunning(response.data["running"]);
            // console.log("Audit Progress:", auditProgress, "Model:", model);
        } catch (error) {
            console.error("Error fetching audit progress:", error);
        }
        }, 3000);
        

        // Cleanup function
        return () => {
            if (interval) clearInterval(interval);
        };
    }, []); // runs whenever isRunning changes

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false; // Flip the flag after first run
            return; // ⛔ Skip confirm() on first render
        }
        console.log( "Model:", model, "Running:", running);
        if(visible) confirm();
    }, [running]);

    const clear = () => {
        toastBC.current.clear();
        setVisible(false);
    };

    const confirm = () => {
        if(1) {
            setVisible(true);
            toastBC.current.clear();
            toastBC.current.show({
                severity: 'info',
                summary: 'No running audit in progress',
                sticky: true,
                content: (props) => (
                    <div key={auditProgress} className="flex flex-column align-items-left" style={{ flex: '1' }}>
                        <div className="flex align-items-center gap-2">
                            <span className="font-bold text-900">Audit Progress : {model}</span>
                        </div>
                        {
                            running ? (<>
                                <div className="font-medium text-lg my-2 text-900"></div>
                                <ProgressBar color='#3b82f6' value={auditProgress} style={{ height: "15px", fontSize:"13px", borderRadius:"1000px" }}/>
                            </>) : (
                                <div className="font-medium text-lg my-2 text-900">{props.message.summary}</div>
                            )
                        }
                        
                    </div>
                )
            });
        }
    };

    return (
        <div className="flex justify-content-end">
            <Toast ref={toastBC} position="top-right" onRemove={clear} />
            <Btn onClick={confirm} label="Confirm" type='button'>
                { running ? <SpinnerIcon/> : <SpinnerIcon2/> }
            </Btn>
        </div>
    )
}

const Btn = styled.button`
    background-color: #3083ff; /* Green */
    border: none;
    padding: 4px 4px;
    text-align: center;
    position: fixed;
    bottom: 16px;
    right: 6px;
    z-index: 5;
    margin: 4px 4px;
    cursor: pointer;
    border-radius: 100px;
`
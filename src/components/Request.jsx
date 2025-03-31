import { React, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../styled_components/Button";
import axios from "axios";
import { ProgressBar } from "primereact/progressbar";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Nav from "../styled_components/Nav";
import { InputText } from "primereact/inputtext";
import { Chart } from "primereact/chart";
import WER_GenderChart from "../styled_components/WER_GenderChart";
import { useContext } from "react";
import { DataContext } from "../DataContext";
import BoxPlot from "../styled_components/Box_plot";
import Speedometer from "../styled_components/Speedometer";
import { Toast } from 'primereact/toast';
import { ScrollTop } from 'primereact/scrolltop';
import ScoreCard from "../styled_components/Scorecard";
        

export function Request({ showSucess, showError, showInfo, baseUrl }) {

    let [result, setResult] = useState(false);
    let [isRunning, setIsRunning] = useState(false);
    let [category_FS, setCategory_FS] = useState([]);
    let [value, setValue] = useState("");
    const {sharedData, setSharedData} = useContext(DataContext);
    // How this result should look like :

    const [isUpdated, setIsUpdated] = useState(false);
    // const { sharedData, setSharedData } = useContext(DataContext);
    const sendPostRequest = async (postData) => {
        try {
            const response = await axios.post(`${baseUrl}/insert`, postData);
            console.log("Success:", response.data);

            if (response.data.exists) {
                console.log("Already in DB");
                showInfo();
            } else {
                console.log("Success:", response.data);
                showSucess();
            }

        } catch (error) {
            console.error("Error:", error);
            showError();
        }
    };

    const publishResult = () => {
        // showError();
        // showSucess();
        // showInfo();
        const postData = {
            Model: result["ASR_model"],
            WER: Math.round(result["Avg_wer"] * 100) / 100 , 
            RTFX: Math.round(result["Avg_rtfx"]* 100) / 100,
            FAAS: Math.round(result["FAAS"]* 100) / 100,
            FS: Math.round(result["Overall Fairness Score"] * 100) / 100 ,
            FS_G: Math.round(result["Adjusted Category Fairness Score"]["gender"] * 100) / 100 ,
            FS_L: Math.round(result["Adjusted Category Fairness Score"]["first_language"] * 100) / 100 ,
            FS_SEG: Math.round(result["Adjusted Category Fairness Score"]["socioeconomic_bkgd"] * 100) / 100 ,
            FS_E: Math.round(result["Adjusted Category Fairness Score"]["ethnicity"] * 100)/ 100 ,
        }
        sendPostRequest(postData);
        // console.log("DATE SENT", graphData.Leaderboard, "COMPLETE");
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        // alert(JSON.stringify(data));
        setIsRunning(true);
        const queryString = new URLSearchParams(data).toString();
        console.log(data, queryString);
        console.log("line 177",data.ASR_model);

        // const res = await axios.get(`http://localhost:3000/api?${queryString}`);
        console.log("AXIOS TIMEOUT LIMIT :",axios.defaults.timeout); 
        try{
            const res = await axios.get(`${baseUrl}/api?${queryString}`, { 
                headers,
                timeout: 10800000
             });
            // console.log(res.data);
            setResult(res.data);
            setIsRunning(false);
            setCategory_FS([
                { category: "Gender", FS: result["Adjusted Category Fairness Score"]?.["gender"] },
                { category: "Language", FS: result["Adjusted Category Fairness Score"]?.["first_language"] },
                { category: "Ethnicity", FS: result["Adjusted Category Fairness Score"]?.["ethnicity"] },
                { category: "Socioeconomic BG", FS: result["Adjusted Category Fairness Score"]?.["socioeconomic_bkgd"] }
            ]);
            setSharedData({...sharedData,Request:res.data,Category_FS:[
                { category: "Gender", FS: result["Adjusted Category Fairness Score"]?.["gender"] },
                { category: "Language", FS: result["Adjusted Category Fairness Score"]?.["first_language"] },
                { category: "Ethnicity", FS: result["Adjusted Category Fairness Score"]?.["ethnicity"] },
                { category: "Socioeconomic BG", FS: result["Adjusted Category Fairness Score"]?.["socioeconomic_bkgd"] }
            ]})
            console.log("Below SharedData",category_FS,sharedData)
        }catch(error){
            console.error("Retrying due to error:", error.message);
            // setTimeout(onSubmit(data), 60000); // Retry after 5 seconds
        }

        // setCategory_FS([
        //     { category: "Gender", FS: result["Adjusted Category Fairness Score"]["gender"] },
        //     { category: "Language", FS: result["Adjusted Category Fairness Score"]["first_language"] },
        //     { category: "Ethnicity", FS: result["Adjusted Category Fairness Score"]["ethnicity"] },
        //     { category: "Socioeconomic BG", FS: result["Adjusted Category Fairness Score"]["socioeconomic_bkgd"] }
        // ])
        
    };

    useEffect(() => {
        if(sharedData && sharedData.Request){
            setResult(sharedData.Request);
        }
        if(sharedData && sharedData.Category_FS){
            setCategory_FS(sharedData.Category_FS);
        }
        if (result) {
            
        }
    }, []);

    const headers = {
        'ngrok-skip-browser-warning': "10008"
    };
    const sendReq = async () => {
        // let queryString = 
        // const resp = await axios.get(`https://71fb-34-74-211-163.ngrok-free.app/`,{ headers });
        const resp = await axios.get(`https://de27-34-81-70-166.ngrok-free.app/api?ASR_model=openai/whisper-base`, { headers });
        console.log(resp);
        console.log(resp.data);
    }

    // let category_FS = 
    console.log("TEST TEST", category_FS);
    // Gender_WER: [
    //     { gender: "Female", WER: 0.21 },
    //     { gender: "Male", WER: 3.4 },
    // ],
    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <>
            <h1>Check Fairness Score</h1>
            {/* <Button onClick={sendReq}>Send API REQ</Button> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* include validation with required or other standard HTML validation rules */}
                {/* <input placeholder="Enter Model Path URL" {...register("ASR_model", { required: true })} /> */}
                <InputText
                    placeholder="Enter model name from HuggingFace"
                    variant="filled"
                    id="username"
                    {...register("ASR_model", { required: true })}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
                <br></br>
                <Button type="submit" shadow="blue" bg="#3b82f6" color="white">
                    Run Fairness Audit
                </Button>
                {/* <Button type="submit" shadow="green" bg="hsl(90.48deg 100% 75.29%)" color="hsl(120deg 100% 24%)">Run Fairness Audit</Button> */}
            </form>
            {isRunning ? (<>
                <br></br>
                <ProgressBar
                    mode="indeterminate"
                    style={{ height: "10px" }}
                ></ProgressBar>
            </>) : (
                <div id="progressBarContainer">
                    <div id="progressBar"></div>
                    <div id="progressPercent">0%</div>
                </div>
            )}

            {/* <WER_GenderChart></WER_GenderChart> */}
            {result.message && <h3>{" "} <i><u>{result.message}</u></i>{" "}</h3>}
            {result.ASR_model && (
                <>
                    <GraphContainer>
                        <Head>Summary</Head>
                        <Summary_Chart>
                            <Speedometer value={result["Overall Fairness Score"]} ></Speedometer>
                            <WER_GenderChart
                                graphData={category_FS}
                                title="Fairness Score (By Category)"
                                labelY="Fairness Score"
                                xAxis="category"
                                yAxis="FS"
                                angle={-45}
                                bMargin={80}
                                height="400px"
                                colorStroke='rgb(2, 167, 5)'
                                colorFill='rgba(24, 219, 27, 0.447)'
                            />
                        </Summary_Chart>
                        <hr></hr>
                        <Head>Gender</Head>
                        <Box_chartV>
                            {/* <Speedometer value={result["Adjusted Category Fairness Score"]["gender"]}></Speedometer> */}
                            <ScoreCard label="Fairness Score : " score={result["Adjusted Category Fairness Score"]["gender"]}></ScoreCard>
                            <BoxPlot werData={result.wer_Gender} title="Gender"></BoxPlot>
                        </Box_chartV>
                        <hr></hr>
                        <Head>Language</Head>
                        <Box_chartV>
                            {/* <Speedometer value={result["Adjusted Category Fairness Score"]["first_language"]}></Speedometer> */}
                            <ScoreCard label="Fairness Score : " score={result["Adjusted Category Fairness Score"]["first_language"]}></ScoreCard>
                            <BoxPlot werData={result.wer_Language} title="Language" mb={80}></BoxPlot>
                        </Box_chartV>
                        <hr></hr>
                        <Head>Ethnicity</Head>
                        <Box_chartV>
                            {/* <Speedometer value={result["Adjusted Category Fairness Score"]["ethnicity"]}></Speedometer> */}
                            <ScoreCard label="Fairness Score : " score={result["Adjusted Category Fairness Score"]["ethnicity"]}></ScoreCard>
                            <BoxPlot werData={result.wer_Ethnicity} title="Ethnicity" mb={165}></BoxPlot>
                        </Box_chartV>
                        <hr></hr>
                        <Head>Socioeconomic Background</Head>
                        <Box_chartV>
                            {/* <Speedometer value={result["Adjusted Category Fairness Score"]["socioeconomic_bkgd"]}></Speedometer> */}
                            <ScoreCard label="Fairness Score : " score={result["Adjusted Category Fairness Score"]["socioeconomic_bkgd"]}></ScoreCard>
                            <BoxPlot werData={result.wer_SEG} title="Socioeconomic Background"></BoxPlot>
                        </Box_chartV>
                        <br></br>
                        {/* <hr></hr> */}
                        {/* <hr></hr> */}
                        {/* <Gender_Chart>
                            <WER_GenderChart
                                graphData={graphData.Gender_WER}
                                title="WER (Gender)"
                                labelY="WER"
                                xAxis="gender"
                                yAxis="WER"
                                angle={-45}
                                bMargin={25}
                                height="300px"
                                colorStroke='hsl(30, 83%, 47%)'
                                colorFill='hsla(30, 100%, 48%, 0.461)'
                            />
                            <WER_GenderChart
                                graphData={graphData.Gender_FS}
                                title="Fairness Score (Gender)"
                                labelY="Fairness Score"
                                xAxis="gender"
                                yAxis="FS"
                                angle={-45}
                                bMargin={25}
                                height="300px"
                                colorStroke='hsl(30, 83%, 47%)'
                                colorFill='hsla(30, 100%, 48%, 0.461)'
                            />
                        </Gender_Chart>
                        <hr></hr>
                        <Lang_Chart>
                            <WER_GenderChart
                                graphData={graphData.Language_WER}
                                title="WER (Language)"
                                labelY="WER"
                                xAxis="language"
                                yAxis="WER"
                                angle={-45}
                                bMargin={80}
                                height="400px"
                                colorStroke='rgb(2, 167, 5)'
                                colorFill='rgba(24, 219, 27, 0.447)'
                            />
                            <WER_GenderChart
                                graphData={graphData.Language_FS}
                                title="Fairness Score (Language)"
                                labelY="Fairness Score"
                                xAxis="language"
                                yAxis="FS"
                                angle={-45}
                                bMargin={80}
                                height="400px"
                                colorStroke='rgb(2, 167, 5)'
                                colorFill='rgba(24, 219, 27, 0.447)'
                            />
                        </Lang_Chart>
                        <hr></hr>
                        <SEB_Chart>
                            <WER_GenderChart
                                graphData={graphData.SEB_WER}
                                title="WER (Socioeconomic Background)"
                                labelY="WER"
                                xAxis="SEB"
                                yAxis="WER"
                                angle={-45}
                                bMargin={40}
                                height="400px"
                                colorStroke='rgb(0, 74, 163)'
                                colorFill='rgba(33, 124, 236, 0.584)'
                            />
                            <WER_GenderChart
                                graphData={graphData.SEB_FS}
                                title="Fairness Score (Socioeconomic Background)"
                                labelY="Fairness Score"
                                xAxis="SEB"
                                yAxis="FS"
                                angle={-45}
                                bMargin={40}
                                height="400px"
                                colorStroke='rgb(0, 74, 163)'
                                colorFill='rgba(33, 124, 236, 0.584)'
                            />
                        </SEB_Chart>
                        <hr></hr>
                        <Ethnicity_Chart>
                            <WER_GenderChart
                                graphData={graphData.Ethnicity_WER}
                                title="WER (Ethnicity)"
                                labelY="WER"
                                xAxis="ethnicity"
                                yAxis="WER"
                                angle={-45}
                                bMargin={180}
                                height="500px"
                                colorStroke='rgb(163, 0, 171)'
                                colorFill='rgba(202, 36, 252, 0.47)'
                            />
                            <WER_GenderChart
                                graphData={graphData.Ethnicity_FS}
                                title="Fairness Score (Ethnicity)"
                                labelY="Fairness Score"
                                xAxis="ethnicity"
                                yAxis="FS"
                                angle={-45}
                                bMargin={180}
                                height="500px"
                                colorStroke='rgb(163, 0, 171)'
                                colorFill='rgba(202, 36, 252, 0.47)'
                            />
                        </Ethnicity_Chart> */}

                    </GraphContainer>
                    {/* <Button onClick={publishResult}>Publish to Leaderboard</Button> */}
                    <Button onClick={publishResult} shadow="blue" bg="#3b82f6" color="white">
                        Publish to Leaderboard
                    </Button>
                    <ScrollTop />
                </>
            )}
        </>
    );
}

const Head= styled.h6`
    font-size:2rem;
    color: #3b82f6;
    margin-block: 0;
    text-decoration: 4px solid underline;
`

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Gender_Chart = styled.div`
  display: flex;
  gap: 2rem;
`;
const SEB_Chart = styled.div`
  display: flex;
  gap: 2rem;
`;
const Lang_Chart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const Ethnicity_Chart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Summary_Chart = styled.div`
    display: flex;
    gap: 2rem;
    min-height: 60vh;
    /* width: 800px; */
    justify-content: space-between;
    align-content: center;
    align-items: center;
`

const Box_chartV = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-height: 60vh;
    /* width: 800px; */
    justify-content: space-between;
    align-content: center;
    align-items: center;
`

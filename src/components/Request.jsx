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

    // How this result should look like :
    let graphData = {
        Leaderboard:
        {
            Model: "OpenAi/whisper",
            WER: 0.15,
            FS: 0.87,
            FS_G: 8.41,
            FS_L: 0.85,
            FS_SEG: 0.8,
            FS_E: 0.8,
        },
        Gender_WER: [
            { gender: "Female", WER: 0.21 },
            { gender: "Male", WER: 3.4 },
        ],
        Gender_FS: [
            { gender: "Female", FS: 100 },
            { gender: "Male", FS: 0 },
        ],
        Language_WER: [
            { language: "Arabic         ", WER: 0.212729 },
            { language: "Cantonese      ", WER: 1.212068 },
            { language: "Creole         ", WER: 0.000269 },
            { language: "Dutch          ", WER: 0.052911 },
            { language: "English        ", WER: 0.605722 },
            { language: "English/Turkish", WER: 0.058468 },
            { language: "Filipino       ", WER: 4.070723 },
            { language: "French         ", WER: 0.249689 },
            { language: "German         ", WER: 0.010594 },
            { language: "Hindi          ", WER: 0.074335 },
            { language: "Hmong          ", WER: 0.003966 },
            { language: "Indonesian     ", WER: 1.310732 },
            { language: "Italian        ", WER: 0.084189 },
            { language: "Japanese       ", WER: 0.444385 },
            { language: "Korean         ", WER: 1.413439 },
            { language: "Laotian        ", WER: 0.006913 },
            { language: "Malay          ", WER: 0.277746 },
            { language: "Malaysian      ", WER: 4.926222 },
            { language: "Mandarin       ", WER: 2.13223 },
            { language: "Marathi        ", WER: 14.055673 },
            { language: "Nepali         ", WER: 6.601094 },
            { language: "Other          ", WER: 15.543521 },
            { language: "Portuguese     ", WER: 0.070227 },
            { language: "Russian        ", WER: 0.065017 },
            { language: "Spanish        ", WER: 10.63583 },
            { language: "Tagalog        ", WER: 0.117161 },
            { language: "Turkish        ", WER: 0.001305 },
            { language: "Ukrainian      ", WER: 7.689632 },
            { language: "Urdu           ", WER: 35.922864 },
            { language: "Vietnamese     ", WER: 0.120431 },
        ],
        Language_FS: [
            { language: "Arabic         ", FS: 99.408560 },
            { language: "Cantonese      ", FS: 96.626637 },
            { language: "Creole         ", FS: 100.000000 },
            { language: "Dutch          ", FS: 99.853456 },
            { language: "English        ", FS: 98.314561 },
            { language: "English/Turkish", FS: 99.83798 },
            { language: "Filipino       ", FS: 88.668819 },
            { language: "French         ", FS: 99.3056 },
            { language: "German         ", FS: 99.971256 },
            { language: "Hindi          ", FS: 99.793817 },
            { language: "Hmong          ", FS: 99.989706 },
            { language: "Indonesian     ", FS: 96.351979 },
            { language: "Italian        ", FS: 99.766384 },
            { language: "Japanese       ", FS: 98.763686 },
            { language: "Korean         ", FS: 96.066068 },
            { language: "Laotian        ", FS: 99.981505 },
            { language: "Malay          ", FS: 99.227569 },
            { language: "Malaysian      ", FS: 86.28731 },
            { language: "Mandarin       ", FS: 94.065125 },
            { language: "Marathi        ", FS: 60.873081 },
            { language: "Nepali         ", FS: 81.624865 },
            { language: "Other          ", FS: 56.731265 },
            { language: "Portuguese     ", FS: 99.805252 },
            { language: "Russian        ", FS: 99.819755 },
            { language: "Spanish        ", FS: 70.393116 },
            { language: "Tagalog        ", FS: 99.674599 },
            { language: "Turkish        ", FS: 99.997115 },
            { language: "Ukrainian      ", FS: 78.59 },
            { language: "Urdu           ", FS: 0.0 },
            { language: "Vietnamese     ", FS: 99.66 },
        ],
        SEB_WER: [
            { SEB: "Affluent", WER: 0.212729 },
            { SEB: "Low ", WER: 0.04692 },
            { SEB: "Medium", WER: 0.057459 },
        ],
        SEB_FS: [
            { SEB: "Affluent", FS: 0.0 },
            { SEB: "Low ", FS: 100.00 },
            { SEB: "Medium", FS: 93.64 },
        ],
        Ethnicity_WER: [
            { ethnicity: "Asian, South Asian or Asian American", WER: 99.95 },
            { ethnicity: "Black or African American", WER: 0.0 },
        ],
        Ethnicity_FS: [
            { ethnicity: "Asian, South Asian or Asian American", FS: 0.21 },
            { ethnicity: "Black or African American", FS: 170.18 },
        ],
    };

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
        if (result) {
            setCategory_FS([
                { category: "Gender", FS: result["Adjusted Category Fairness Score"]?.["gender"] },
                { category: "Language", FS: result["Adjusted Category Fairness Score"]?.["first_language"] },
                { category: "Ethnicity", FS: result["Adjusted Category Fairness Score"]?.["ethnicity"] },
                { category: "Socioeconomic BG", FS: result["Adjusted Category Fairness Score"]?.["socioeconomic_bkgd"] }
            ]);
        }
    }, [result]);

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
            {result && (
                <>
                    <h3>
                        {" "}
                        ASR model <i>"{result.ASR_model}"</i> has been Evaluated {" "}
                    </h3>
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

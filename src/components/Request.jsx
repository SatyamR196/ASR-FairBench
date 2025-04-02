import { React, useState, useRef, useEffect,forwardRef } from "react";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import axios from "axios";
import Button from "../styled_components/Button";
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
import { Toast } from "primereact/toast";
import { ScrollTop } from "primereact/scrolltop";
import ScoreCard from "../styled_components/Scorecard";

// Printable component (NO forwardRef needed)
const PrintableComponent = () => {
    return (
      <div style={{ padding: "20px", backgroundColor: "white" }}>
        <h1>Printable Content</h1>
        <p>This content will be printed.</p>
      </div>
    );
  };

export function Request({ showSucess, showError, showInfo, baseUrl }) {
    let [result, setResult] = useState(false);
    let [isRunning, setIsRunning] = useState(false);
    let [category_FS, setCategory_FS] = useState([]);
    let [value, setValue] = useState("");
    const { sharedData, setSharedData } = useContext(DataContext);
    
    const componentRef = useRef(null);
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const handlePrint = useReactToPrint({
        content: () => componentRef.current, // Ensure this correctly returns a DOM element
        documentTitle: "My Printed Page",
      });
    
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
            WER: Math.round(result["Avg_wer"] * 100) / 100,
            RTFX: Math.round(result["Avg_rtfx"] * 100) / 100,
            FAAS: Math.round(result["FAAS"] * 100) / 100,
            FS: Math.round(result["Overall Fairness Score"] * 100) / 100,
            FS_G:
                Math.round(result["Adjusted Category Fairness Score"]["gender"] * 100) /
                100,
            FS_L:
                Math.round(
                    result["Adjusted Category Fairness Score"]["first_language"] * 100
                ) / 100,
            FS_SEG:
                Math.round(
                    result["Adjusted Category Fairness Score"]["socioeconomic_bkgd"] * 100
                ) / 100,
            FS_E:
                Math.round(
                    result["Adjusted Category Fairness Score"]["ethnicity"] * 100
                ) / 100,
        };
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
        console.log("line 177", data.ASR_model);

        // const res = await axios.get(`http://localhost:3000/api?${queryString}`);
        console.log("AXIOS TIMEOUT LIMIT :", axios.defaults.timeout);
        try {
            const res = await axios.get(`${baseUrl}/api?${queryString}`, {
                headers,
                timeout: 10800000,
            });
            // console.log(res.data);
            setResult(res.data);
            setIsRunning(false);
            setCategory_FS([
                {
                    category: "Gender",
                    FS: result["Adjusted Category Fairness Score"]?.["gender"],
                },
                {
                    category: "Language",
                    FS: result["Adjusted Category Fairness Score"]?.["first_language"],
                },
                {
                    category: "Ethnicity",
                    FS: result["Adjusted Category Fairness Score"]?.["ethnicity"],
                },
                {
                    category: "Socioeconomic BG",
                    FS: result["Adjusted Category Fairness Score"]?.[
                        "socioeconomic_bkgd"
                    ],
                },
            ]);
            setSharedData({
                ...sharedData,
                Request: res.data,
                Category_FS: [
                    {
                        category: "Gender",
                        FS: result["Adjusted Category Fairness Score"]?.["gender"],
                    },
                    {
                        category: "Language",
                        FS: result["Adjusted Category Fairness Score"]?.["first_language"],
                    },
                    {
                        category: "Ethnicity",
                        FS: result["Adjusted Category Fairness Score"]?.["ethnicity"],
                    },
                    {
                        category: "Socioeconomic BG",
                        FS: result["Adjusted Category Fairness Score"]?.[
                            "socioeconomic_bkgd"
                        ],
                    },
                ],
            });
            console.log("Below SharedData", category_FS, sharedData);
        } catch (error) {
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
        if (sharedData && sharedData.Request) {
            setResult(sharedData.Request);
        }
        if (sharedData && sharedData.Category_FS) {
            setCategory_FS(sharedData.Category_FS);
        }
        if (result && result["Adjusted Category Fairness Score"]) {
            setCategory_FS([
                {
                    category: "Gender",
                    FS: result["Adjusted Category Fairness Score"]["gender"],
                },
                {
                    category: "Language",
                    FS: result["Adjusted Category Fairness Score"]["first_language"],
                },
                {
                    category: "Ethnicity",
                    FS: result["Adjusted Category Fairness Score"]["ethnicity"],
                },
                {
                    category: "Socioeconomic BG",
                    FS: result["Adjusted Category Fairness Score"]["socioeconomic_bkgd"],
                },
            ]);
        }
    }, [result]);

    const headers = {
        "ngrok-skip-browser-warning": "10008",
    };
    const sendReq = async () => {
        // let queryString =
        // const resp = await axios.get(`https://71fb-34-74-211-163.ngrok-free.app/`,{ headers });
        const resp = await axios.get(
            `https://de27-34-81-70-166.ngrok-free.app/api?ASR_model=openai/whisper-base`,
            { headers }
        );
        console.log(resp);
        console.log(resp.data);
    };

    // let category_FS =
    console.log("Category FS = ", category_FS);
    // Gender_WER: [
    //     { gender: "Female", WER: 0.21 },
    //     { gender: "Male", WER: 3.4 },
    // ],
    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <>
            <h2>Check ASR Model Fairness Score</h2>
            {/* <div>
                <button onClick={() => reactToPrintFn()}>Print</button>
                <div ref={contentRef}><PrintableComponent /></div>
            </div> */}
            {/* Information panel to help users understand the requirements */}
            <InfoPanel>
                <h4>How the Fairness Audit Works:</h4>
                <ol>
                    <li>
                        Enter a Hugging Face ASR model ID (e.g.,{" "}
                        <ModelExample>facebook/wav2vec2-base-960h</ModelExample>)
                    </li>
                    <li>
                        Our system will run inference using a 10% stratified sample from
                        Meta's FairSpeech dataset
                    </li>
                    <li>
                        Results will show performance differences across demographic groups
                        including gender, language, ethnicity, and socioeconomic background
                    </li>
                </ol>
                <Tip>
                    <i className="pi pi-info-circle"></i> The audit may take up to 10
                    minutes to complete depending on the model size
                </Tip>
            </InfoPanel>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <label htmlFor="username">Hugging Face Model ID:</label>
                    <ModelInputWrapper>
                        {/* <ModelPrefix>huggingface.co/</ModelPrefix> */}
                        <InputText
                            placeholder="Example: facebook/wav2vec2-base-960h"
                            variant="filled"
                            id="username"
                            {...register("ASR_model", {
                                required: "Please enter a valid model path",
                            })}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </ModelInputWrapper>
                    {errors.ASR_model && (
                        <ErrorMessage>{errors.ASR_model.message}</ErrorMessage>
                    )}
                </FormGroup>

                <ExampleModels>
                    <span>Try these examples: </span>
                    <ExampleButton
                        onClick={() => setValue("facebook/wav2vec2-base-960h")}
                    >
                        wav2vec2
                    </ExampleButton>
                    <ExampleButton onClick={() => setValue("openai/whisper-small")}>
                        whisper-small
                    </ExampleButton>
                    <ExampleButton onClick={() => setValue("microsoft/wavlm-base")}>
                        wavlm-base
                    </ExampleButton>
                </ExampleModels>

                <Button type="submit" shadow="blue" bg="#3b82f6" color="white">
                    Run Fairness Audit
                </Button>
            </form>

            {isRunning ? (
                <>
                    <br></br>
                    <ProgressBar
                        mode="indeterminate"
                        style={{ height: "10px" }}
                    ></ProgressBar>
                </>
            ) : (
                <div id="progressBarContainer">
                    <div id="progressBar"></div>
                    <div id="progressPercent">0%</div>
                </div>
            )}

            {/* <WER_GenderChart></WER_GenderChart> */}
            {result.message && (
                <h3>
                    {" "}
                    <i>
                        <u>{result.message}</u>
                    </i>{" "}
                </h3>
            )}
            {result.ASR_model && (
                <>
                    <GraphContainer>
                        <Head>Summary</Head>
                        <Summary_Chart>
                            <Speedometer
                                value={result["Overall Fairness Score"]}
                            ></Speedometer>
                            <WER_GenderChart
                                graphData={category_FS}
                                title="Fairness Score (By Category)"
                                labelY="Fairness Score"
                                xAxis="category"
                                yAxis="FS"
                                angle={-45}
                                bMargin={80}
                                height="400px"
                                colorStroke="rgb(2, 167, 5)"
                                colorFill="rgba(24, 219, 27, 0.447)"
                            />
                        </Summary_Chart>
                        <hr></hr>
                        <Combo_Chart>
                            <ComboDivG>
                                <Head>Gender</Head>
                                <br></br>
                                <Box_chartV>
                                    {/* <Speedometer value={result["Adjusted Category Fairness Score"]["gender"]}></Speedometer> */}
                                    <ScoreCard
                                        label="Fairness Score : "
                                        width={"100%"}
                                        score={result["Adjusted Category Fairness Score"]["gender"]}
                                    ></ScoreCard>
                                    <BoxPlot werData={result.wer_Gender} title="Gender"></BoxPlot>
                                </Box_chartV>
                            </ComboDivG>
                            <ComboDivS>
                                <Head>Socioeconomic Background</Head>
                                <br></br>
                                <Box_chartV>
                                    {/* <Speedometer value={result["Adjusted Category Fairness Score"]["socioeconomic_bkgd"]}></Speedometer> */}
                                    <ScoreCard
                                        label="Fairness Score : "
                                        width={"100%"}
                                        score={
                                            result["Adjusted Category Fairness Score"][
                                            "socioeconomic_bkgd"
                                            ]
                                        }
                                    ></ScoreCard>
                                    <BoxPlot
                                        werData={result.wer_SEG}
                                        title="Socioeconomic Background"
                                    ></BoxPlot>
                                </Box_chartV>
                            </ComboDivS>
                        </Combo_Chart>
                        <hr></hr>
                        <Head>Language</Head>
                        <Box_chartV>
                            {/* <Speedometer value={result["Adjusted Category Fairness Score"]["first_language"]}></Speedometer> */}
                            <ScoreCard
                                label="Fairness Score : "
                                width={"100%"}
                                score={
                                    result["Adjusted Category Fairness Score"]["first_language"]
                                }
                            ></ScoreCard>
                            <BoxPlot
                                werData={result.wer_Language}
                                title="Language"
                                mb={80}
                            ></BoxPlot>
                        </Box_chartV>
                        <hr></hr>
                        <Head>Ethnicity</Head>
                        <Box_chartV>
                            {/* <Speedometer value={result["Adjusted Category Fairness Score"]["ethnicity"]}></Speedometer> */}
                            <ScoreCard
                                label="Fairness Score : "
                                width={"100%"}
                                score={result["Adjusted Category Fairness Score"]["ethnicity"]}
                            ></ScoreCard>
                            <BoxPlot
                                werData={result.wer_Ethnicity}
                                title="Ethnicity"
                                mb={165}
                            ></BoxPlot>
                        </Box_chartV>
                        <hr></hr>
                        
                        <br></br>
                        {/* Rest of the existing graph code remains unchanged */}
                    </GraphContainer>
                    <Button
                        onClick={publishResult}
                        shadow="blue"
                        bg="#3b82f6"
                        color="white"
                    >
                        Publish to Leaderboard
                    </Button>
                    <ScrollTop />
                </>
            )}
        </>
    );
}

// New styled components for the form
const InfoPanel = styled.div`
  background-color: #f0f7ff;
  border-left: 4px solid #3b82f6;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.25rem;

  h4 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
  }

  ol {
    margin-left: 1.5rem;
    margin-bottom: 0.75rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const Tip = styled.p`
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: #3b82f6;
  font-style: italic;

  i {
    margin-right: 0.5rem;
  }
`;

const ModelExample = styled.code`
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    align-items: center;
    justify-content: center;
  }
`;

const ModelInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ModelPrefix = styled.div`
  background-color: #f3f4f6;
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-right: none;
  border-radius: 0.25rem 0 0 0.25rem;
  color: #6b7280;
  font-family: monospace;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ExampleModels = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

const ExampleButton = styled.button`
  background: none;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  color: #374151;

  &:hover {
    background-color: #f3f4f6;
  }
`;

// Keep all original styled components
export const Head = styled.h6`
  font-size: 2rem;
  color: #3b82f6;
  margin-block: 0;
  text-decoration: 4px solid underline;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const ComboDivG = styled.div`
  flex-grow: 1;
`;
const ComboDivS = styled.div`
  flex-grow: 1.5;
`;

const Combo_Chart = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
`;


const Summary_Chart = styled.div`
  display: flex;
  gap: 2rem;
  min-height: 60vh;
  /* width: 800px; */
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

const Box_chartV = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 2rem; */
  min-height: 60vh;
  /* width: 800px; */
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

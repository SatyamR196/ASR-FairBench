import { React, useState, useRef, useEffect, forwardRef } from "react";
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

export function Request({ showSucess, showError, showInfo, baseUrl }) {
    let [result, setResult] = useState(false);
    let [isRunning, setIsRunning] = useState(false);
    let [category_FS, setCategory_FS] = useState([]);
    let [value, setValue] = useState("");
    const { sharedData, setSharedData } = useContext(DataContext);

    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const [isUpdated, setIsUpdated] = useState(false);
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
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        trigger,
    } = useForm();
    const onSubmit = async (data) => {
        setIsRunning(true);
        const queryString = new URLSearchParams(data).toString();
        console.log(data, queryString);
        console.log("line 177", data.ASR_model);

        try {
            const res = await axios.get(`${baseUrl}/api?${queryString}`, {
                headers,
                timeout: 10800000,
            });
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
        }
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

    console.log("Category FS = ", category_FS);

    return (
        <>
            <PrintContainer ref={contentRef}>
                <h2>Check ASR Model Fairness Score</h2>
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
                            Results will show performance differences across demographic
                            groups including gender, language, ethnicity, and socioeconomic
                            background
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
                            type="button"
                            onClick={() => {
                                setValue("facebook/wav2vec2-base-960h", {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                });
                            }}
                        >
                            wav2vec2
                        </ExampleButton>
                        <ExampleButton
                            type="button"
                            onClick={() => {
                                setValue("openai/whisper-small", { shouldValidate: true });
                            }}
                        >
                            whisper-small
                        </ExampleButton>
                        <ExampleButton
                            type="button"
                            onClick={() => {
                                setValue("openai/whisper-medium", { shouldValidate: true });
                            }}
                        >
                            whisper-medium
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
                        <div id="progressPercent"></div>
                    </div>
                )}

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
                            <PageBreakContainer>
                                <Head>Summary</Head>
                                <br></br>
                                <Summary_wrap>
                                    <div>
                                        <ScoreCard
                                            label="Fairness-Adjusted ASR Score (FAAS) : "
                                            width={"100%"}
                                            score={result["FAAS"]}
                                            fontWeight={700}
                                        ></ScoreCard>
                                    </div>
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
                                </Summary_wrap>
                                <br></br>
                                <br></br>
                                <hr></hr>
                            </PageBreakContainer>

                            <PageBreakContainer>
                                <Head>Gender</Head>
                                <br></br>
                                <Box_chartV>
                                    <ScoreCard
                                        label="Fairness Score : "
                                        width={"100%"}
                                        score={
                                            result["Adjusted Category Fairness Score"]["gender"]
                                        }
                                    ></ScoreCard>
                                    <BoxPlot
                                        werData={result.wer_Gender}
                                        title="Gender"
                                    ></BoxPlot>
                                </Box_chartV>
                            </PageBreakContainer>

                            <PageBreakContainer>
                                <Head>Socioeconomic Background</Head>
                                <br></br>
                                <Box_chartV>
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
                            </PageBreakContainer>

                            <PageBreakContainer>
                                <Head>Language</Head>
                                <br></br>
                                <Box_chartV>
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
                            </PageBreakContainer>

                            <PageBreakContainer>
                                <Head>Ethnicity</Head>
                                <br></br>
                                <Box_chartV>
                                    <ScoreCard
                                        label="Fairness Score : "
                                        width={"100%"}
                                        score={
                                            result["Adjusted Category Fairness Score"]["ethnicity"]
                                        }
                                    ></ScoreCard>
                                    <BoxPlot
                                        werData={result.wer_Ethnicity}
                                        title="Ethnicity"
                                        mb={165}
                                    ></BoxPlot>
                                </Box_chartV>
                            </PageBreakContainer>
                        </GraphContainer>
                        <BtnGroup>
                            <Button
                                onClick={publishResult} 
                                shadow="blue"
                                bg="#3b82f6"
                                color="white"
                            >
                                Publish to Leaderboard
                            </Button>
                            <Button shadow="blue" bg="#3b82f6" color="white" onClick={() => reactToPrintFn()}>Export PDF</Button>
                        </BtnGroup>
                        <ScrollTop />
                    </>
                )}
            </PrintContainer>
        </>
    );
}

const PrintContainer = styled.div`
  @media print {
    margin: 1.5rem; /* Add 1-inch margin on all sides */
    margin-top: 1rem !important;
    /* padding: 0.5in; Add padding inside the content */
    box-sizing: border-box;
  }
`;

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

// Add this styled component for page break handling
const PageBreakContainer = styled.div`
  page-break-inside: avoid; /* Prevent breaking inside this container */
  break-inside: avoid; /* For modern browsers */
  margin-bottom: 2rem; /* Add spacing between sections */
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

const Summary_wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Summary_Chart = styled.div`
  display: flex;
  gap: 2rem;
  min-height: 60vh;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

const Box_chartV = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

const BtnGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  /* margin-top: 1rem; */
`;
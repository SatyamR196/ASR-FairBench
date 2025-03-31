import { useState } from "react";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import axios from "axios";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components/Home";
import { Request } from "./components/Request";
import { Leaderboard } from "./components/Leaderboard";
import Nav from "./styled_components/Nav";
import styled from "styled-components";
import { Toast } from "primereact/toast";
import { React, useRef, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "./DataContext";
import Logo from "./assets/main_LOGO2.png"
import Metrics from "./components/Metrics";

function App() {
  const toast = useRef(null);
  const [baseUrl,setBaseUrl] = useState("https://d6e1-34-70-225-145.ngrok-free.app") 
  console.log(baseUrl);
  // const {setBaseUrl} = useContext(DataContext) ;
  // // ✅ Set `baseUrl` inside `useEffect`
  // useEffect(() => {
  //   setBaseUrl("http://127.0.0.1:3000/");
  // }, []); // Run only once when App mounts

  const showSucess = () => {//For toast
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Model added to Leaderboard 🤗' });
  };
  const showError = () => {//For toast
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error adding model to Leaderboard 🥹' });
  };
  const showInfo = () => {//For toast
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Model already added to the Leaderboard 🫢' });
  };
  return (
    <>
      <Wrapper>
        <Toast ref={toast} />
        <HeadImg>
          <img src={Logo}></img>
        </HeadImg>
        <Text>📐 The 🤗 Open ASR Leaderboard ranks and evaluates speech recognition models on the Hugging Face Hub.
We report the Average WER (⬇️ lower the better) and RTFx (⬆️ higher the better). Models are ranked based on their Average WER, from lowest to highest. Check the 📈 Metrics tab to understand how the models are evaluated.
If you want results for a model that is not listed here, you can submit a request for it to be included ✉️✨.
The leaderboard currently focuses on English speech recognition, and will be expanded to multilingual evaluation in later versions.</Text>
        <div className="container">
          <Nav />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/request" element={<Request showSucess={showSucess} showError={showError} showInfo={showInfo} baseUrl={baseUrl}/>} />
            <Route path="/leaderboard" element={<Leaderboard baseUrl={baseUrl} />} />
            <Route path="/metrics" element={<Metrics/>} />
            <Route path="/*" element={<Navigate to="/leaderboard" />} />
          </Routes>
        </div>
      </Wrapper>
    </>
  );
}

const HeadImg = styled.div`
  img{
    width: 100%;
    height: 220px;
  }
`
const Text = styled.p`
  color: gray;
  padding-inline: 5rem;
  margin-top:0;
  margin-bottom:0;
  font-size:1.05rem !important
`

const Wrapper = styled.div`
  /* background: linear-gradient(to right, #6dd5fa, #2980b9); */
  background-color: #ffffff;
  color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Arial, sans-serif;

  .container {
    width: 90%;
    margin: auto;
    /* margin-top: 3rem; */
    padding: 2rem;
    /* background: rgb(255, 255, 255); */
    background: transparent;
    backdrop-filter: blur(12px);
    /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37); */
    border-radius: 20px;
    transition: transform 0.3s ease-in-out;
  }
  .container:hover {
    /* transform: translateY(-10px); */
  }
  h1 {
    font-size: 3rem;
    color: #000000;
    /* color: #3b82f6; */
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 2rem;
  }
  h3{
    color: #000000;
  }
  p {
    font-size: 1.2rem;
    color: #000000;
    /* margin-bottom: 2rem; */
  }
  // button {
  //     padding: 10px 20px;
  //     background-color: #3b82f6;
  //     color: white;
  //     border: none;
  //     border-radius: 10px;
  //     cursor: pointer;
  //     transition: background-color 0.3s;
  // }
  // button:hover {
  //     background-color: #2563eb;
  // }
  .graph-container {
    display: none;
    margin-top: 2rem;
    text-align: center;
  }
  canvas {
    margin: 20px auto;
    max-width: 600px;
  }
  hr {
    margin: 1.5px 0;
    border: none;
    border-top: 1.5px solid rgba(25, 75, 255, 0.7);
  }
  input {
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 10px;
    width: 60%;
    text-align: center;
  }
  #progressBarContainer {
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    margin: 20px auto;
    overflow: hidden;
    position: relative;
  }
  #progressBar {
    width: 0%;
    height: 10px;
    background-color: #3b82f6;
    border-radius: 10px;
    transition: width 0.5s;
  }
  #progressPercent {
    position: absolute;
    width: 100%;
    text-align: center;
    line-height: 20px;
    color: white;
    font-weight: bold;
  }
`;

export default App;

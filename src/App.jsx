import { useState } from "react";
import { media } from "./Utils/helper.js";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import axios from "axios";
import {
  Routes,
  Route,
  Navigate,
  useLocation
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
import Logo from "./assets/logo.png"
import Metrics from "./components/Metrics";
import Dataset from "./components/Dataset";
import Contact from "./components/Contact";
import ProgressToast from "./styled_components/ProgressToast";
import SpinnerIcon from "./styled_components/SpinnerIcon";

function App() {
  const toast = useRef(null);
  const [baseUrl, setBaseUrl] = useState("https://satyamr196-asr-fairbench-server.hf.space")
  // const [baseUrl,setBaseUrl] = useState("http://localhost:7860") 
  console.log(baseUrl);
  const location = useLocation();

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
        <Text>
          🎙️ <b>ASR-FAIRBENCH</b> is an open benchmarking platform dedicated to evaluating the <b>fairness and accuracy</b> of Automatic Speech Recognition (ASR) models.
          Our mission is to assess ASR models' performance across diverse demographic groups using the <b><a href="https://ai.meta.com/datasets/speech-fairness-dataset/" target="_blank">Fair Speech Dataset</a></b>.

          Models are ranked based on the <b>Fairness Adjusted Accuracy Score (FAAS)</b>, which integrates both <b>Word Error Rate (WER)</b> and a <b>Fairness Score</b>, ensuring that models deliver equitable performance across different accents, genders, and age groups.

          Explore the 📈 <b>Metrics</b> tab for details on our evaluation process and visit the 📂 <b>Dataset</b> tab for a summary of the Fair Speech Dataset.

          Think your ASR model is both inclusive and high-performing? Put it to the test and claim your spot on the leaderboard! ✨
          <b>📄<a href="http://arxiv.org/abs/2505.11572" target="_blank">(Paper Link)</a>  </b>&nbsp;
          <b><i className="pi pi-github"></i>  <a href="https://github.com/SatyamR196/ASR-FairBench" target="_blank">(Github Link)</a></b>
        </Text>
        <div className="container">
          <Nav />
          <Routes>
            <Route path="/home" element={<Home baseUrl={baseUrl} />} />
            <Route path="/request" element={<Request showSucess={showSucess} showError={showError} showInfo={showInfo} baseUrl={baseUrl} />} />
            <Route path="/leaderboard" element={<Leaderboard baseUrl={baseUrl} />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/dataset" element={<Dataset />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<Navigate to="/leaderboard" />} />
          </Routes>
        </div>
      </Wrapper>

      <div style={{ display: location.pathname === "/request" ? "block" : "none" }}>
        <ProgressToast baseUrl={baseUrl} />
      </div>
    </>
  );
}

const HeadImg = styled.div`
display: flex;
justify-content: center; // Centers the image horizontally
align-items: center; // Aligns image vertically
width: 100%;
margin: 1rem 0 0 0;

img {
  max-width: 300px; // Adjust size as needed
  height: auto; // Maintain aspect ratio
}
`
const Text = styled.p`
  /* color: gray; */
  color: #4b5563; 
  padding-inline: 5rem;
  margin-top:0;
  margin-bottom:0;
  font-size:1.05rem !important ;
  @media ${media.tablet} {
    font-size: 14px;
    padding-inline: 2rem;
  }
  @media ${media.mobile} {
    font-size: 12px;
    padding-inline: 0.8rem;
  }
`

const Wrapper = styled.div`
  /* background: linear-gradient(to right, #6dd5fa, #2980b9); */
  background-color: #ffffff;
  color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
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
    @media ${media.tablet} {
      width: 95%;
      padding: 1.2rem;
    }
    @media ${media.mobile} {
      width: 98%;
      padding: 0.8rem;
    }
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
    /* font-size: 1.2rem; */
    /* color: #000000; */
    /* margin-bottom: 2rem; */
  }
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
    width: 65%;
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

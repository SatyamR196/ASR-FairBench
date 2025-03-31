import React from 'react'
import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Button from '../styled_components/Button'
import { Link } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'
import ScoreCard from '../styled_components/Scorecard'

function Home() {
  let [result, setResult] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await axios.get('http://localhost:3000');
    console.log(res.data);
    setResult(res.data);
  }
  const handleClick = ()=>{
    console.log("hi navigatering");
    navigate('/leaderboard');
  }

  return (
    <>
        <h1>ASR fairness benchmark</h1>
        {/* <button onClick={getData}> GET DATA </button> */}
        { result && <p> {result.message} at {result.endpoint} route </p> }
        <p className="read-the-docs">
        This platform allows users to request automatic speech recognition machine learning models, view performance metrics, and track model leaderboards.
        </p>
        <br></br>
        <Button type="submit" shadow="blue" bg="#3b82f6" color="white" onClick={handleClick}>Explore</Button>
    </>
  )
}

export {Home}

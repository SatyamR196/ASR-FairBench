import React from 'react'
import styled from 'styled-components'
import AgeGroup from '../assets/Age_group.png'
import SEGGroup from '../assets/SEG_group.png'
import EthGroup from '../assets/Ethnicity.png'
import FAWGroup from '../assets/FAW.png'
import ClusterGroup from '../assets/Cluster.png'
import ScoreCard from '../styled_components/Scorecard'

function Metrics() {
  return (
    <Container>
        <h1>Metrics</h1>
        <Para mb={1}>
        Here is the details of the metrics we have used in our leaderboard.
        </Para>
        {/* <hr></hr> */}
        <Head>1. Word Error Rate (WER)</Head>
        <Para mb={1}>
        WER measures the accuracy of ASR models by calculating the number of substitutions, deletions, and insertions compared to the reference transcript.
        <br></br>
        <p><b>Formula:</b> WER = (S + D + I) / N</p>
        <p>S - No. of substitutions</p>
        <p>D - No. of deletions</p>
        <p>I - No. of insertions</p>
        <p>N - Total no. of transcribed words</p>
        </Para>
        <hr></hr>

        <Head>2. Overall Fairness Score</Head>
        <Para mb={1}>
        We have applied the mixed effect poisson regression based approach to calculate the fairness score. We have made the attributes : gender, socioeconomic background, first language and ethnicity as the fixed effect group while labelling speaker as a random effect group.
        <br></br>
        <p>log(λ<sub>ij</sub>) = log(N<sub>ij</sub>) + µ<sub>f(i)</sub> + r<sub>i</sub> + θ<sup>T</sup>x<sub>ij</sub></p>
        </Para>
        <hr></hr>

        <Head>3. Fairness Adjusted ASR Score (FAAS)</Head>
        <Para mb={1}>
        FAAS balances WER and fairness to evaluate ASR systems comprehensively. We have ranked the ASR models based on this metric.
        <br></br>
        <p><b>Formula:</b> FAAS = 10*log<sub>10</sub>(Overall_Fairness_Score/WER)</p>
        </Para>
        <hr></hr>

        <Head>4. Real-Time Factor (RTFx)</Head>
        <Para mb={1}>
        RTFx evaluates the efficiency of an ASR model in processing speech. Thus it measures the latency of the ASR model.
        <br></br>
        <p><b>Formula:</b> RTFx = T<sub>process</sub>/T<sub>audio</sub></p>
        </Para>
        
    </Container>
  )
}

export default Metrics

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    padding-top: 0;
    margin-inline: auto;
    /* align-items: center; */
    /* justify-content: center; */
`
const Gridbox = styled.div`
    display: grid;
    margin: auto;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 2rem 4rem;
    /* justify-items: space-between; */
    /* align-items: space-between; */
`
const Head= styled.h6`
    font-size:2rem;
    color: #3b82f6;
    margin-block: 1rem;
    text-decoration: 4px solid underline;
`
const Image = styled.img`
    max-width: 75%;
    margin : auto
`
const Para = styled.div`
color: #4b5563;
font-size: 1.4rem;
padding-top: 1rem;
padding-bottom: ${props=>props.mb || 2}rem;
`
import React from 'react'
import styled from 'styled-components'
import AgeGroup from '../assets/Age_group.png'
import SEGGroup from '../assets/SEG_group.png'
import EthGroup from '../assets/Ethnicity.png'
import FAWGroup from '../assets/FAW.png'
import ClusterGroup from '../assets/Cluster.png'
import ScoreCard from '../styled_components/Scorecard'
import { Button } from 'primereact/button';

function Dataset() {
  return (
    <Container>
        <h1>Dataset</h1>
        <Head>Overview</Head>
        <Para>
        The current public datasets for speech recognition don’t focus specifically on improving fairness. Our dataset includes 26,471 utterances in recorded speech by 593 people in the United States who were paid to record and submit audio of themselves saying commands. They self-identified their individual information, such as age, gender, ethnicity, geographic location and whether they consider themselves native English speakers.
        <br></br>
        <br></br>
        The commands are categorized into seven domains: music, capture, utilities, notification control, messaging, calling and dictation. In response to prompts that relate to each of these domains, the participants provided their own audio commands. Some examples of prompts were asking how they would search for a song or make plans with friends about where to meet. Our dataset includes the audio and transcription of participants’ utterances.
        <br></br>
        <Button label="Read more" icon="pi pi-file" link onClick={() =>  window.open('https://ai.meta.com/datasets/speech-fairness-dataset/', '_blank')}/>
        </Para>
        <Gridbox>
            <ScoreCard width='38vw' label="Source : " score="Meta, Fair-speech Dataset"></ScoreCard>
            <ScoreCard width='38vw' label="Released on : " score="JULY 13, 2023"></ScoreCard>
            <ScoreCard width='38vw' label="Audios in Dataset : " score={26471}></ScoreCard>
            {/* <ScoreCard width='38vw' label="Average per utterance length : " score="7.42 sec"></ScoreCard> */}
            <ScoreCard width='38vw' label="Total number of unique speakers: : " score="593"></ScoreCard>
            <ScoreCard width='38vw' label="Average per utterance length : " score="7.42 sec"></ScoreCard>
            <ScoreCard width='38vw' label="Primary Data Type : " score="Audio (.wav)"></ScoreCard>
        </Gridbox>
        <br></br>
        <br></br>
        <Head>Train test split Stretegy : Stratified Splitting</Head>
        <Para mb={1}>
        Stratified splitting is a crucial train-test split strategy in Automatic Speech Recognition (ASR) to ensure that both the training and test sets represent the overall dataset's distribution. Unlike random splitting, which may introduce data imbalances, stratified splitting ensures that key factors such as speaker demographics, background noise conditions, and linguistic diversity are evenly distributed across both sets.
        </Para>
        {/* <hr></hr> */}
        <Head>Age Group by Gender Distribution</Head>
        <Image src={AgeGroup}></Image>
        <br></br>
        <hr></hr>
        <br></br>
        <Head>Socioeconomic Group by Gender Distribution</Head>
        <Image src={SEGGroup}></Image>
        <br></br>
        <hr></hr>
        <br></br>
        <Head>Ethnicity Distribution</Head>
        <Image src={EthGroup}></Image>
        <br></br>
        <hr></hr>
        <br></br>
        <Head>Frequenctly Used Words</Head>
        <Image src={FAWGroup}></Image>
        <br></br>
        <hr></hr>
        <br></br>
        <Head>Cluster</Head>
        <Image src={ClusterGroup}></Image>

    </Container>
  )
}

export default Dataset

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
    /* grid-template-rows: 1fr 1fr; */
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
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
      <h1>Dataset Overview</h1>
      
      <Section>
        <Head>Introduction</Head>
        <Para>
          We use Meta's FairSpeech dataset to conduct fairness audits of speech recognition models submitted to our leaderboard. This dataset was specifically designed to address fairness gaps across diverse demographic groups. The complete FairSpeech dataset includes <b>26,471 utterances</b> recorded by <b>593 individuals</b> across the United States. Participants self-identified their personal information, including age, gender, ethnicity, geographic location, and whether they consider themselves native English speakers.
        </Para>
        <Para>
          For our leaderboard evaluation, we use a stratified 10% sample from the FairSpeech dataset. We run inference using these test samples to evaluate the fairness of submitted models across different demographic groups. The original dataset spans seven domains: <b>music</b>, <b>capture</b>, <b>utilities</b>, <b>notification control</b>, <b>messaging</b>, <b>calling</b>, and <b>dictation</b>. In response to these domain-specific prompts, participants recorded audio commands such as searching for songs or making plans to meet friends.
        </Para>
        <Button label="Learn more about FairSpeech" icon="pi pi-file" link onClick={() => window.open('https://ai.meta.com/datasets/speech-fairness-dataset/', '_blank')} />
      </Section>

      <Gridbox>
        <ScoreCard width="32rem" label="Dataset Source:" score="FairSpeech Dataset" />
        <ScoreCard width="32rem" label="Dataset Released on: " score="JULY 13, 2023" />
        <ScoreCard width="32rem" label="Total Audios in Original Dataset: " score={26471} />
        <ScoreCard width="32rem" label="Evaluation Sample Size: " score="2647" />
        <ScoreCard width="32rem" label="Average utterance length: " score="7.42 sec" />
        <ScoreCard width="32rem" label="Primary Data Type: " score="Audio (.wav)" />
      </Gridbox>

      <Section>
        <Head>Our Testing Strategy: Stratified Sampling</Head>
        <Para mb={1}>
          For our leaderboard evaluations, we employ stratified sampling to select a representative 10% subset from the FairSpeech dataset. Stratified sampling is critical in Automatic Speech Recognition (ASR) fairness testing to ensure that test sets reflect the overall dataset's distribution. This approach ensures demographic factors, background noise conditions, and linguistic diversity are properly represented, allowing us to evaluate model robustness and fairness across varied populations.
        </Para>
      </Section>

      <Section>
        <Head>Age Group by Gender Distribution</Head>
        <Image src={AgeGroup} />
      </Section>

      <Section>
        <Head>Socioeconomic Group by Gender Distribution</Head>
        <Image src={SEGGroup} />
      </Section>

      <Section>
        <Head>Ethnicity Distribution</Head>
        <Image src={EthGroup} />
      </Section>

      <Section>
        <Head>Frequently Used Words</Head>
        <Image src={FAWGroup} />
      </Section>

      
    </Container>
  )
}

export default Dataset;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    padding-top: 0;
    margin-inline: auto;
    max-width: 1200px; /* To control the width */
`;

const Gridbox = styled.div`
    display: grid;
    margin: auto;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem 4rem;
    padding: 2rem 0;
`;

const Section = styled.section`
    margin-bottom: 3rem;
`;

const Head = styled.h6`
    font-size: 2rem;
    color: #3b82f6;
    margin-bottom: 1rem;
    text-decoration: underline;
`;

const Image = styled.img`
    max-width: 80%;
    display: block;
    margin: 1rem auto;
`;

const Para = styled.p`
    color: #4b5563;
    font-size: 1.4rem;
    line-height: 1.8;
    margin-bottom: ${props => props.mb || 2}rem;
    text-align: justify;
`;
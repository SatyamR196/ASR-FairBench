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
        <Gridbox>
            <ScoreCard label="Audios in Dataset : " score={2648}></ScoreCard>
            <ScoreCard label="Source : " score="Meta Dataset"></ScoreCard>
            <ScoreCard label="Fairness Score : " score={11}></ScoreCard>
            <ScoreCard label="Fairness Score : " score={11}></ScoreCard>
        </Gridbox>
        <br></br>
        <br></br>
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
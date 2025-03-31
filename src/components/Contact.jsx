import React from 'react'
import styled from 'styled-components'
import CImg from '../assets/illustration-your-users.svg'
import ScoreCard from '../styled_components/Scorecard'

function Contact() {
  return (
    <Container>
      <h1>Contact Us</h1>
      <Mdiv>
        <Ldiv>
            <ScoreCard width="38vw" direction="column" label="Prof. Animesh Mukherjee :" score="animeshm@cse.iitkgp.ac.in"></ScoreCard>
            <ScoreCard width="38vw" direction="column" label="Anand Rai :" score="raianand.1991@gmail.com"></ScoreCard>
            <ScoreCard width="38vw" direction="column" label="Utkarsh Anand :" score="ua28012006@gmail.com"></ScoreCard>
            <ScoreCard width="38vw" direction="column" fontSize={1.3} label="Satyam R :" score="satyamrahangdale196@kgpian.iitkgp.ac.in"></ScoreCard>
        </Ldiv>
        <Rdiv>
            <Image src={CImg}></Image>
        </Rdiv>
      </Mdiv>
    </Container>
  )
}

export default Contact

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    padding-top: 0;
    margin-inline: auto;
    /* align-items: center; */
    /* justify-content: center; */
`
const Mdiv = styled.div`
    display: flex;
    gap : 3rem
`
const Ldiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem
`
const Rdiv = styled.div`
    
`
const Image = styled.img`
    max-width: 100%;
    margin : auto;
    height:100%
`
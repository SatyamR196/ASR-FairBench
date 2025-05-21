import React from 'react'
import styled from 'styled-components'
import CImg from '../assets/illustration-your-users.svg'
import ScoreCard from '../styled_components/Scorecard'
import { media } from '../Utils/helper'

function Contact() {
  return (
    <Container>
      <h1>Contact Us</h1>
      <Mdiv>
        <Ldiv>
            <ScoreCard direction="column" label="Prof. Animesh Mukherjee :" score="animeshm@cse.iitkgp.ac.in"></ScoreCard>
            <ScoreCard direction="column" label="Anand Rai :" score="raianand.1991@gmail.com"></ScoreCard>
            <ScoreCard direction="column" label="Utkarsh Anand :" score="ua28012006@gmail.com"></ScoreCard>
            <ScoreCard direction="column" fontSize={1.3} label="Satyam R :" score="satyamrahangdale196@kgpian.iitkgp.ac.in"></ScoreCard>
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
    @media ${media.tablet} {
      padding: 1.2rem;
    }
    @media ${media.mobile} {
      padding: 0.8rem;
    }
`
const Mdiv = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-start;


  @media ${media.laptop} {
    gap: 2rem;
    flex-direction: column;
    align-items: center;
  }

  @media ${media.tablet} {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const Ldiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-width: 280px;
  max-width: 100%;
`;

const Rdiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  /* max-width: 500px; */
  height: auto;

  @media ${media.tablet} {
    max-width: 100%;
  }
`;

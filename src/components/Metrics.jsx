import React from 'react';
import styled from 'styled-components';

function Metrics() {
  return (
    <Container>
      <h1>Metrics</h1>
      <Para>
        Below are the key metrics used to evaluate ASR models in our leaderboard.
      </Para>

      <Section>
        <Head>1. Word Error Rate (WER)</Head>
        <Para>
          WER measures the accuracy of ASR models by calculating the number of substitutions, deletions, and insertions compared to the reference transcript.
          <Formula>WER = (S + D + I) / N</Formula>
          <p>S - No. of substitutions</p>
          <p>D - No. of deletions</p>
          <p>I - No. of insertions</p>
          <p>N - Total no. of transcribed words</p>
        </Para>
      </Section>

      <Section>
        <Head>2. Overall Fairness Score</Head>
        <Para>
          We use a mixed-effect Poisson regression approach to calculate fairness scores, considering the following components:
        </Para>
        <Para>
        <Formula> log(λ<sub>ij</sub>) = log(N<sub>ij</sub>) + µ<sub>f(i)</sub> + r<sub>i</sub> + θ<sup>T</sup>x<sub>ij</sub> </Formula>
        </Para>
        <ul>
          <li><b>λ<sub>ij</sub>:</b> The expected rate of the response variable for the <i>i-th</i> speaker and <i>j-th</i> group.</li>
          <li><b>N<sub>ij</sub>:</b> The observed count for the <i>i-th</i> speaker and <i>j-th</i> group.</li>
          <li><b>µ<sub>f(i)</sub>:</b> The fixed effect of the <i>i-th</i> speaker's attribute (e.g., gender, socioeconomic status, etc.).</li>
          <li><b>r<sub>i</sub>:</b> The random effect of the <i>i-th</i> speaker.</li>
          <li><b>θ<sup>T</sup>x<sub>ij</sub>:</b> The interaction between the fixed effects and speaker's attributes (gender, socioeconomic status, etc.).</li>
        </ul>
      </Section>

      <Section>
  <Head>3. Fairness Adjusted ASR Score (FAAS)</Head>
  <Para>
    The Fairness Adjusted ASR Score (FAAS) is a composite metric that balances both accuracy and fairness in evaluating ASR systems. It incorporates the <b>Word Error Rate (WER)</b> and the <b>Overall Fairness Score</b> to ensure that models are not only accurate but also equitable in their performance across various demographic groups.
  </Para>
  <Para>
    <Formula> FAAS = 10 * log<sub>10</sub>(Overall_Fairness_Score / WER) </Formula>
  </Para>
  <Para>
    A higher FAAS score indicates a model that performs well both in terms of accuracy (lower WER) and fairness (higher Overall Fairness Score). This metric encourages the development of ASR models that are both high-performing and inclusive.
  </Para>
</Section>


      <Section>
  <Head>4. Real-Time Factor (RTFx)</Head>
  <Para>
    RTFx evaluates the efficiency of an ASR model in processing speech, specifically measuring its latency. It helps assess how fast the model transcribes audio data compared to the actual length of the audio.
  </Para>
  <Para>
   <Formula>  RTFx = T<sub>process</sub> / T<sub>audio</sub></Formula>
  </Para>
  <Para>
    Where:
    <ul>
      <li><b>T<sub>process</sub>:</b> Time taken by the ASR model to process and transcribe the audio.</li>
      <li><b>T<sub>audio</sub>:</b> Total duration of the audio input in seconds.</li>
    </ul>
  </Para>
  <Para>
    A lower RTFx value indicates better efficiency, as the model processes the audio quickly in comparison to its duration.
  </Para>
</Section>
    </Container>
  );
}

export default Metrics;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 900px;
  margin: auto;
`;

const Section = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
`;

const Head = styled.h2`
  font-size: 1.8rem;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const Para = styled.p`
  color: #4b5563;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const Formula = styled.p`
  background: #f3f4f6;
  padding: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  text-align: center;
  margin-top: 0.5rem;
  color: #1e3a8a;
`;

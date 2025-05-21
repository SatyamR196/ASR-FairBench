import React from 'react';
import styled from 'styled-components';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { media } from '../Utils/helper.js';

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
          WER measures the accuracy of ASR models by calculating the number of
          substitutions, deletions, and insertions compared to the reference
          transcript.
        </Para>
        <FormulaContainer>
          <BlockMath math="\text{WER} = \frac{S + D + I}{N}" />
        </FormulaContainer>
        <Para>Where:</Para>
        <ul>
          <li><b>S:</b> Number of substitutions</li>
          <li><b>D:</b> Number of deletions</li>
          <li><b>I:</b> Number of insertions</li>
          <li><b>N:</b> Total number of words in the reference transcript</li>
        </ul>
      </Section>

      <Section>
        <Head>2. Fairness Assessment Model</Head>
        <Para>
          To assess fairness across demographic groups, we apply a mixed-effects Poisson 
          regression model to estimate WER disparities:
        </Para>
        <FormulaContainer>
          <BlockMath math="\log(\text{WER}_i) = \beta_0 + \beta_1 X_i + \beta_2 Z_i + u_i" />
        </FormulaContainer>
        <Para>Where:</Para>
        <ul>
          <li><b>WER<sub>i</sub>:</b> Observed word error rate for individual i</li>
          <li><b>β<sub>0</sub>:</b> Intercept term, representing the baseline (log) WER for a reference group with no demographic or covariate influence</li>
          <li><b>X<sub>i</sub>:</b> Demographic attributes (e.g., gender, race, accent) for individual i</li>
          <li><b>β<sub>1</sub>:</b> Coefficient that quantifies the impact of demographic factors on WER</li>
          <li><b>Z<sub>i</sub>:</b> Covariates (e.g., audio length, noise level) affecting WER but unrelated to fairness</li>
          <li><b>β<sub>2</sub>:</b> Coefficient capturing the effect of covariates on WER</li>
          <li><b>u<sub>i</sub>:</b> Random effect accounting for individual-level variability (e.g., speaker-specific variation)</li>
        </ul>
      </Section>

      <Section>
        <Head>3. Group-level Fairness Score Calculation</Head>
        <Para>
          To compute group-level fairness scores, we calculate the predicted WER for each demographic group g:
        </Para>
        <FormulaContainer>
          <BlockMath math="\text{WER}_g = \frac{e^{(\beta_0 + \beta_g + \beta_{\log\text{Ref}} \cdot X)}}{e^X - 1}" />
        </FormulaContainer>
        <Para>Where:</Para>
        <ul>
          <li><b>β<sub>g</sub>:</b> Group-specific effect for demographic group g</li>
          <li><b>β<sub>logRef</sub>:</b> Coefficient based on log-transformed reference group</li>
          <li><b>X:</b> Predictor variable capturing group identity or covariates</li>
        </ul>
        <Para>
          These predicted WER values are then converted to <b>raw fairness scores</b> (on a 0–100 scale):
        </Para>
        <FormulaContainer>
          <BlockMath math="\text{Raw fairness score}_g = 100 \times \left(1 - \frac{\text{WER}_g - \min(\text{WER})}{\max(\text{WER}) - \min(\text{WER})}\right)" />
        </FormulaContainer>
        <Para>
          This normalization ensures that groups with the <b>lowest WER</b> receive the <b>highest fairness score</b>.
          On this scale, 100 represents the most fair (lowest WER), and 0 represents the least fair (highest WER).
        </Para>
        <Para>
          To compute a category-level score (e.g., for a particular demographic attribute like gender), 
          we take a weighted average across all groups in that category:
        </Para>
        <FormulaContainer>
          <BlockMath math="\text{Category score} = \sum_g p_g \times \text{Raw fairness score}_g" />
        </FormulaContainer>
        <Para>Where:</Para>
        <ul>
          <li><b>p<sub>g</sub>:</b> Proportion of data represented by group g</li>
        </ul>
        <Para>The weights ensure that the fairness score reflects the real-world distribution of groups.</Para>
      </Section>

      <Section>
        <Head>4. Statistical Adjustment and FAAS</Head>
        <Para>
          We assess whether demographic disparities are <b>statistically significant</b> using a 
          <b> Likelihood Ratio Test (LRT)</b> that compares two models:
        </Para>
        <FormulaContainer>
          <BlockMath math="\text{LRT} = 2 \times (\log L_{\text{full}} - \log L_{\text{reduced}})" />
        </FormulaContainer>
        <Para>Where:</Para>
        <ul>
          <li><b>L<sub>full</sub>:</b> Log-likelihood of model including demographic attributes</li>
          <li><b>L<sub>reduced</sub>:</b> Log-likelihood of model excluding demographic attributes</li>
        </ul>
        <Para>
          If the resulting <b>p-value</b> is below a significance threshold (e.g., p &lt; 0.05), 
          it indicates that demographic disparities are <b>statistically significant</b>. 
          In such cases, a penalty is applied:
        </Para>
        <FormulaContainer>
          <BlockMath math="\text{Adjusted score} = \text{Category score} \times \left(\frac{p}{0.05}\right)" />
        </FormulaContainer>
        <Para>
          Lower p-values imply a higher penalty on the fairness score.
          If p ≥ 0.05, no adjustment is made.
        </Para>
        <Para>
          Finally, the <b>overall fairness score</b> is computed across all demographic categories c:
        </Para>
        <FormulaContainer>
          <BlockMath math="\text{Overall score} = \frac{\sum_c w_c \times \text{Adjusted score}_c}{\sum_c w_c}" />
        </FormulaContainer>
        <Para>Where:</Para>
        <ul>
          <li><b>w<sub>c</sub>:</b> Importance weight for category c</li>
        </ul>
      </Section>

      <Section>
        <Head>5. Fairness Adjusted ASR Score (FAAS)</Head>
        <Para>
          The Fairness Adjusted ASR Score (FAAS) is a comprehensive metric that balances both accuracy and fairness 
          in evaluating ASR systems. It incorporates the <b>Word Error Rate (WER)</b> and the <b>Overall Fairness Score</b> 
          to ensure that models are not only accurate but also equitable in their performance across demographic groups.
        </Para>
        <FormulaContainer>
          <BlockMath math="\text{FAAS} = 10 \times \log_{10}\left(\frac{\text{Overall\_Fairness\_Score}}{\text{WER}}\right)" />
        </FormulaContainer>
        <Para>
          A higher FAAS score indicates a model that performs well both in terms of accuracy (lower WER) and fairness 
          (higher Overall Fairness Score). This framework encourages the development of ASR models that are both 
          high-performing and inclusive across all user populations.
        </Para>
      </Section>

      <Section>
        <Head>6. Real-Time Factor (RTFx)</Head>
        <Para>
          RTFx evaluates the efficiency of an ASR model in processing speech, specifically measuring its latency. It helps 
          assess how fast the model transcribes audio data compared to the actual length of the audio.
        </Para>
        <FormulaContainer>
          <BlockMath math="\text{RTFx} = \frac{T_{\text{process}}}{T_{\text{audio}}}" />
        </FormulaContainer>
        <Para>Where:</Para>
        <ul>
          <li><b>T<sub>process</sub>:</b> Time taken by the ASR model to process and transcribe the audio</li>
          <li><b>T<sub>audio</sub>:</b> Total duration of the audio input in seconds</li>
        </ul>
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
  @media ${media.mobile} {
    padding: 1rem;
  }
  @media (max-width: 370px) {
    padding: 0.2rem;
  }
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

const FormulaContainer = styled.div`
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  overflow-x: auto;
`;

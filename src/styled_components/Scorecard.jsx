import React from "react";
import styled from "styled-components";
import { XCircle,Target,BadgeCheck,CircleCheckBig } from "lucide-react";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 350px;
  background: white;
  position: relative;
  border-inline: 4px solid #2563eb; /* Blue border on the left */
`;

const Label = styled.span`
  color: #4b5563;
  font-size: 1.4rem;
`;

const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Score = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  color: #000;
`;

const Icon = styled(CircleCheckBig)`
  width: 20px;
  height: 20px;
  /* color: #9ca3af; */
  color: #37c200;
  cursor: pointer;
`;

const ScoreCard = ({ label, score, text }) => {
  if(typeof(score)===Number) score = Math.round(score * 100) / 100;
  return (
    <Card>
      <Label>{label}</Label>
      <ScoreWrapper>
        <Score>{score}</Score>
        <Icon />
      </ScoreWrapper>
    </Card>
  );
};

export default ScoreCard;

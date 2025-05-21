import React from "react";
import styled from "styled-components";
import { CircleCheckBig } from "lucide-react";
import { media } from "../Utils/helper.js"; // 👈 adjust path as needed

const Card = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  border-inline: 4px solid #2563eb;

  @media ${media.laptop} {
    padding: 16px;
  }

  @media ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  @media ${media.mobile} {
    padding: 12px;
    gap: 10px;
  }
`;

const Label = styled.span`
  color: #4b5563;
  font-size: 1.4rem;
  font-weight: ${(props) => props.fontWeight || 500};
  flex: 1 1 auto;              /* allow it to shrink and grow */
  min-width: 0;                /* necessary for flex children to wrap */
  word-wrap: break-word;      /* legacy but still widely used */
  overflow-wrap: break-word;  /* modern equivalent */
  word-break: break-word;     /* ensures breaking long words */

  @media ${media.tablet} {
    font-size: 1.2rem;
  }

  @media ${media.mobile} {
    font-size: 1rem;
  }
`;

const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Score = styled.span`
  font-weight: bold;
  font-size: ${(props) => props.fontSize || 1.5}rem;
  color: #000;
    
  @media ${media.tablet} {
    font-size: 1.3rem;
    flex: 1 1 auto;              
    min-width: 0;                
    word-break: break-word;
  }

  @media ${media.mobile} {
    font-size: 1.1rem;
    flex: 1 1 auto;              
    min-width: 0;                
    word-break: break-word;
  }
`;

const Icon = styled(CircleCheckBig)`
  width: 20px;
  height: 20px;
  color: #37c200;
  cursor: pointer;

  @media ${media.mobile} {
    width: 18px;
    height: 18px;
  }
`;

const ScoreCard = ({ label, score, width, direction, fontSize, fontWeight }) => {
  if (typeof score === "number") score = Math.round(score * 100) / 100;
  return (
    <Card width={width} direction={direction}>
      <Label fontWeight={fontWeight}>{label}</Label>
      <ScoreWrapper>
        <Score fontSize={fontSize}>{score}</Score>
        <Icon />
      </ScoreWrapper>
    </Card>
  );
};

export default ScoreCard;

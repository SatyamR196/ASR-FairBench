import styled from 'styled-components';
const Button=styled.button`
        border: ${props => props.borderColor ? `2px solid ${props.borderColor}` : 'none'};
        color: ${props => props.color} ;
        background-color: ${(props)=> props.bg || "white" };
        ${ props=> props.shadow ? `box-shadow: 1px 1px 5px ${props.shadow}` : "" };
        font-weight: bold;
        text-decoration: none;
        padding:8px 11px;
        border-radius: 12px;
        transition: ease-in-out 0.3s;
        &:hover{
        background-color: ${(props)=> props.bg || "white"};
        transform: scale(1.05);
        z-index:1
        }
        &:active{
        background-color: ${(props)=> props.bg};
        transform: scale(0.95);
        z-index:1;
        transition: ease-in-out 0.08s;
        }
`;

Button.defaultProps = {
    bg: "pink",
    color : "#a80471",
}

export const ButtonD=styled(Button)`
`;

ButtonD.defaultProps={
    bg: "aliceblue",
    color : "#ae0378",
}

export default Button;
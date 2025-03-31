import styled from 'styled-components';
import React from 'react'
import { Link} from "react-router-dom";
function Nav() {
  return (
    <NavBar class="nav-bar">
        <Link to="/home">Home</Link>
        <Link to="/request">Check Fairness Score</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/metrics">Metrics</Link>
        <Link to="/dataset">Dataset</Link>
        <Link to="/contact">Contact Us</Link>
    </NavBar>
  )
}

const NavBar = styled.div`
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-inline: auto;
    padding: 0.8rem;
    /* background: rgba(22, 52, 250, 0.2); */
    background-color: rgb(243, 245, 250);
    border: 1.5px solid rgb(209, 209, 209);
    backdrop-filter: blur(10px);
    border-radius: 15px;

    a {
        text-decoration: none;
        font-size: 1.3rem;
        font-weight: bold;
        color: #000000;
        transition: color 0.3s;
    }
    a:hover {
        color: #3b82f6;
    }
`;

export default Nav

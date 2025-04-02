import styled from 'styled-components';
import React from 'react'
import { Link,useLocation} from "react-router-dom";
function Nav() {
  const location = useLocation();
  return (
    <NavBar className="nav-bar">
      <NavLink to="/home" $active={location.pathname === "/home"}>Home</NavLink>
      <NavLink to="/request" $active={location.pathname === "/request"}>Submit Model</NavLink>
      {/* <NavLink to="/leaderboard" $active={location.pathname === "/leaderboard"}>Leaderboard</NavLink> */}
      <NavLink to="/metrics" $active={location.pathname === "/metrics"}>Metrics</NavLink>
      <NavLink to="/dataset" $active={location.pathname === "/dataset"}>Dataset</NavLink>
      <NavLink to="/contact" $active={location.pathname === "/contact"}>Contact Us</NavLink>
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

    /* a {
        text-decoration: none;
        font-size: 1.3rem;
        font-weight: bold;
        color: #000000;
        transition: color 0.3s;
    }
    a:hover {
        color: #3b82f6;
    } */
`;

// Styled Link with Active Highlighting
const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ $active }) => ($active ? "#3b82f6" : "#000000")};
  border-bottom: ${({ $active }) => ($active ? "3px solid #3b82f6" : "none")};
  /* transition: color 0.3s, border-bottom 0.3s; */

  &:hover {
    color: #3b82f6;
  }
`;
export default Nav

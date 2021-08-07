import "./firebase";
import styled from "styled-components";
import CanvasList from "./components/canvasList";
import AddVoter from "./components/addVoter";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.div`
  padding: 1rem;
  @media (max-width: 576px) {
    padding: 1rem 0.5rem;
  }
`;

const NavButtonContainer = styled.div`
  display: flex;
`;

const NavButton = styled.div`
  padding: 1rem;
  transition: all 0.3s ease-in;

  @media (max-width: 576px) {
    padding: 1rem 0.5rem;
  }

  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
`;

function App() {
  return (
    <div className="App">
      <Router>
        <Nav>
          <Link to="/">
            <Logo>iCanvas5000</Logo>
          </Link>
          <NavButtonContainer>
            <Link to="/">
              <NavButton>View All Voters</NavButton>
            </Link>
            <Link to="/add">
              <NavButton>Add Voter</NavButton>
            </Link>
          </NavButtonContainer>
        </Nav>
        <Switch>
          <Route path="/add">
            <AddVoter />
          </Route>
          <Route path="/">
            <CanvasList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

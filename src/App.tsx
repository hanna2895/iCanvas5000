import "./firebase";
import styled from "styled-components";
import CanvasList from "./components/canvasList";
import AddVoter from "./components/addVoter";
import AuthMenu from "./components/authMenu";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import firebase from "firebase";
import { useState } from "react";

const Nav = styled.nav`
  display: flex;
  height: 3rem;
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
    background-color: #408ee0;
    color: white;
    cursor: pointer;
  }
`;

const Footer = styled.footer`
  bottom: 0;
  background-color: white;
  display: flex;
  height: 2rem;
  justify-content: space-between;
  padding: 1rem 0;
  position: sticky;
  left: calc(50% - 17.5rem);
  max-width: calc(100% - 2rem);
  width: 35rem;
  z-index: 1000;

  @media (max-width: 576px) {
    left: unset;
    div {
      margin-left: 1rem;
    }
  }
`;

function App() {
  const history = useHistory();
  const [user, setUser] = useState<firebase.User | undefined>();
  const [authError, setAuthError] = useState("");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // with more time, I could make this a nicer solution but it works for now
      // if the user is signed in, store it in application state and pass it down to the pages
      setUser(user);
      setAuthError("");
    } else {
      // if the user is not signed in and they try to access another page, clear the user object
      setUser(undefined);
    }
  });

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setAuthError("");
        history && history.push("/");
      });
  };

  return (
    <div className="App">
      <Router>
        <Nav>
          <Link to="/">
            <Logo>iCanvas5000</Logo>
          </Link>
          <NavButtonContainer>
            <Link to="/voters">
              <NavButton>View All Voters</NavButton>
            </Link>
            <Link to="/add">
              <NavButton>Add Voter</NavButton>
            </Link>
          </NavButtonContainer>
        </Nav>
        <Switch>
          <Route path="/add">
            <AddVoter user={user} setAuthError={setAuthError} />
          </Route>
          <Route path="/voters">
            <CanvasList user={user} setAuthError={setAuthError} />
          </Route>
          <Route path="/">
            <AuthMenu authError={authError} />
          </Route>
        </Switch>

        <Footer>
          <div>Created by @hanna_codes</div>
          <button onClick={signOut}>Logout</button>
        </Footer>
      </Router>
    </div>
  );
}

export default App;

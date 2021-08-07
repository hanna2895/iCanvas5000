import React from "react";
import firebase from "firebase";
import { Container } from "./container";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const SignInButton = styled.button`
  border: unset;
  border-radius: 5px;
  background-color: #408ee0;
  color: white;
  font-size: 1.5rem;
  margin-top: 3rem;
  padding: 1rem;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: #1b75be;
    cursor: pointer;
  }
`;

const AuthError = styled.p`
  color: red;
  margin-top: 3rem;
`;

interface Props {
  authError: string;
}

const AuthMenu = ({ authError }: Props) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const history = useHistory();

  const signUp = () =>
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => history.push("/voters"));

  return (
    <Container style={{ textAlign: "center" }}>
      <h1>Welcome to iCanvas5000</h1>
      <p>Please sign in to start canvassing.</p>
      <SignInButton onClick={signUp}>Sign in with Google</SignInButton>
      <AuthError>{authError}</AuthError>
    </Container>
  );
};

export default AuthMenu;

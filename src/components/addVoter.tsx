import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import firebase from "firebase";
import { Container } from "./container";
import { useHistory } from "react-router-dom";

const VoterForm = styled.form`
  @media (max-width: 576px) {
    max-width: 100%;
  }

  div {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.5rem;
    }
    input {
      border: 1px solid gray;
      border-radius: 5px;
      margin-bottom: 1rem;
      padding: 0.5rem;
    }
  }
  button {
    background: green;
    border: unset;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    padding: 0.5rem;
    margin: 1rem 0;
  }
`;

const Success = styled.span`
  color: green;
  padding: 1rem;
`;

interface Props {
  setAuthError(error: string): void;
  user: firebase.User | undefined;
}

const AddVoter = ({ setAuthError, user }: Props) => {
  const history = useHistory();
  const [voterName, setVoterName] = useState<string>("");
  const [voterEmail, setVoterEmail] = useState<string>("");
  const [voterNotes, setVoterNotes] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  if (!user) {
    history.push("/");
    setAuthError("You must be logged in to add voters.");
  }

  const saveVoter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("voters")
      .add({
        name: voterName,
        email: voterEmail,
        notes: voterNotes,
        dateCanvassed: { nanoseconds: 0, seconds: Date.now() },
        addedBy: user.uid,
      })
      .then(() => {
        setVoterName("");
        setVoterEmail("");
        setVoterNotes("");
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Container>
      <h2>Add Voter</h2>

      <VoterForm onSubmit={(e) => saveVoter(e)}>
        <div>
          <label>Voter Name</label>
          <input
            onChange={(event) => setVoterName(event.target.value)}
            value={voterName}
          />
        </div>
        <div>
          <label>Voter Email</label>
          <input
            onChange={(event) => setVoterEmail(event.target.value)}
            type="email"
            value={voterEmail}
          />
        </div>
        <div>
          <label>Canvas Notes</label>
          <textarea
            onChange={(event) => setVoterNotes(event.target.value)}
            rows={4}
            value={voterNotes}
          />
        </div>
        <button type="submit">Save Voter</button>
        {showSuccess && <Success>Saved!</Success>}
      </VoterForm>
    </Container>
  );
};

export default AddVoter;

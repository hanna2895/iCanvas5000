import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";

const VoterFormContainer = styled.div`
  padding: 1rem;
`;

const VoterForm = styled.form`
  max-width: 50%;

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

const AddVoter = () => {
  const [voterName, setVoterName] = useState<string>("");
  const [voterEmail, setVoterEmail] = useState<string>("");
  const [voterNotes, setVoterNotes] = useState<string>("");

  const saveVoter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("voters")
      .add({
        name: voterName,
        email: voterEmail,
        notes: voterNotes,
        dateCanvassed: { nanoseconds: 0, seconds: Date.now() },
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <VoterFormContainer>
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
      </VoterForm>
    </VoterFormContainer>
  );
};

export default AddVoter;

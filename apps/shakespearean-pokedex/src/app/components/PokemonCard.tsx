import React from "react";
//import { PokemonCard } from "./PokemonCard.styles";
import { Pokemon } from "@truelayer/api-interfaces";
import styled from "styled-components";

// Responsive design with styled components
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: auto 13rem;
  grid-template-areas:
    "img name"
    "img description";
  grid-gap: 0.25rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    margin: 0 auto;
    grid-template-areas:
    "img"
    "name"
    "description";
  }
`;

const Sprite = styled.img`
  grid-area: img;
  width: 14rem;
  height: 14rem;
`

export const PokemonCard: React.FC<Pokemon> = ({ name, description, sprite }) => {
  return (
    <Wrapper>
      <Sprite src={sprite} alt={`sprite of ${name}`}></Sprite>
      <h2>{name}</h2>
      <p>{description}</p>
    </Wrapper>
  );
};

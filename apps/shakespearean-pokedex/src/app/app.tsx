import React, { useState } from 'react';
import axios from 'axios';
import { Pokemon } from '@truelayer/api-interfaces';
import { PokemonCard } from './components/PokemonCard';

export const App = () => {
  const [inputs, setInputs] = useState({pokemon: ''});
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [error, setError] = useState(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.get(`/pokemon/${inputs.pokemon}`)
      .then(({data}) => {
        console.log(data);
        setPokemonData({
          ...pokemonData,
          name: data.name,
          description: data.description,
          sprite: data.sprite
        });
      })
      .catch(err => {
        setError(err);
      });
  }

  return (
    <div>
      <h1>Welcome to Shakespearean Pokedex!</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter a pokemon name:</label>
        <input
          type="text"
          name="pokemon"
          value={inputs.pokemon || ""}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>

      {error && <span>Something went wrong ...</span>}

      {pokemonData &&
        <PokemonCard
          name={pokemonData?.name}
          description={pokemonData?.description}
          sprite={pokemonData?.sprite}
        />
      }
    </div>
  );
};

export default App;

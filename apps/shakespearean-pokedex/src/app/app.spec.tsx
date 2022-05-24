import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import axios from 'axios';
import App from './app';
import { Pokemon } from '@truelayer/api-interfaces';
import { jest } from '@jest/globals';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  it('renders App component', async () => {
    render(<App />);

    expect(screen.getByText('Welcome to Shakespearean Pokedex!')).toBeInTheDocument();
    expect(screen.getByText('Enter a pokemon name:')).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it('fetches pokemon data from an API and displays them', async () => {
    const mockPokemonData: Pokemon = {
      name: 'charizard',
      description: 'Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself.',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    };

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: mockPokemonData })
    );

    render(<App />);

    await userEvent.type(screen.getByRole('textbox'), 'charizard');
    await userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('charizard')).toBeInTheDocument();
    expect(await screen.findByText('Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself.')).toBeInTheDocument();
    expect(await screen.findByRole('img')).toBeInTheDocument();
  });

  it('fetches pokemon data from an API and fails', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error())
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });
});

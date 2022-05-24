import * as express from "express";
import { Pokemon } from "@truelayer/api-interfaces";
import * as cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());

function getPokemonSprite(pokemonName: string) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
}

function getPokemonDescription(pokemonName: string) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
}

function postShakespeareTranslator(text: string) {
  return axios.post(
    "https://api.funtranslations.com/translate/shakespeare.json",
    {},
    { params: { text } }
  );
}

app.get("/pokemon/:pokemonName", async (req, res) => {
  try {
    const pokemon: Pokemon = {
      name: req.params.pokemonName,
      description: "",
      sprite: ""
    };

    const [spriteResponse, descriptionResponse] = await Promise.all([
      getPokemonSprite(req.params.pokemonName),
      getPokemonDescription(req.params.pokemonName)
    ]);

    pokemon.sprite = spriteResponse.data.sprites.front_default;
    // Find the last entry in the description array, just because it's the latest version
    pokemon.description = [...descriptionResponse.data.flavor_text_entries]
      .reverse()
      .find(entry => entry.language.name === "en").flavor_text;

    const translationResponse = await postShakespeareTranslator(
      encodeURI(pokemon.description)
    );
    pokemon.description = decodeURI(
      translationResponse.data.contents.translated
    );

    res.send(pokemon);
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.port || 5000;
const server = app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
server.on("error", console.error);

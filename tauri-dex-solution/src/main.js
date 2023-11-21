const { invoke } = window.__TAURI__.tauri;

let pokemonNameInputEl;
let pokemonMsgEl;

let pokemonImgEl;
let pokemonNameEl;
let pokemonWeightEl;
let pokemonHeightEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  let pokemon = await invoke("get_pokemon", { name: pokemonNameInputEl.value });

  // Remove "Pokemon {" and "}" from the string
  let pokemonJson = '{'+pokemon.replace('Pokemon {', '').replace('}', '').replace('id', '"id"').replace('name', '"name"').replace('weight', '"weight"').replace('height', '"height"').trim()+'}';

  // // Parse the remaining string as JSON
  let pokemonObject = JSON.parse(pokemonJson);

  // // Access the properties of the parsed object
  // console.log(pokemonObject.id);      // Output: 1
  // console.log(pokemonObject.name);    // Output: bulbasaur
  // console.log(pokemonObject.weight);  // Output: 69
  // console.log(pokemonObject.height);  // Output: 7


  pokemonMsgEl.textContent = "You've chosen "+pokemonObject.name+"!";
  pokemonImgEl.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemonObject.id+".png"
  pokemonNameEl.textContent = pokemonObject.name;
  pokemonWeightEl.textContent = pokemonObject.weight;
  pokemonHeightEl.textContent = pokemonObject.height;
}

window.addEventListener("DOMContentLoaded", () => {
  pokemonNameInputEl = document.querySelector("#pokemon-name-input");
  pokemonMsgEl = document.querySelector("#pokemon-msg");
  pokemonImgEl = document.querySelector("#pokemon-img");
  pokemonNameEl = document.querySelector("#pokemon-name");
  pokemonWeightEl = document.querySelector("#pokemon-weight");
  pokemonHeightEl = document.querySelector("#pokemon-height");
  document.querySelector("#pokemon-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});
function getPokemonCard(pokemon) {
  let type = pokemon.types[0].type.name;
  let bgColor = getTypeColor(type);
  return `
    <div class="pokemonCard" style="background-color: ${bgColor}" onclick="openDialogFromCard(${pokemon.id})">
      <p>#${pokemon.id}</p>
      <img class="pokemonCardImg" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" />
      <p>${pokemon.name}</p>
    </div>
  `;
}

function getPokemonDialogContent(pokemon) {
  return `
    <div id="dialogContentInner" onclick="event.stopPropagation()">
      <button id="dialogCloseBtn" onclick="closeDialog()">✕</button>
      <img id="dialogImg" class="bigImg"
        src="${pokemon.sprites.other.dream_world.front_default}"
        alt="${pokemon.name}" />
      <h2 id="dialogName">#${pokemon.id} ${pokemon.name}</h2>
      <div id="dialogStats">
        <p>HP: ${pokemon.stats[0].base_stat}</p>
        <p>ATTACK: ${pokemon.stats[1].base_stat}</p>
        <p>DEFENSE: ${pokemon.stats[2].base_stat}</p>
        <p>SPECIAL-ATTACK: ${pokemon.stats[3].base_stat}</p>
        <p>SPECIAL-DEFENSE: ${pokemon.stats[4].base_stat}</p>
        <p>SPEED: ${pokemon.stats[5].base_stat}</p>
      </div>
      <div id="dialogBtns">
        <button onclick="previousDialog()">Zurück</button>
        <button onclick="nextDialog()">Weiter</button>
      </div>
    </div>
  `;
}

function getTypeColor(type) {
  switch (type) {
    case "fire":
      return "#FF9E80";
    case "water":
      return "#80D8FF";
    case "grass":
      return "#A5D6A7";
    case "electric":
      return "#FFF59D";
    case "ice":
      return "#B3E5FC";
    case "fighting":
      return "#E57373";
    case "poison":
      return "#CE93D8";
    case "ground":
      return "#D7CCC8";
    case "flying":
      return "#B0BEC5";
    case "psychic":
      return "#F48FB1";
    case "bug":
      return "#C5E1A5";
    case "rock":
      return "#BCAAA4";
    case "ghost":
      return "#B39DDB";
    case "dragon":
      return "#9FA8DA";
    case "dark":
      return "#757575";
    case "steel":
      return "#CFD8DC";
    case "fairy":
      return "#F8BBD0";
    default:
      return "#E0E0E0";
  }
}

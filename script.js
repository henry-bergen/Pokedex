// let allDataNormal = [];
let allData = 1;
let renderCount = 20;
let dialog = document.getElementById("pokemonDialog");
let currentDialogIndex = null;
let title = document.getElementById("title");

async function init() {
  showSpinner();
  // normalFetch(); anfängerfreundlicher, aber langsamer
  await getAllPokemonData();
  hideSpinner();
  renderPokemons();
}

function showSpinner() {
  document.getElementById("loadingSpinner").classList.remove("hidden");
}

function hideSpinner() {
  document.getElementById("loadingSpinner").classList.add("hidden");
}

// async function normalFetch() {
//   let response = await fetch(
//     "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
//   ); // 100 Limit
//   console.log("response1:", response);
//   let data = await response.json();
//   console.log(data.results);
//   for (let index = 0; index < data.results.length; index++) {
//     let response = await fetch(data.results[index].url);
//     let singleData = await response.json();
//     console.log("for loop data single:", index, singleData);
//     allDataNormal.push(singleData);
//   }
//   console.log("normal fetch done!: ", allDataNormal);
// }

// Promise.all
async function getAllPokemonData() {
  let response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=500&offset=0"
  ); // 500 Limit
  console.log("response1:", response);
  let data = await response.json();
  console.log(data.results);
  let allPromises = [];
  for (let index = 0; index < data.results.length; index++) {
    allPromises.push(getPokemonDetails(data.results[index]));
  }
  console.log("alle promises:", allPromises);
  allData = await Promise.all(allPromises);
  console.log("alle promise resolved daten:", allData);
  console.log("promise all done!");
}

async function getPokemonDetails(singledata) {
  let response = await fetch(singledata.url);
  return await response.json();
}

function renderPokemons() {
  document.getElementById("pokemonContainer").innerHTML = "";

  let maxRender = renderCount;
  if (renderCount > allData.length) {
    maxRender = allData.length;
  }

  for (let i = 0; i < maxRender; i++) {
    const pokemon = allData[i];
    document.getElementById("pokemonContainer").innerHTML +=
      getPokemonCard(pokemon);
  }

  toggleLoadMoreButton();
}

function toggleLoadMoreButton() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (renderCount >= allData.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

function loadMorePokemons() {
  renderCount = renderCount + 20;
  if (renderCount > allData.length) {
    renderCount = allData.length;
  }
  renderPokemons();
  toggleLoadMoreButton();
}

function openDialogFromCard(id) {
  let pokemon = getPokemonById(id);
  showPokemonDialog(pokemon);
}

function getPokemonById(id) {
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].id === id) {
      currentDialogIndex = i;
      return allData[i];
    }
  }
  return null;
}

function showPokemonDialog(pokemon) {
  if (!pokemon) return;

  setDialogContent(dialog, pokemon);
  dialog.showModal();
  document.getElementById("body").classList.toggle("stopScroll");
}

function closeDialog() {
  dialog.close();
  document.getElementById("body").classList.toggle("stopScroll");
}

function setDialogContent(dialog, pokemon) {
  dialog.innerHTML = getPokemonDialogContent(pokemon);
  dialog.style.backgroundColor = getTypeColor(pokemon.types[0].type.name);
}

function previousDialog() {
  if (currentDialogIndex === null) return;
  if (currentDialogIndex === 0) return;
  currentDialogIndex = currentDialogIndex - 1;
  let p = allData[currentDialogIndex];
  let dialog = document.getElementById("pokemonDialog");
  dialog.innerHTML = getPokemonDialogContent(p);
  dialog.style.backgroundColor = getTypeColor(p.types[0].type.name);
}

function nextDialog() {
  if (currentDialogIndex === null) return;
  if (currentDialogIndex >= allData.length - 1) return;
  currentDialogIndex = currentDialogIndex + 1;
  let p = allData[currentDialogIndex];
  let dialog = document.getElementById("pokemonDialog");
  dialog.innerHTML = getPokemonDialogContent(p);
  dialog.style.backgroundColor = getTypeColor(p.types[0].type.name);
}

function filterPokemons() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let container = document.getElementById("pokemonContainer");
  if (input.length >= 3) {
    let filtered = [];
    for (let i = 0; i < allData.length; i++)
      if (allData[i].name.toLowerCase().includes(input))
        filtered.push(allData[i]);
    container.innerHTML = "";
    for (let j = 0; j < filtered.length; j++)
      container.innerHTML += getPokemonCard(filtered[j]);
    updateOverview(filtered.length > 0);
  }
}

function updateOverview(isFiltered) {
  updateTitle(isFiltered);
  updateLoadOrResetButton(true);
}

function updateTitle(isFiltered) {
  if (isFiltered) {
    title.innerText = "Your results";
  } else {
    title.innerText = "No results";
  }
}

function updateLoadOrResetButton(isFiltered) {
  let btn = document.getElementById("loadMoreBtn");
  if (isFiltered) {
    btn.innerText = "Reset";
    btn.onclick = resetSearch;
  } else {
    btn.innerText = "Load more";
    btn.onclick = loadMorePokemons;
  }
}

function resetSearch() {
  document.getElementById("searchInput").value = "";
  renderPokemons();
  updateLoadOrResetButton(false);
  title.innerText = "All Pokémon";
}

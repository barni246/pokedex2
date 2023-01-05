
async function loadPokemons() {
    let urlPokemon = 'https://pokeapi.co/api/v2/pokemon/';
    let response = await fetch(urlPokemon);
    let responseAsJson = await response.json();
    let pokemonResults = responseAsJson['results'];
    showPokemons(pokemonResults);
    filterdPokemon = [];
}


async function showPokemons(pokemonResults) {
    for (let i = 0; i < pokemonResults.length; i++) {
        const pokemonName = pokemonResults[i]['name'];
        let urlPokemonName = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let responseServer = await fetch(urlPokemonName);
        let responseServerAsJson = await responseServer.json();
        renderCards(responseServerAsJson, i, pokemonName);
    }
}


function renderCards(responseServerAsJson, i, pokemonName) {
    renderPokemonName(pokemonName, i);
    renderPokemonTypes(responseServerAsJson, i);
    renderPokemonImage(responseServerAsJson, i);
}


function renderPokemonName(pokemonName, i) {
    pokemonArray.push(pokemonName);
    document.getElementById('mainContainer').innerHTML += /*html*/ `
    <div id="card${i}" onclick="showInfoCard('${pokemonName}')" class="card">
        <div id="cardAbove${i}" class="cardAbove">
            <div class="nameOfPokemonContainer"><h2>${pokemonName}</h2></div>
        </div>
        <div id="cardBelow${i}" class="cardBelow"></div>
     </div>
     `;
}


function renderPokemonImage(responseServerAsJson, i) {
    const pokemonImage = responseServerAsJson['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('cardBelow' + i).innerHTML += /*html*/ `
              <img class="pokemonImage" src="${pokemonImage}">`;
}


function renderPokemonTypes(responseServerAsJson, i) {
    const pokemonTypesArray = responseServerAsJson['types'];
    for (let j = 0; j < pokemonTypesArray.length; j++) {
        const types = pokemonTypesArray[j];
        const name = types['type']['name'];
        colorOfPokemonTypes(name, i);
    }
}


function mainPage() {
    //urlPokemon = ''; //eine zweite Lösung, wenn irgendwas nicht verschwinden will
    document.getElementById('filterdPokemonContainer').innerHTML = '';
    document.getElementById('filterdPokemon').classList.add('d-none');
    document.getElementById('buttonBack').classList.add('d-none');
    document.getElementById('buttonBackBelow').classList.add('d-none')
}


function colorOfPokemonTypes(name, i) {
    if (name == 'grass') {
        grass(name, i)
    } else if (name == 'fire') {
        fire(name, i);
    } else if (name == 'poison') {
        poison(name, i);
    } else if (name == 'flying') {
        flying(name, i);
    } else if (name == 'water') {
        water(name, i);
    } else if (name == 'bug') {
        bug(name, i);
    } else {
        normal(name, i);
    }
}


function grass(name, i) {
    document.getElementById('cardAbove' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${i}" class="propertyContainer" style = "background-color: green">${name}</div>`;
}


function fire(name, i) {
    document.getElementById('cardAbove' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${i}" class="propertyContainer" style = "background-color: red">${name}</div>`;
}


function poison(name, i) {
    document.getElementById('cardAbove' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${i}" class="propertyContainer" style = "background-color: blueviolet">${name}</div>`;
}


function water(name, i) {
    document.getElementById('cardAbove' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${i}" class="propertyContainer" style = "background-color: blue">${name}</div>`;
}


function flying(name, i) {
    document.getElementById('cardAbove' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${i}" class="propertyContainer" style = "background-color: lightblue">${name}</div>`;
}


function bug(name, i) {
    document.getElementById('cardAbove' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${i}" class="propertyContainer" style = "background-color: greenyellow">${name}</div>`;
}


function normal(name, i) {
    document.getElementById('cardAbove' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${i}" class="propertyContainer">${name}</div>`;
}



let pokemonArray = [];
let filterdPokemon = [];
let correctInput = false;


async function loadFilterdPokemons() {

    initFilterContainer();
    let urlLoad = 'https://pokeapi.co/api/v2/pokemon/';
    let response = await fetch(urlLoad);
    let responseAsJson = await response.json();
    let pokemonResults = responseAsJson['results'];
    inputValid(pokemonResults);
    clearInputFields();
}


async function inputValid(pokemonResults) {
    fillFilterdPokemon();
    let inputValue = document.getElementById('input').value;
    let inputValueBelow = document.getElementById('inputBelow').value;
    if (inputValue == '' && inputValueBelow == '') {
        mainPage();
    } else if (correctInput) {
        queryElseIf(pokemonResults);
    } else {
        mainPage();
    }
    correctInput = false;
}


async function queryElseIf(pokemonResults) {
    for (let j = 0; j < filterdPokemon.length; j++) {
        const filterdPokemonOfArray = filterdPokemon[j];
        for (let i = 0; i < pokemonResults.length; i++) {
            const pokemonName = pokemonResults[i]['name'];
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
            let responseServer = await fetch(url);
            let responseServerAsJson = await responseServer.json();
            showFilterdPokemons(responseServerAsJson, pokemonName, filterdPokemonOfArray, i);
        }
    }
}


function clearInputFields() {
    document.getElementById('input').value = '';
    document.getElementById('inputBelow').value = '';
}


function showFilterdPokemons(responseServerAsJson, pokemonName, filterdPokemonOfArray, i) {
    const pokemonImage = responseServerAsJson['sprites']['other']['official-artwork']['front_default'];
    if (filterdPokemonOfArray == pokemonName) {
        renderFilterdCard(pokemonName, pokemonImage, i);
        const pokemonTypesArray = responseServerAsJson['types'];
        for (let k = 0; k < pokemonTypesArray.length; k++) {
            const types = pokemonTypesArray[k];
            const name = types['type']['name'];
            colorOfFilterdPokemon(name, i, k);
        }
    }
}


function initFilterContainer() {
    document.getElementById('buttonBack').classList.remove('d-none');
    document.getElementById('buttonBackBelow').classList.remove('d-none');
    document.getElementById('filterdPokemonContainer').innerHTML = '';
    filterdPokemon = [];
    document.getElementById('filterdPokemon').classList.remove('d-none');
}


function fillFilterdPokemon() {
    let search = document.getElementById('input').value;
    let searchBelow = document.getElementById('inputBelow').value;
    search = search.toLowerCase();
    searchBelow = searchBelow.toLowerCase();
    for (let index = 0; index < pokemonArray.length; index++) {
        let element = pokemonArray[index];
        if (element.toLowerCase().includes(search) && element.toLowerCase().includes(searchBelow)) {
            correctInput = true;
            filterdPokemon.push(element);
        }
    }
}


function renderFilterdCard(pokemonName, pokemonImage, i) {
    document.getElementById('filterdPokemonContainer').innerHTML += /*html*/ `
                
    <div id="card${i}" onclick="showInfoCard('${pokemonName}')" class="card">
        <div id="cardAboveFilter${i}" class="cardAbove">
            <div class="nameOfPokemonContainer"><h2>${pokemonName}</h2></div>
        </div>
        <div id="cardBelowFilter${i}" class="cardBelow">
            <img class="pokemonImage" src="${pokemonImage}">
        </div>
    </div> `;
}


function colorOfFilterdPokemon(name, i, k) {
    if (name == 'grass') {
        grassFilter(name, i, k);
    } else if (name == 'poison') {
        poisonFilter(name, i, k);
    } else if (name == 'fire') {
        fireFilter(name, i, k);
    } else if (name == 'flying') {
        flyingFilter(name, i, k);
    } else if (name == 'water') {
        waterFilter(name, i, k);
    } else if (name == 'bug') {
        bugFilter(name, i, k);
    }
    else {
        normalFilter(name, i, k);
    }
}


function grassFilter(name, i, k) {
    document.getElementById('cardAboveFilter' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${k}" class="propertyContainer" style = "background-color: green">${name}</div>`;
}


function poisonFilter(name, i, k) {
    document.getElementById('cardAboveFilter' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${k}" class="propertyContainer" style = "background-color: blueviolet">${name}</div>`;
}


function fireFilter(name, i, k) {
    document.getElementById('cardAboveFilter' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${k}" class="propertyContainer" style = "background-color: red">${name}</div>`;
}


function waterFilter(name, i, k) {
    document.getElementById('cardAboveFilter' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${k}" class="propertyContainer" style = "background-color: blue">${name}</div>`;
}


function flyingFilter(name, i, k) {
    document.getElementById('cardAboveFilter' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${k}" class="propertyContainer" style = "background-color: lightblue">${name}</div>`;
}


function bugFilter(name, i, k) {
    document.getElementById('cardAboveFilter' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${k}" class="propertyContainer" style = "background-color: yellowgreen">${name}</div>`;
}


function normalFilter(name, i, k) {
    document.getElementById('cardAboveFilter' + i).innerHTML += /*html*/ `
    <div id="propertyContainer${k}" class="propertyContainer">${name}</div>`;
}









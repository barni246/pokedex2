
async function showInfoCard(pokemonName) {
    document.body.style = "overflow: hidden";
    document.getElementById('layover').classList.remove('d-none');
    let urlForInfoCard = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let responseInfoCard = await fetch(urlForInfoCard);
    let responseInfoCardAsJson = await responseInfoCard.json();
    renderInfoCard(responseInfoCardAsJson, pokemonName);
}


function renderInfoCard(responseInfoCardAsJson, pokemonName) {
    infoCardPokemonName(responseInfoCardAsJson, pokemonName);
    infoCardPokemonProperty(responseInfoCardAsJson);
    infoCardDaten(responseInfoCardAsJson);
    infoCardMoves(responseInfoCardAsJson);
    pokemonBall();
}


function infoCardPokemonName(responseInfoCardAsJson, pokemonName) {
    document.getElementById('infoCardAbove').innerHTML = '';
    let pokemonPictureInfoCard = responseInfoCardAsJson['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('infoCardAbove').innerHTML += /*html*/ `
     <div class="nameOfPokemon">${pokemonName}</div>
     <div class="InfoCardPokemonImage"><img src="${pokemonPictureInfoCard}"></div> `;
}


function infoCardPokemonProperty(responseInfoCardAsJson) {
    document.getElementById('infoCardProperty').innerHTML = '';
    for (let j = 0; j < responseInfoCardAsJson['types'].length; j++) {
        let types = responseInfoCardAsJson['types'][j];
        let propertyOfPokemon = types['type']['name'];
        document.getElementById('infoCardProperty').innerHTML += /*html*/ `
           <div>${propertyOfPokemon}</div> `;
    }
}


function infoCardDaten(responseInfoCardAsJson) {
    let pokemonPictureInfoCardBaseExperience = responseInfoCardAsJson['base_experience'];
    let pokemonPictureInfoCardHeight = responseInfoCardAsJson['height'];
    let pokemonPictureInfoCardWeight = responseInfoCardAsJson['weight'];
    document.getElementById('infoCardAbove').innerHTML += /*html*/ `
    <div>Base Experience: ${pokemonPictureInfoCardBaseExperience}</div>
    <div>Heigtht: ${pokemonPictureInfoCardHeight}</div>
    <div>Weight: ${pokemonPictureInfoCardWeight}</div> `;
}


function infoCardMoves(responseInfoCardAsJson) {
    document.getElementById('infoCardBelow').innerHTML = '';
    let moves = responseInfoCardAsJson['moves'];
    for (let j = 0; j < moves.length; j++) {
        let pokemonMoves = moves[j]['move']['name'];
        document.getElementById('infoCardBelow').innerHTML += /*html*/ `
                <div>${pokemonMoves},</div>`;
    }
}


function pokemonBall() {
    document.getElementById('infoCard').innerHTML += /*html*/ `
    <div class="infoCardBall"><img src="img/pokemon-ball.png"></div>`;
}


function stopPropagation(event) {
    event.stopPropagation();
}


function closeInfoCard() {
    document.getElementById('layover').classList.add('d-none');
    document.body.style = "overflow: visible  ";
}

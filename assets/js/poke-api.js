const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

async function buscaPokemon(numero){
    const endPoint = await fetch (`https://pokeapi.co/api/v2/pokemon/${numero}`)
    const dados = await endPoint.json()
    return dados
}

async function carregaPokemon(numero) {
    const hp = document.getElementById('hp'+numero);
    const attack = document.getElementById('attack'+numero);
    const def = document.getElementById('def'+numero);

    const dados = await buscaPokemon(numero);

    if(dados){
        hp.innerHTML = "HP:   "+dados['stats']['0']['base_stat'];
        attack.innerHTML = "Attack:   "+dados['stats']['1']['base_stat'];
        def.innerHTML = "Defense:   "+dados['stats']['2']['base_stat'];
    }
}
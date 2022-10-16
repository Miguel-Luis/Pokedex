let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let gallery = document.getElementById("gallery");
let next = document.getElementById("next");
let back = document.getElementById("back");

fetchApi("https://pokeapi.co/api/v2/pokemon", requestOptions, "getPokemons(data)");

function fetchApi(url, requestOptions, method) {
    fetch(url, requestOptions)
        .then(response => response.json())  // convertir a json
        .then(data => eval(method))    //imprimir los datos en la consola
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
}

function getPokemons(pokemons) {
    next.setAttribute("title", pokemons.next);
    back.setAttribute("title", pokemons.previous);

    for (let pokemon of pokemons.results) {
        fetchApi(pokemon.url, requestOptions, "createdPokemon(data)");
    }
}

function createdPokemon(pokemon) {
    let img = pokemon.sprites.other.dream_world.front_default;

    let pokemonInfo = {
        image_url: img == null ? pokemon.sprites.other.home.front_default : img,
        name: pokemon.name,
        type: pokemon.types[0].type.name
    }

    skills = getStats(pokemon.stats);

    gallery.innerHTML += `<article onclick="getpokemonDetail('${pokemonInfo.image_url}', '${pokemonInfo.name}', '${skills}')" class="card-pokemon">
                            <div class="card-pokemon__img">
                                <img src="${pokemonInfo.image_url}" alt="images">
                            </div>
                            <div class="card-pokemon_content">
                                <h2 class="card-pokemon__title">${pokemonInfo.name}<br><span class="card-pokemon__text">Type: ${pokemonInfo.type}</span></h2>
                            </div>
                        </article>`;
}

function getpokemonDetail(imageUrl, name, skills) {
    Swal.fire({
        html:
            `<h1><b>${name}</b></h1>
            ${skills}`,
        imageUrl: imageUrl,
        width: 600,
        imageHeight: 500,
        background: '#212121',
        imageAlt: 'A tall image'
    });
}

function update(btn) {
    if(eval(btn + ".title" != null)) {
        gallery.innerHTML = "";
    
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    
        eval("fetchApi(" + btn + ".title, requestOptions, 'getPokemons(data)');");
    }
}

function getStats(stats) {
    let skills = "";

    for (stat of stats) {
        skills += `<p><b>${stat.stat.name}:</b> ${stat.base_stat}</p>`;
    }

    return skills;
}
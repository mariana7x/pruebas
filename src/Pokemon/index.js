const cardsContainer = document.getElementById("cardsContainer")
const boton = document.getElementById("boton")
const load = document.getElementById("load")
let offset = 0
let limit = 20

boton.addEventListener("click", () => {
    load.classList.remove("hidden")
    limit = 20
    offset += 20
    llamar(offset, limit)
})

const llamar = ((offset, limit) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((next) => next.json())
        .then((siguientespoke) => {
            pokemons(siguientespoke.results)
            load.classList.add("hidden")
        })
        .catch(error => {
            console.error(error)
        })
})

const pokemon = ((id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => response.json())
        .then(datapokemon => {
            return datapokemon
        })
        .catch(error => {
            console.error(error)
        })
})

const pokemons = ((todospokes) => {
    Promise.all(todospokes.map((el) => pokemon(el.name))).then((data) => {
        data.sort((a, b) => {
            return a - b;
        })
        data.forEach(poke => {
            cards(poke)
        })
    })
})


llamar(offset, limit)

const cards = ((pokemon) => {


    const card = document.createElement("div")
    const imgContainer = document.createElement("div")
    const name = document.createElement("p")
    const id = document.createElement("p")
    const img = document.createElement("img")
    img.src = pokemon.sprites.front_default
    name.innerText = `Name: ${pokemon.name}`
    id.innerText = `ID: ${pokemon.id.toString()}`
    card.appendChild(id)
    card.appendChild(name)
    imgContainer.appendChild(img)
    card.appendChild(imgContainer)
    card.classList.add("card")
    cardsContainer.appendChild(card)

})


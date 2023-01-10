const cardsContainer = document.getElementById("cardsContainer")
const boton = document.getElementById("boton")
const load = document.getElementById("load")
let page = 1

boton.addEventListener("click", () => {
    load.classList.remove("hidden")
    page += 1
    personajes(page)
})


const llamarApi = (async (page) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    return response.json()
})
const personajes = (async (page) => {
    const rymdata = await llamarApi(page)
    load.classList.add("hidden")
    rymdata.results.forEach(personaje => {
        cards(personaje)
    });

})
personajes()

const cards = ((personaje) => {

    const card = document.createElement("div")
    const imgContainer = document.createElement("div")
    const name = document.createElement("p")
    const id = document.createElement("p")
    const img = document.createElement("img")
    img.src = personaje.image
    name.innerText = `Name: ${personaje.name}`
    id.innerText = `ID: ${personaje.id.toString()}`
    card.appendChild(id)
    card.appendChild(name)
    imgContainer.appendChild(img)
    card.appendChild(imgContainer)
    card.classList.add("card")
    cardsContainer.appendChild(card)

})



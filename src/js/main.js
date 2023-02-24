'use strict';

const listMargarita = document.querySelector('.js-list-margarita');
const inputUser =document.querySelector('.inputuser');
const inputSearch = document.querySelector('.js-search');
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
//variable que guarda la información, datos de las margaritas
let listMargaritaData = [];

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    listMargaritaData = data.drinks;
    renderMargarita(listMargaritaData);

})

//pintar un elemento de la lista
function renderMargarita(drinks) {
  
  for (const drink of drinks)
    listMargarita.innerHTML += `<li>
     <h2 class="title">${drink.strDrink}</h2>
     <img src=${drink.strDrinkThumb}>
  
</li>`;
}

function hadleClick(ev) {
  const inputUserValue = (inputUser.value);
  
}

inputSearch.addEventListener('click', hadleClick);

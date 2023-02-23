'use strict';

const listMargarita = document.querySelector('.js-list-margarita');
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
//variable que guarda la información, datos de las margaritas
let listMargaritaData = [];

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    listMargaritaData = data.drinks;

})

//pintar un elemento de la lista
function renderMargarita(drink) {
    listMargarita.innerHTML = `<li>
<img${drinks.strDrinkThumb}>
<h2>${drinks.strDrink}</h2>
</li>`;
}

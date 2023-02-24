'use strict';

const listMargarita = document.querySelector('.js-list-margarita');
const inputUser =document.querySelector('.inputuser');
const inputSearch = document.querySelector('.js-search');
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
//variable que guarda la información
let listMargaritaData = [];
//variable del resto de cocktails
let listCocktail = [];

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    listMargaritaData = data.drinks;
    renderMargarita(listMargaritaData);

})

//pintar un elemento de la lista
//Algunas de los cócteles que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen de relleno. Podemos crear una imagen de relleno con el servicio de placeholder.com donde en la propia URL indicamos el tamaño, colores, texto:
function renderMargarita(drinks) {
  
  for (const drink of drinks)
    if (drink.strDrinkThumb) {
    listMargarita.innerHTML += `<li>
     <h2 class="title">${drink.strDrink}</h2>
     <img src=${drink.strDrinkThumb}>
</li>`;
}
 else  {
    listMargarita.innerHTML += `<li>
     <h2 class="title">${drink.strDrink}</h2>
     <img src=https://via.placeholder.com/210x295/ffffff/666666/?text=TV>
     </li>`;
  }
}
function hadleClickSearch(ev) {
  ev.preventDefault();
  const inputUserValue = inputUser.value.toLowerCase(); //para que nos pille mayúsculas y miniscúlas
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputUserValue}`) //aqui se añade a la url el input que ponga el usuario
  .then(response => response.json())
  .then(data => {
    console.log(data);
    //añade la lista con los datos de los cocktails
    listCocktail = data.drinks;
    //vaciate las margaritas predeterminadas
    listMargarita.innerHTML='';
    renderMargarita(listCocktail);

})
}

inputSearch.addEventListener('click', hadleClickSearch);

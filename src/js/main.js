'use strict';

const listDrinks = document.querySelector('.js-list-drinks');
const inputUser = document.querySelector('.inputuser');
const inputSearch = document.querySelector('.js-search');
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
//variable que guarda la información
let listDrinksData = [];
//variable del resto de cocktails
// let listCocktail = [];
//guardar la lista de favoritos 
let listFavoritesData = [];
let listFavorites = document.querySelector('.js-list-favorites');

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    listDrinksData = data.drinks;
    renderDrinks(listDrinksData);

})

//pintar un elemento de la lista
//Algunas de los cócteles que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen de relleno. Podemos crear una imagen de relleno con el servicio de placeholder.com donde en la propia URL indicamos el tamaño, colores, texto:
function renderDrinks(drinks) {
  
  for (const drink of drinks) {
    if (drink.strDrinkThumb) {
    listDrinks.innerHTML += `<li class="js-pack" id="${drink.idDrink}">
     <h2 class="title">${drink.strDrink}</h2>
     <img src=${drink.strDrinkThumb}>
</li>`;
}
 else  {
    listDrinks.innerHTML += `<li id="${drink.idDrink}">
     <h2 class="title">${drink.strDrink}</h2>
     <img src=https://via.placeholder.com/210x295/ffffff/666666/?text=TV>
     </li>`;
  }
 }
 //para ejecutar la función click del pack
  addEventDrink();
}

//boton de búsqueda
function hadleClickSearch(ev) {
  ev.preventDefault();
  const inputUserValue = inputUser.value.toLowerCase(); //para que nos pille mayúsculas y miniscúlas
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputUserValue}`) //aqui se añade a la url el input que ponga el usuario
  .then(response => response.json())
  .then(data => {
    console.log(data);
    //añade la lista con los datos de los cocktails
    listDrinksData = data.drinks;
    //vaciate las margaritas predeterminadas
    listDrinks.innerHTML='';
    renderDrinks(listDrinksData);

})
}


//llamarla fuera para hacerle click al pack 
function handleClickPack(ev) {
  console.log('funciona')
  const id = ev.currentTarget.id
  ev.currentTarget.classList.toggle('selected')
  //si el id es igual al elemento seleccionado, cogelo (find)


}

function addEventDrink() {
  const pack = document.querySelectorAll('.js-pack');
  for (const li of pack)
  li.addEventListener('click', handleClickPack)

  
}

inputSearch.addEventListener('click', hadleClickSearch);

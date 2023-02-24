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
const listFavorites = document.querySelector('.js-list-favorites');

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    listDrinksData = data.drinks; //palabra de nuestro array
    renderDrinks(listDrinksData);

})

//pintar un elemento de la lista
//Algunas de los cócteles que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen de relleno. Podemos crear una imagen de relleno con el servicio de placeholder.com donde en la propia URL indicamos el tamaño, colores, texto:
function renderDrinks(drinks) {
  
  for (const drink of drinks) {
    if (drink.strDrinkThumb) {
    listDrinks.innerHTML += `<li class="js-pack" id="${drink.idDrink}">
     <h2 class="title">${drink.strDrink}</h2>
     <img src=${drink.strDrinkThumb} class="image">
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
    //vaciate las bebidas
    listDrinks.innerHTML='';
    renderDrinks(listDrinksData);
    renderFavorites(listFavorites);
  
})
  
}


//llamarla fuera para hacerle click al pack 
function handleClickPack(ev) {
  console.log('funciona')
  const idSelected = ev.currentTarget.id
  const drinkSelected = listDrinksData.find(item => item.idDrink === idSelected);
  //busca la posición
  const drinkIndex = listFavoritesData.findIndex(item => item.idDrink === idSelected)
  console.log(drinkIndex); //le doy a click -1
  if(drinkIndex === -1) {
    //cuando lo seleccione lo añado a mi lista de favoritos
    ev.currentTarget.classList.add('selected')
    //selecciono y lo añado en el otro lado 
    listFavoritesData.push(drinkSelected)
 } else {
    ev.currentTarget.classList.remove('selected')
    listDrinksData.splice(drinkIndex, 1) //elimina el elemento según la posición, se elimina así mismo
 }
  renderFavorites(listFavoritesData);
}

//clicas el pack y la añades en favoritos 
function renderFavorites(drinksFav) { 
  listFavorites.innerHTML= ''; //encuentrame la nueva búsqueda
  for (const drinkFav of drinksFav) { 
  listFavorites.innerHTML += `<li class="js-pack" id="${drinkFav.idDrink}">
     <h2 class="title">${drinkFav.strDrink}</h2>
     <img src=${drinkFav.strDrinkThumb}>
</li>`;
}
}



function addEventDrink() {
  const pack = document.querySelectorAll('.js-pack');
  for (const li of pack)
  li.addEventListener('click', handleClickPack)

  
}

inputSearch.addEventListener('click', hadleClickSearch);

'use strict';

const listDrinks = document.querySelector('.js-list-drinks');
const inputUser = document.querySelector('.js-inputuser');
const inputSearch = document.querySelector('.js-search');
const inputReset = document.querySelector('.js-reset');
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
let listDrinksData = [];
let listFavoritesData = [];
const listFavorites = document.querySelector('.js-list-favorites');

//obtener los datos de las margaritas
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    listDrinksData = data.drinks;
    renderDrinks(listDrinksData);
  });

//Obtenemos los datos de favoritos para mostrarlos en el navegador cuando la usuaria entra o refresca la página.
function getItemFavorites() {
  const ilFavorites = JSON.parse(localStorage.getItem('pack'));
  if (ilFavorites) {
    listFavoritesData = ilFavorites;
    renderFavorites(listFavoritesData);
  }
}
getItemFavorites();

//pintar un elemento de la lista
//Cócteles que devuelve el API no tienen imagen
function renderDrinks(drinks) {
  for (const drink of drinks) {
    if (drink.strDrinkThumb) {
      listDrinks.innerHTML += `<li class="js-pack" id="${drink.idDrink}">
     <h2 class="title">${drink.strDrink}</h2>
     <img src=${drink.strDrinkThumb} class="image">
     
    
</li>`;
    } else {
      listDrinks.innerHTML += `<li id="${drink.idDrink}>
     <h2 class="title">${drink.strDrink}</h2>
     <img src=https://via.placeholder.com/210x295/ffffff/666666/?text=TV class="image">
     </li>`;
    }
  }
  addEventDrink();
}

//boton de búsqueda
function hadleClickSearch(ev) {
  ev.preventDefault();
  const inputUserValue = inputUser.value.toLowerCase();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputUserValue}`)
    .then((response) => response.json())
    .then((data) => {
      listDrinksData = data.drinks;
      listDrinks.innerHTML = '';
      renderDrinks(listDrinksData);
    });
}

//selecciona la imagen y el titulo
function handleClickPack(ev) {
  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  const drinkSelected = listDrinksData.find(item => item.idDrink === idSelected);
  console.log(drinkSelected)
  const drinkIndex = listFavoritesData.findIndex(item => item.idDrink === idSelected);

  if (drinkIndex === -1) {
    listFavoritesData.push(drinkSelected);
  } else {
    listFavoritesData.splice(drinkIndex, 1);
  }
  renderFavorites(listFavoritesData);
  localStorage.setItem('pack', JSON.stringify(listFavoritesData));
}

//clicas el pack y la añades en favoritos
function renderFavorites(drinksFav) {
  listFavorites.innerHTML = '';
  for (const drinkFav of drinksFav) {
    listFavorites.innerHTML += `<li class="js-pack' id="${drinkFav.idDrink}">
     <h2 class="title">${drinkFav.strDrink}</h2>
     <img src=${drinkFav.strDrinkThumb} class="image">
</li>`;
  }
}

//incluye los li en un pack
function addEventDrink() {
  const pack = document.querySelectorAll('.js-pack');
  for (const li of pack) li.addEventListener('click', handleClickPack);
}

//boton de reseteo
function hadleClickReset(ev) {
  ev.preventDefault();
  listFavorites.innerHTML= '';
  localStorage.removeItem('pack');
  location.reload();
}


inputSearch.addEventListener('click', hadleClickSearch);
inputReset.addEventListener('click', hadleClickReset);

'use strict';

const listDrinks = document.querySelector('.js-list-drinks');
const inputUser = document.querySelector('.js-inputuser');
const inputSearch = document.querySelector('.js-search');
const inputReset = document.querySelector('.js-reset');
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
let listDrinksData = [];
let listFavoritesData = [];
const listFavorites = document.querySelector('.js-list-favorites');


fetch(url)
  .then((response) => response.json())
  .then((data) => {
    listDrinksData = data.drinks;
    renderDrinks(listDrinksData);
  });

//con el getItem obtenemos los datos de favoritos para mostrarlos en el navegador cuando la usuaria entra o refresca la página.
function getItemFavorites() {
  //cuando queremos obtener los datos queremos utilizar los mismos tipos de datos(string,número,array, objetos....)
  const ilFavorites = JSON.parse(localStorage.getItem('pack'));
  if (ilFavorites) {
    listFavoritesData = ilFavorites;
    //pintame mi lista de favoritos que ya está convertida con el parse
    renderFavorites(listFavoritesData);
    
  }
}
//la estoy llamando para que obtenga los datos del localStorage
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
  //para ejecutar la función click del pack
  addEventDrink();
}

//boton de búsqueda
function hadleClickSearch(ev) {
  ev.preventDefault();
  const inputUserValue = inputUser.value.toLowerCase();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputUserValue}`
  ) //aqui se añade a la url el input que ponga el usuario
    .then((response) => response.json())
    .then((data) => {
      //añade la lista con los datos de los cocktails
      listDrinksData = data.drinks;
      //vacia mi listado y me añade el que he buscado
      listDrinks.innerHTML = '';
      renderDrinks(listDrinksData);
    });
}

//llamarla fuera para hacerle click al pack
function handleClickPack(ev) {
  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  const drinkSelected = listDrinksData.find(item => item.idDrink === idSelected);
  //busca la posición
  const drinkIndex = listFavoritesData.findIndex(item => item.idDrink === idSelected);
  console.log(drinkIndex);
  if (drinkIndex === -1) {
    //selecciono y lo añado abajo del todo de favorites
    listFavoritesData.push(drinkSelected);
  } else {
    listFavoritesData.splice(drinkIndex, 1); //solo eliminar el elemento clicado
  }
  renderFavorites(listFavoritesData);
  localStorage.setItem('pack', JSON.stringify(listFavoritesData)); //con setItem añadimos,palabra clave:pack y el valor: listFavoritesData
}

//clicas el pack y la añades en favoritos
function renderFavorites(drinksFav) {
  listFavorites.innerHTML = ''; //encuentrame la nueva búsqueda
  for (const drinkFav of drinksFav) {
    listFavorites.innerHTML += `<li class="js-pack' id="${drinkFav.idDrink}">
     <h2 class="title">${drinkFav.strDrink}</h2>
     <img src=${drinkFav.strDrinkThumb} class="image">
</li>`;
  }
}

//incluye la imagen y el titulo
function addEventDrink() {
  const pack = document.querySelectorAll('.js-pack');
  for (const li of pack) li.addEventListener('click', handleClickPack);
}

//boton de reseteo
function hadleClickReset(ev) {
  ev.preventDefault();
  listFavorites.innerHTML= '';

}

inputSearch.addEventListener('click', hadleClickSearch);
inputReset.addEventListener('click', hadleClickReset);

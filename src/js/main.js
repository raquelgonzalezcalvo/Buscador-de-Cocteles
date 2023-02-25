'use strict';

const listDrinks = document.querySelector('.js-list-drinks');
const inputUser = document.querySelector('.inputuser');
const inputSearch = document.querySelector('.js-search');
const url =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
//variable global de las de las bebidas, guarda los datos
let listDrinksData = [];
//guardar la lista de favoritos
let listFavoritesData = [];
const listFavorites = document.querySelector('.js-list-favorites');

//un fetch para obtener los datos, cuándo se carga la página aparecen las margaritas
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
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
    console.log('hola');
  }
}
//la estoy llamando para que obtenga los datos del localStorage
getItemFavorites();

//pintar un elemento de la lista
//Algunas de los cócteles que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen de relleno. Podemos crear una imagen de relleno con el servicio de placeholder.com donde en la propia URL indicamos el tamaño, colores, texto:
function renderDrinks(drinks) {
  for (const drink of drinks) {
    if (drink.strDrinkThumb) {
      listDrinks.innerHTML += `<li class="js-pack" id="${drink.idDrink}">
     <h2 class="title">${drink.strDrink}</h2>
     <img src=${drink.strDrinkThumb} class="image">
</li>`;
    } else {
      listDrinks.innerHTML += `<li id="${drink.idDrink}">
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
  const inputUserValue = inputUser.value.toLowerCase(); //para que nos pille mayúsculas y miniscúlas
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputUserValue}`
  ) //aqui se añade a la url el input que ponga el usuario
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //añade la lista con los datos de los cocktails
      listDrinksData = data.drinks;
      //vaciate las bebidas
      listDrinks.innerHTML = '';
      renderDrinks(listDrinksData);
      renderFavorites(listFavorites);
    });
}

//llamarla fuera para hacerle click al pack
function handleClickPack(ev) {
  console.log('funciona');
  const idSelected = ev.currentTarget.id;

  const drinkSelected = listDrinksData.find(
    (item) => item.idDrink === idSelected
  );
  //busca la posición
  const drinkIndex = listFavoritesData.findIndex(
    (item) => item.idDrink === idSelected
  );
  console.log(drinkIndex); //le doy a click -1
  if (drinkIndex === -1) {
    //cuando lo seleccione lo añado a mi lista de favoritos
    ev.currentTarget.classList.add('selected');
    //selecciono y lo añado en el otro lado
    listFavoritesData.push(drinkSelected);
  } else {
    ev.currentTarget.classList.remove('selected');
    listFavoritesData.splice(drinkIndex, 1); //elimina el elemento según la posición, se elimina así mismo
  }
  renderFavorites(listFavoritesData);
  //con setItem añadimos,palabra clave:pack y el valor: listFavoritesData
  localStorage.setItem('pack', JSON.stringify(listFavoritesData));
}

//clicas el pack y la añades en favoritos
function renderFavorites(drinksFav) {
  listFavorites.innerHTML = ''; //encuentrame la nueva búsqueda
  for (const drinkFav of drinksFav) {
    listFavorites.innerHTML += `<li class="js-pack" id="${drinkFav.idDrink}">
     <h2 class="title">${drinkFav.strDrink}</h2>
     <img src=${drinkFav.strDrinkThumb} class="image">
</li>`;
  }
}

function addEventDrink() {
  const pack = document.querySelectorAll('.js-pack');
  for (const li of pack) li.addEventListener('click', handleClickPack);
}

inputSearch.addEventListener('click', hadleClickSearch);

import React, {useState, useEffect} from 'react';
import './App.css';
import Drink from './components/Drink';
import {v4 as uuidv4} from 'uuid';
import Favorites from './components/Favorites';
import FavoritesCarousel from './components/FavoritesCarousel';

const LOCAL_STORAGE_KEY = 'mixr.prevDrinks'
const LOCAL_STORAGE_KEY_FAVORITES = 'mixr.favorites'

function App() {
  const storedFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FAVORITES)) || [];

  const [drink, setDrink] = useState([]);
  const [favoriteDrinks, setFavoriteDrinks] = useState(storedFavorites);

  // useEffect(() => {
  //   const storedFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FAVORITES));
  //   if(storedFavorites){
  //     setFavoriteDrinks(storedFavorites)
  //   } else {
  //     setFavoriteDrinks([]);
  //   }
  // }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FAVORITES, JSON.stringify(favoriteDrinks))
  }, [favoriteDrinks])


  function getDrink(){
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    fetch(url, {method: 'get'})
      .then(res => (res.json()))
      .then(data => {
        if(data.drinks[0].strAlcoholic != 'Alcoholic'){getDrink()}
        setDrink(data.drinks[0]);
        return data.drinks[0];
      })
      .catch(err => console.log(err))
  }

  function addFavorite(){
    let tempFavorites = [];
    if(favoriteDrinks !== []){
    tempFavorites = [...favoriteDrinks];
    } else {
    tempFavorites = [drink];
    }

    if(!tempFavorites.includes(drink)){tempFavorites.push(drink)};
    // console.log(tempFavorites);
    if(tempFavorites != favoriteDrinks){setFavoriteDrinks(tempFavorites)};
  }

  function deleteFavorite(drinkId){
    let tempFavorites = [...favoriteDrinks];
    tempFavorites = tempFavorites.filter(drink => Number(drink.idDrink) != drinkId);
    {setFavoriteDrinks(tempFavorites)};
  }

  function viewFavorite(drinkId) {
    let tempFavorites = [...favoriteDrinks];
    tempFavorites = tempFavorites.filter(drink => drink.idDrink == drinkId);
    {setDrink(tempFavorites.pop())};
  }


  // console.log(favoriteDrinks);

  return (
    <div className="App">
      <Drink drink={drink} setDrink={setDrink} getDrink={getDrink} addFavorite={addFavorite}/>
      
      <FavoritesCarousel favoriteDrinks={favoriteDrinks} deleteFavorite={deleteFavorite} viewFavorite={viewFavorite}/>
    </div>
  );

}

export default App;

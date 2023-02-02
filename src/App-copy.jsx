import React, {useState, useEffect} from 'react';
import './App.css';
import Drink from './components/Drink';
import {v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY = 'mixr.prevDrinks'
const LOCAL_STORAGE_KEY_FAVORITES = 'mixr.favorites'

function App() {
  useEffect(() => {
    const storedDrinks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedDrinks){setPrevDrinks(storedDrinks)}
  }, [])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FAVORITES));
    if(storedFavorites){setFavoriteDrinks(storedFavorites)};
  }, [])

  


  const [prevDrinks, setPrevDrinks] = useState([]);
  const [drink, setDrink] = useState([]);
  const [state, setState] = useState([]);
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FAVORITES, JSON.stringify(favoriteDrinks))
  }, [favoriteDrinks])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prevDrinks))
  }, [prevDrinks])

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
    console.log(favoriteDrinks);
  }

  return (
    <div className="App">
      <Drink drink={drink} setDrink={setDrink} getDrink={getDrink} addFavorite={addFavorite}/>
    </div>
  );
}

export default App;

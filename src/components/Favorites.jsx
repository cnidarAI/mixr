import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import { FixedSizeList as List} from "react-window";

export default function Favorites(props){
    const { favoriteDrinks, deleteFavorite, viewFavorite } = props;

    function createFavoriteDiv(drink){
        // console.log(drink.idDrink);
        // let activeInCarousel = (index==0)?'favorite carousel-item active':'favorite carousel-item';
        return(
            // <div key={drink.idDrink}>{drink.idDrink}</div>
        // <div key={drink.idDrink} className={activeInCarousel}>
        <article key={drink.idDrink} className="favorite">
            <h4>{drink.strDrink}</h4>
            <img className="" src={`${drink.strDrinkThumb}`} alt={`${drink.strDrink}`} ></img>
            <button onClick={() => viewFavorite(drink.idDrink)}>View Drink</button>
            <button onClick={() => deleteFavorite(drink.idDrink)}>Delete from Favorites</button>
        </article>
        )
    }

    let drinksArr = [...favoriteDrinks];
    
    
    return(
        <>
            <h3>Favorites:</h3>
            
            <div className="favorites carousel">
                <div className="reel" >
                    {drinksArr.map((drink, index) => {
                        return(createFavoriteDiv(drink, index));
                    })}
                </div>
            </div>
        </>
    )
}

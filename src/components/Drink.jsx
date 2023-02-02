import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY_FAVORITES = 'mixr.favorites';

export default function Drink(props){
    const { drink, getDrink, addFavorite } = props;
    const [drinkName, setDrinkName] = useState("");
    const [thumbnailSrc, setThumbnailSrc] = useState("");
    const [ingredientsArr, setIngredientsArr] = useState([]);
    const [measurementsArr, setMeasurementsArr] = useState([]);
    const [instructions, setInstructions] = useState()
    
  
    useEffect(()=>{
        setDrinkName(drink.strDrink);
        setThumbnailSrc(drink.strDrinkThumb);
        let ingredients = Object.entries(drink).filter(x => x[0].includes('Ingredient'));
        let tempIngredientsArr = ingredients.map(x => x[1]).filter(ingredient => ingredient);
        setIngredientsArr(tempIngredientsArr);

        let measurements = Object.entries(drink).filter(x => x[0].includes('Measure'));
        let tempMeasurementsArr = measurements.map(x => x[1]).filter(measurement => measurement);
        setMeasurementsArr(tempMeasurementsArr)
        setInstructions(drink.strInstructions)
    },[drink]);

    async function handleGetDrink(){
        const newDrink = await getDrink();
    }

    function handleAddFavorite(){
        addFavorite();
    }


    return(
        <>
            <button onClick={handleGetDrink}>Get new drink</button>
            <h1 id='drinkName'>{drinkName}</h1>
            {(thumbnailSrc)?<img id='drinkThumb' alt='' src={thumbnailSrc} />:<></>}
            {(ingredientsArr.length>0)?<h3>Ingredients:</h3>:<h3></h3>}
            <ul>
                {ingredientsArr.map((ing, i) => <li key={uuidv4()}>
                    {(measurementsArr[i])?measurementsArr[i]+" "+ing:ing}
                </li>)}
            </ul>
            <p>{instructions}</p>
            <button onClick={()=>handleAddFavorite()}>Add to Favorites</button>
        </>
    )
}
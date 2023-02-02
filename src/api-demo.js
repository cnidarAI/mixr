async function getRandomDrink(){
 
    let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            if(data.drinks[0].strAlcoholic != 'Alcoholic') getRandomDrink();
            // console.log(data.drinks);
            let cocktailName = data.drinks[0].strDrink;
            // console.log(cocktailName);
            // document.getElementById('cocktailName').innerText = cocktailName;
            let cocktailImgSrc = data.drinks[0].strDrinkThumb
            // document.getElementById('cocktailImg').setAttribute('src', cocktailImgSrc);


            let ingredients = Object.entries(data.drinks[0]).filter(x => x[0].includes('Ingredient'));
            ingredients = ingredients.filter(x => x[1]);
            let ingredientsArr = ingredients.map(x => x[1]);
            // console.log(ingredients);
            console.log(ingredientsArr);
            // let ingredientsList = document.getElementById('ingredients');
            // ingredientsArr.forEach(ingredient => {
            //     let ingredientItem = ingredientsList.appendChild(document.createElement('li'));
            //     ingredientItem.innerText = ingredient;
            // });

            console.log(data)
            return(data.drinks[0]);
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

export default getRandomDrink;

// getRandomDrink()
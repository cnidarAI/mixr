import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function FavoritesCarousel(props){
    const { favoriteDrinks, viewFavorite, deleteFavorite } = props;

    function createFavoriteCarouselItem(drink){
    return(
        <Carousel.Item key={drink.idDrink} className='favorite'>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <button  onClick={() => viewFavorite(drink.idDrink)}>View Drink</button>
                    </Col>
                    {/* <Col></Col> */}
                    <Col>
                        <button onClick={() => deleteFavorite(drink.idDrink)}>Delete from Favorites</button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <img
                src={`${drink.strDrinkThumb}`}
                alt={`${drink.strDrink}`}
            />
            {/* <Carousel.Caption>
                <h3>{drink.strDrink}</h3>
            </Carousel.Caption> */}
            <h3>{drink.strDrink}</h3>
            {/* <button onClick={() => viewFavorite(drink.idDrink)}>View Drink</button>
            <button onClick={() => deleteFavorite(drink.idDrink)}>Delete from Favorites</button> */}
        </Carousel.Item>
    )
    }

    let drinksArr = [...favoriteDrinks];

return (
    <Carousel className='favorites'>
        {drinksArr.map(drink => {
            return(
                createFavoriteCarouselItem(drink)
            )}
        )}
    </Carousel>
    );
}

export default FavoritesCarousel;
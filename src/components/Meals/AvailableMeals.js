import React,{useState,useEffect} from "react";
import classes from './Availablemeals.module.css';
import Card from '../UI/Card';
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [loadedMeals, setLoadedMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [httpError, setHttpError] = useState(null)
    useEffect(() => {
        setLoading(true);
        const fetchMeals = async () => {
            const response = await fetch('https://react-http-cb4db-default-rtdb.firebaseio.com/meals.json');
            const responseData = await response.json();

            if(!response.ok){
                throw new Error('error aanne');
            }

            const meals = [];
            for(const key in responseData){
                meals.push({
                    id : responseData[key].id,
                    name : responseData[key].name,
                    description : responseData[key].description,
                    price : responseData[key].price
                })
            }
            setLoadedMeals(meals);
            setLoading(false);
        }
        fetchMeals().catch((error) => {
            setLoading(false);
            setHttpError('Error occured');
        });
    },[])
    if(loading){
        return(
            <section className={classes.mealsLoading}>
                <p>Loading</p>
            </section>
        )
    }
    if(httpError){
        return(
            <section className={classes.mealsError}>
                <p>{httpError}</p>
            </section>
        )
    }
    const mealsList = loadedMeals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>

        </section>
    )

}

export default AvailableMeals;
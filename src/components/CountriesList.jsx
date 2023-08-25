import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

export default function CountriesList() {
    const {cities, isLoading} = useCities();
if(isLoading)
{
    return (<Spinner></Spinner>)
}
const countries = cities.reduce((array , city)=> 
{
    console.log(city);
    if(!array.map((e)=>e.country).includes(city.country))   
{
         return [...array , {country:city.country}];
}
else
{
    return array;
}
}
, []);
    return (
        <ul className={styles.countryList}>
          {countries.map((x)=>{
            return(<CountryItem x = {x} key = {x.id}></CountryItem>)
          })}   
        </ul>
      )
}


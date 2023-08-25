import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import { useCities } from "../contexts/CitiesContext";

export default function CityList() {
  const {cities , isLoading}=  useCities();
if(isLoading)
{
    return (<Spinner></Spinner>)
}
    return (
        <ul className={styles.CityList}>
          {cities.map((x)=>{
            return(<CityItem x = {x} key = {x.id}></CityItem>)
          })}   
        </ul>
      )
}



import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import styles2 from "./Button.module.css";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  
  const [searchParams , setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const {createCity} = useCities();

  useEffect(function(){
    async function getCityData()
    {
      try{
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
          if(res.ok)
          {
            const data = await res.json();
            setCityName(data.city|| data.locality || "");
          }
      }
      catch{

      }
    }
    getCityData();
  },[lat,lng]);

  function handleSubmit(e)
  {
e.preventDefault();
if(!cityName)
{
  return ;

}
const newCity = {
  cityName,
  country,
  date,
  notes,
  position:{lat,lng},
}
createCity(newCity);
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button className={[styles2.primary , styles2.btn].join(" ")}>Add</button>
        <button className={[styles2.back , styles2.btn].join(" ")} onClick={(e)=>{
          e.preventDefault();
          navigate(-1)}}>&larr; Back</button>
      </div>
    </form>
  );
}

export default Form;

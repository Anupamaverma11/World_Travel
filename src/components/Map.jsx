import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import {useCities} from "../contexts/CitiesContext";
import { useEffect, useState } from "react";

export default function Map() {

  const [searchParams , setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [position,setPosition] = useState([51.505, -0.09]);
  const {cities} = useCities();
  const navigate = useNavigate();


  useEffect(function(){
    if(lat&&lng) setPosition([lat,lng]);
  } , [lat , lng])
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
{cities.map((city)=>{
      <Marker position={[city.position.lat , city.position.lng]} key = {city.id}>
      <Popup>
        <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
    </Marker>
})}
<ChangeCenter position={position}></ChangeCenter>
<DetectClick></DetectClick>
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position})
{
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick()
{
  const navigate = useNavigate();
  useMapEvents({
    click: e => { 
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)},
  })
}
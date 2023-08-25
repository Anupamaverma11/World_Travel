import { createContext, useContext, useEffect, useReducer, useState } from "react";

const context = createContext();

const initialState = {
  cities:[],
  isLoading:false,
  CurrentCity:{},
  error:""
};

function reducer(state , action)
{
  switch(action.type)
  {
    case "loading":
      return {...state , isLoading:true};
     case "cities/loaded":
       return {...state , isLoading:false,cities:action.payload}
      case "cities/created":
        return {...state , }
      case "rejected":
        return {...state,isLoading:false , error:action.payload}
      case "city/loaded":
        return {...state , isLoading:false , CurrentCity:action.payload}
      case "cities/created":
        return {...state , isLoading:false , cities:[...state.cities , action.payload]}
      case "cities/deleted":
        return {...state , isLoading:false , cities:state.cities.filter((city)=>city.id!==action.payload)}

  }
}

function CitiesProvider({children})
{

  const [{cities,isLoading,CurrentCity} , dispatch] = useReducer(reducer, initialState);
    // const [cities , setCities] = useState([]);
    // const [isLoading , setIsLoading] = useState(false);
    // const [CurrentCity , setCurrentCity] = useState({});

    useEffect(function(){
      async function getData()
      {
        dispatch({type:"loading"})
        const res = await fetch("http://localhost:8000/cities");
        if(res.ok)
        {
          const data = await res.json();
          console.log(data);
          dispatch({type:"cities/loaded", payload:data})
        }
        else
        {
          dispatch({type:"rejected" , payload:"There was an error"});
        }
      }
      getData();
    } , [])

    async function getCity(id)
    {
        // setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        if(res.ok)
        {
          const data = await res.json();
          console.log(data);
          dispatch({type:"city/loaded" , payload:data});
        }
        else
        {
          dispatch({type:"city/loaded" , payload:"there was an error loading data"});
        } 
    }
    async function createCity(newCity)
    {
        // setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities` , {
          method:'POST',
          body:JSON.stringify(newCity),
          headers:{
            "Content-type":"application/json"
          }
        });
        if(res.ok)
        {
          const data = await res.json();
          dispatch({type:"cities/created" , payload:data})
        }
        else
        {
          alert("there was an error loading data");
        } 
    }
    async function deleteCity(id)
    {
        // setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities/${id}` , {
          method:'DELETE'
        });
        if(res.ok)
        {
          const data = await res.json();
         dispatch({type:"cities/deleted" , payload:id});
        }
        else
        {
          alert("there was an error loading data");
        } 
    }
    return (
        <context.Provider value = {{cities , isLoading , CurrentCity ,getCity , createCity , deleteCity}}>
            {children}
        </context.Provider>
    )
}


function useCities()
{
    const contextfull = useContext(context);
    if(context === undefined) throw new Error("cities context was used outside  provider"); 
    return contextfull;
}
export {CitiesProvider , useCities};
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from './components/AppLayout';
import CityList from './components/CityList';
import City from "./components/City";
import Form from './components/Form';
import { useEffect, useState } from 'react';
import CountriesList from './components/CountriesList';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
    <CitiesProvider>
<BrowserRouter>
<Routes>
  <Route path = "/" element={<Homepage></Homepage>}></Route>
  <Route path = "/product" element={<Pricing></Pricing>}></Route>
  <Route path = "/pricing" element={<Product></Product>}></Route>
  <Route path = "/login" element = {<Login></Login>}></Route>
  <Route path = "/app" element = {<AppLayout></AppLayout>}>
    <Route index element = {<Navigate replace to ="cities" />}></Route>
    <Route path = "cities" element = {<CityList></CityList>}></Route>
    <Route path = "cities/:id" element = {<City></City>}></Route>
    <Route path = "countries" element = {<CountriesList></CountriesList>} ></Route>
    <Route path = "form" element = {<Form></Form>}></Route>
  </Route>
  <Route path="*" element = {<PageNotFound></PageNotFound>}></Route>
</Routes>
</BrowserRouter>
</CitiesProvider>
</AuthProvider>
  )
}

export default App

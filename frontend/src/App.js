import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import Main from './Main/Main';
import PokemonSelection from "./PokemonSelection/PokemonSelection";
import ItemSelection from "./ItemSelection/ItemSelection";
import Battle from "./Battle/Battle";
import Stats from "./Stats/Stats"

function App(){
  return (

    <main>
        <Switch>
            <Route path='/' component={Login} exact/>
            <Route path='/main' component={Main}/>
            <Route path='/pokemonselection' component={PokemonSelection}/>
            <Route path='/itemselection' component={ItemSelection}/>
            <Route path='/battle' component={Battle}/>
            <Route path='/stats' component={Stats}/>
        </Switch>
    </main>
  );
}

export default App;

import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import PokemonSelection from "./PokemonSelection";
import ItemSelection from "./ItemSelection";
import Battle from "./Battle";

function App(){
  return (

    <main style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Switch>
            <Route path='/' component={Login} exact/>
            <Route path='/main' component={Main}/>
            <Route path='/pokemonselection' component={PokemonSelection}/>
            <Route path='/itemselection' component={ItemSelection}/>
            <Route path='/battle' component={Battle}/>
        </Switch>
    </main>
  );
}

export default App;

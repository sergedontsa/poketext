import React, { useState } from "react";
import "./Main.css";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function Main() {
    return(
        <div className='container'>
            <Link
                className='flex-row'
                to="/PokemonSelection"
                style={{ textDecoration: 'none', color: 'white' }}>
                    <button
                        variant="contained"
                        color="primary">
                            Get Pokemon
                    </button>
            </Link>
            <Link
                className='flex-row'
                to="/itemselection"
                style={{ textDecoration: 'none', color: 'white' }}>
                    <button
                        variant="contained"
                        color="primary">
                            Get Items
                    </button>
            </Link>
            <Link
                className='flex-row'
                to="/battle"
                style={{ textDecoration: 'none', color: 'white' }}>
                    <button
                        variant="contained"
                        color="secondary">
                            Battle
                    </button>
            </Link>
            <Link
                className='flex-row'
                to="/stats"
                style={{ textDecoration: 'none', color: 'white' }}>
                    <button
                        variant="contained"
                        color="primary">
                            Check Stats
                    </button>
            </Link>
            <Link
                className='flex-row'
                to=""
                style={{ textDecoration: 'none', color: 'white' }}>
                    <button
                        variant="contained"
                        color="danger">
                            Logout
                    </button>
            </Link>
        </div>
    );
}

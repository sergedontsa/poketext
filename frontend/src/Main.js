import React, { useState } from "react";
import "./Main.css";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function Main() {
    return(
        <div className='container'>
            <Link
                to="/PokemonSelection"
                style={{ textDecoration: 'none', color: 'white' }}>
                    <Button
                        variant="contained"
                        color="primary">
                            Get Pokemon
                    </Button>
            </Link>
            <br/>
            <br/>
            <Link
                to="/itemselection"
                style={{ textDecoration: 'none', color: 'white' }}>
                    <Button
                        variant="contained"
                        color="primary">
                            Get Items
                    </Button>
            </Link>
            <br/>
            <br/>
            <Link
                to="/battle"
                style={{ textDecoration: 'none', color: 'white' }}>
                    <Button
                        variant="contained"
                        color="primary">
                            Battle
                    </Button>
            </Link>
            <br/>
            <br/>
            <Link
                to="/stats"
                style={{ textDecoration: 'none', color: 'white' }}>
                    <Button
                        variant="contained"
                        color="primary">
                            Check Stats
                    </Button>
            </Link>
            <br/>
            <br/>
            <Link
                to=""
                style={{ textDecoration: 'none', color: 'white' }}>
                    <Button
                        variant="contained"
                        color="primary">
                            Logout
                    </Button>
            </Link>
        </div>
    );
}

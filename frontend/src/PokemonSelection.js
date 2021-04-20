import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function PokemonSelection() {
    return(
        <div>
            <Button
                variant="contained"
                color="primary">
                Randomize a Pokemon
            </Button>
        </div>
    );
}
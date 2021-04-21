import React, { Component } from 'react';
import "./Battle.css";
import Pikachu from './pictures/pokemon-pikachu-neon-i71936.jpg';
import Charmander from './pictures/F7S8p4xK.jpg';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

class Battle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonSelection: {},
            move1: {},
            move2: {},
            move3: {},
            move4: {},
            userSelection: {},
            itemSelection: {},

            //bot has bottoken <- which identifies him
            botUserSelection: {},
            botPokemon: {},
            botMoves: {},
            //no items for bot

        }
    }


    componentDidMount = event => {

            let data = {}
            let conf = {
                headers: {
                    'token': 'dummytoken'
                }
            }

            axios.get('http://localhost:8080/pokemon/0', conf)
                .then(response => {
                    console.log(response)
                    this.setState({pokemonSelection: response.data})
                    return response.data
                })
                .then(response => {
                    axios.get('http://localhost:8080/move/'+this.state.pokemonSelection.name+'/all', conf)
                        .then(response =>{
                            console.log(response)
                            this.setState({move1: response.data[0]})
                            this.setState({move2: response.data[1]})
                            this.setState({move3: response.data[2]})
                            this.setState({move4: response.data[3]})
                        })
                    }
                ).then(response =>{
                    axios.get('http://localhost:8080/item', conf)
                        .then(response => {
                            this.setState({itemSelection: response.data})
                        })
            })
                .catch(function (error) {
                    console.log("ERROR WHILE FETCHING POKEMON")
                    return Promise.reject(error)
                })
    }

    componentWillUnmount = event => {
        this.setState({
            move1: {},
            move2: {},
            move3: {},
            move4: {}
        })
    }


// attack(id)=>
// {botPokemon.hp - (moveSelection[id]*0.2 <- %accuracy? result>acc = 0 || result = attack
// }

    render() {

        return (
            <div className="parentContainer">
                <div className="usersContainer">
                    {/*USER SECTION*/}
                    <div className="battlerContainer">
                        <h3>Username</h3>
                        <div className="pictureContainer">
                            <img src={this.state.pokemonSelection.sprite}/>
                        </div>
                        <h4>{this.state.pokemonSelection.name}</h4>
                        <h4>HP: {this.state.pokemonSelection.hp}</h4>
                    </div>
                    {/*BOT SECTION*/}
                    <div className="battlerContainer">
                        <h3>Bot</h3>
                        <div className="pictureContainer">
                            <img src={Charmander}/>
                        </div>
                        <h4>Charmander</h4>
                        <h4>HP: 40</h4>
                    </div>
                </div>
                <div className="buttonsContainer">
                    <Button variant="contained" color="primary">{this.state.move1.name}</Button>
                    <Button variant="contained" color="primary">{this.state.move2.name}</Button>
                    <Button variant="contained" color="primary">{this.state.move3.name}</Button>
                    <Button variant="contained" color="primary">{this.state.move4.name}</Button>
                    <Button variant="contained" color="secondary">{this.state.itemSelection.name}</Button>
                </div>
                <div className="dialogueContainer">
                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic
                        or web designs. The passage is attributed to an unknown typesetter in the 15th century who is
                        thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type
                        specimen book. It usually begins with:

                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.”
                        The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph,
                        page, etc.) that doesn't distract from the layout. A practice not without controversy, laying
                        out pages with meaningless filler text can be very useful when the focus is meant to be on
                        design, not content.

                        The passage experienced a surge in popularity during the 1960s when Letraset used it on their
                        dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their
                        software. Today it's seen all around the web; on templates, websites, and stock designs. Use our
                        generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic
                        or web designs. The passage is attributed to an unknown typesetter in the 15th century who is
                        thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type
                        specimen book. It usually begins with:

                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.”
                        The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph,
                        page, etc.) that doesn't distract from the layout. A practice not without controversy, laying
                        out pages with meaningless filler text can be very useful when the focus is meant to be on
                        design, not content.

                        The passage experienced a surge in popularity during the 1960s when Letraset used it on their
                        dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their
                        software. Today it's seen all around the web; on templates, websites, and stock designs. Use our
                        generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic
                        or web designs. The passage is attributed to an unknown typesetter in the 15th century who is
                        thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type
                        specimen book. It usually begins with:

                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.”
                        The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph,
                        page, etc.) that doesn't distract from the layout. A practice not without controversy, laying
                        out pages with meaningless filler text can be very useful when the focus is meant to be on
                        design, not content.

                        The passage experienced a surge in popularity during the 1960s when Letraset used it on their
                        dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their
                        software. Today it's seen all around the web; on templates, websites, and stock designs. Use our
                        generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
                </div>
            </div>
        );
    }
}

export default Battle

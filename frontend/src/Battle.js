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
            botSelection: {},
            move1: {},
            move2: {},
            move3: {},
            move4: {},
            userHp: null,

            userSelection: {},
            itemSelection: {},

            //bot has bottoken <- which identifies him
            botUserSelection: {},
            botPokemon: {},
            botMove1: {},
            botMove2: {},
            botMove3: {},
            botMove4: {},

            potionFlag: false
            //no items for bot
        }
        this.data = {}
        this.headers = {
            headers: {
                'token': 'dummytoken'
            }
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
                    this.setState({userHp: response.data.hp})
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
            }).catch(function (error) {
                    console.log("ERROR WHILE FETCHING POKEMON")
                    return Promise.reject(error)
                })

        let headBot = {
            headers: {
                'token': 'bottoken'
            }
        }
        let dataBot = {}
        let y = Math.floor((Math.random() *5 )+4)

        axios.post('http://localhost:8080/pokemon/'+y, dataBot, headBot)
            .then(response => {
                console.log(response)
            }).then(response => {
            axios.get('http://localhost:8080/pokemon/0', headBot)
                .then(response => {
                    console.log(response.data)
                    this.setState({botSelection: response.data})
                    return response.data
                }).then(response => {
                axios.get('http://localhost:8080/move/'+this.state.botSelection.name+'/all', headBot)
                    .then(response =>{
                        console.log(response)
                        this.setState({botMove1: response.data[0]})
                        this.setState({botMove2: response.data[1]})
                        this.setState({botMove3: response.data[2]})
                        this.setState({botMove4: response.data[3]})

                    })
            })
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

    handlePotion = event =>{
        event.preventDefault()
        let conf = {
            headers: {
                'token': 'dummytoken'
            }
        }

        let attributes = null

        axios.get('http://localhost:8080/item', conf)
            .then(response => {
                console.log(response.data)
                attributes = response.data.attributes
                console.log("ATTRIBUT: " + attributes)

                let b = this.state.pokemonSelection.hp + attributes
                if (b <= this.state.userHp) {
                    let tempHp = this.state.pokemonSelection
                    tempHp.hp = b
                    this.setState({pokemonSelection: tempHp})
                    this.setState({potionFlag: true})
                }
            })
    }

    botMove = () => {
        console.log("BOT ATACCKING")
        let botMove = [
            this.state.botMove1,
            this.state.botMove2,
            this.state.botMove3,
            this.state.botMove4
        ]

        let id = Math.floor(Math.random()*4)
        console.log("BOT ATTACKING WITH ID: "+id)
        let acc = Math.random(botMove[id].accuracy*1)
        if (acc>botMove[id].accuracy){
            acc = 0
        }else {
            acc = 1
        }
        let attack = botMove[id].damage*acc*0.3
        let a = this.state.pokemonSelection.hp - attack

        let tempState = this.state.pokemonSelection
        if (a<0) {
            a = 0
        }
        tempState.hp = a
        this.setState({pokemonSelection: tempState })
        if(this.state.pokemonSelection.hp<=0) {
            alert("GAME OVER! YOU LOST!")
            axios.put('http://localhost:8080/updateloss', this.data, this.headers)
                .then(response => {
                    console.log(response)
                })
            //redirect
        }
    }

    handleMove = id => event => {
        event.preventDefault()
        // var id = 0
        console.log("ATTACKING " )
        let pokeMove = [
           this.state.move1,
           this.state.move2,
           this.state.move3,
           this.state.move4
        ]


        let acc = Math.random(pokeMove[id].accuracy*1)
        if (acc>pokeMove[id].accuracy){
            acc = 0
        }else {
            acc = 1
        }
        let attack = pokeMove[id].damage*acc*0.3
        let a = this.state.botSelection.hp - attack

        let tempState = this.state.botSelection
        if (a<0) {
            a = 0
        }
        tempState.hp = a
        this.setState({botSelection: tempState })
        if(this.state.botSelection.hp<=0){
            alert("GAME OVER! YOU WON!")
            axios.put('http://localhost:8080/updatewin', this.data, this.headers)
                .then(response => {
                    console.log(response)
                })
        }else{
            this.botMove()
        }
    }




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
                            <img src={this.state.botSelection.sprite}/>
                        </div>
                        <h4>{this.state.botSelection.name}</h4>
                        <h4>HP: {this.state.botSelection.hp}</h4>
                    </div>
                </div>
                <div className="buttonsContainer">
                    <Button variant="contained" onClick={this.handleMove(0)} color="primary">{this.state.move1.name}</Button>
                    <Button variant="contained" onClick={this.handleMove(1)} color="primary">{this.state.move2.name}</Button>
                    <Button variant="contained" onClick={this.handleMove(2)} color="primary">{this.state.move3.name}</Button>
                    <Button variant="contained" onClick={this.handleMove(3)} color="primary">{this.state.move4.name}</Button>
                    <Button variant="contained" color="secondary" onClick={this.handlePotion} disabled={this.state.potionFlag}>{this.state.itemSelection.name}</Button>


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

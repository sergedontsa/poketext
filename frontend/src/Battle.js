import React, { Component } from 'react';
import "./Battle.css";
import Pikachu from './pictures/pokemon-pikachu-neon-i71936.jpg';
import Charmander from './pictures/F7S8p4xK.jpg';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { useHistory, Redirect } from "react-router-dom";

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

            potionFlag: false,
            text_log: '',
            redirect: false
            //no items for bot
        }
        this.textLog = ''

        this.headers = {
            headers: {
                'token': localStorage.getItem('token')
            }
        }
        this.data = {}

    }

    updateTextLog = (newText) => {
        this.textLog =  this.textLog + newText+ "\n"
    }

    refreshTextLogState = () => {
        this.setState({text_log: this.textLog})
    }

    NewlineText = (props) => {
        const text = props.text;
        return text.split('\n').map(str => <p>{str}</p>);
    }

    componentDidMount = event => {

            axios.get('http://localhost:8080/pokemon/0', this.headers)
                .then(response => {
                    this.setState({pokemonSelection: response.data})
                    this.setState({userHp: response.data.hp})
                    return response.data
                })
                .then(response => {
                    axios.get('http://localhost:8080/move/'+this.state.pokemonSelection.name+'/all', this.headers)
                        .then(response =>{
                            this.setState({move1: response.data[0]})
                            this.setState({move2: response.data[1]})
                            this.setState({move3: response.data[2]})
                            this.setState({move4: response.data[3]})
                        })
                    }
                ).then(response =>{
                    axios.get('http://localhost:8080/item', this.headers)
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
            }).then(response => {
            axios.get('http://localhost:8080/pokemon/0', headBot)
                .then(response => {
                    this.setState({botSelection: response.data})
                    return response.data
                }).then(response => {
                axios.get('http://localhost:8080/move/'+this.state.botSelection.name+'/all', headBot)
                    .then(response =>{
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

        let attributes = null

        axios.get('http://localhost:8080/item', this.headers)
            .then(response => {
                attributes = response.data.attributes

                let b = this.state.pokemonSelection.hp + attributes
                if (b <= this.state.userHp) {
                    this.updateTextLog("You used the healing potion")
                    this.refreshTextLogState()
                    let tempHp = this.state.pokemonSelection
                    tempHp.hp = b
                    this.setState({pokemonSelection: tempHp})
                    this.setState({potionFlag: true})
                }
            })
    }

    botMove = () => {
        let botMove = [
            this.state.botMove1,
            this.state.botMove2,
            this.state.botMove3,
            this.state.botMove4
        ]

        let id = Math.floor(Math.random()*4)
        let acc = Math.random(botMove[id].accuracy*1)
        if (acc>botMove[id].accuracy){
            acc = 0
            this.updateTextLog("The bot has missed")
        }else {
            acc = 1
            this.updateTextLog("The bot has hit")
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
            alert("MERCI BONSOIR! YOU LOST!")
            axios.put('http://localhost:8080/updateloss', this.data, this.headers)
                .then(response => {
                })
            this.redirectGameOver()

            //redirect
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/main' />
        }
    }

    redirectGameOver = () =>{
        this.setState({
            redirect: true
        })
    }

    handleMove = id => event => {
        event.preventDefault()
        // var id = 0
        let pokeMove = [
           this.state.move1,
           this.state.move2,
           this.state.move3,
           this.state.move4
        ]


        let acc = Math.random(pokeMove[id].accuracy*1)
        if (acc>pokeMove[id].accuracy){
            acc = 0
            this.updateTextLog("The attack has missed")
            //
        }else {
            acc = 1
            this.updateTextLog("The attack has hit")
            //
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
            alert("MERCI BONSOIR! YOU WON!")
            axios.put('http://localhost:8080/updatewin', this.data, this.headers)
                .then(response => {
                })
            this.redirectGameOver()
        }else{
            this.botMove()
        }
        this.refreshTextLogState()
    }




    render() {

        return (
            <>
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
                    <this.NewlineText text={this.state.text_log} />
                </div>
            </div>
            <div>
                {this.renderRedirect()}
            </div>
            </>
        );
    }
}

export default Battle

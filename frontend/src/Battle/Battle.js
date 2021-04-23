import React, { Component } from 'react';
import "./Battle.css";
import Pikachu from '../pictures/pokemon-pikachu-neon-i71936.jpg';
import Charmander from '../pictures/F7S8p4xK.jpg';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { useHistory, Redirect } from "react-router-dom";
import bgbattle from '../pictures/scenes/3.png'
import purp from '../pictures/purppp.gif'
import Helmet from 'react-helmet';

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
            botHp: null,

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
        // this.textLog =  this.textLog + newText+ "\n"
        this.textLog =  newText
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
                    this.setState({botHp: response.data.hp})
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
            this.updateTextLog(this.state.botSelection.name + " attack has missed")
        }else {
            acc = 1
            this.updateTextLog(this.state.botSelection.name + " attacked with "+ botMove[id].name)
        }
        let attack = Math.floor(botMove[id].damage*acc*0.2)
        let a = this.state.pokemonSelection.hp - attack

        let tempState = this.state.pokemonSelection
        if (a<0) {
            a = 0
        }
        tempState.hp = a
        this.setState({pokemonSelection: tempState })
        if(this.state.pokemonSelection.hp<=0) {
            alert("YOU LOST!")
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
            this.updateTextLog(this.state.userSelection.name + " attack has missed")
        }else {
            acc = 1
            this.updateTextLog(this.state.pokemonSelection.name + " attack has hit")
        }
        let attack = Math.floor(pokeMove[id].damage*acc*0.2)
        let a = this.state.botSelection.hp - attack

        let tempState = this.state.botSelection
        if (a<0) {
            a = 0
        }
        tempState.hp = a
        this.setState({botSelection: tempState })
        if(this.state.botSelection.hp<=0){
            alert("YOU WON!")
            axios.put('http://localhost:8080/updatewin', this.data, this.headers)
                .then(response => {
                })
            this.redirectGameOver()
        }else{
            this.botMove()
        }
        this.refreshTextLogState()
        try {
            const ch = document.getElementById('comment-history');
            console.log(ch)
            if (ch != null){
                ch.scrollTop = ch.scrollHeight;
            }
        } catch (err) {}
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }


    render() {

        return (
            <>

            <div className="parentContainer">
                    {/*USER SECTION*/}
                    <div className="userBattleContainer">
                        <h3>{this.state.userSelection.name}</h3>
                        <img className="pokemonImg userPokemonImg" src={this.state.pokemonSelection.spriteback}/>
                        <div className="userInfo">
                            <div className="info pokemonName">{this.capitalize(this.state.pokemonSelection.name)}</div>
                            <div className="info pokemonHp">HP: {this.state.pokemonSelection.hp}/{this.state.userHp}</div>
                        </div>
                    </div>

                    {/*BOT SECTION*/}
                    <div className="botBattleContainer">
                        <img className="pokemonImg botPokemonImg" src={this.state.botSelection.sprite}/>
                        <div className="botInfo">
                            <div className="info pokemonName">{this.capitalize(this.state.botSelection.name)}</div>
                            <div className="info pokemonHp">HP: {this.state.botSelection.hp}/{this.state.botHp}</div>
                        </div>
                    </div>
                <div className="buttonsContainer">
                    <button className="button attack" onClick={this.handleMove(0)}>{this.state.move1.name}</button>
                    <button className="button attack" onClick={this.handleMove(1)}>{this.state.move2.name}</button>
                    <button className="button attack" onClick={this.handleMove(2)}>{this.state.move3.name}</button>
                    <button className="button attack" onClick={this.handleMove(3)}>{this.state.move4.name}</button>
                    <button className="button heal" onClick={this.handlePotion} disabled={this.state.potionFlag}>{this.state.itemSelection.name}</button>
                </div>

                <div id="comment-history" className="dialogueContainer">
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

package com.soen487.poketext.Controllers;

import com.soen487.poketext.Model.Pokemon;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

import com.soen487.poketext.PokeAPI.APIMapper;
import com.soen487.poketext.PokeAPI.PokeAPI;

import com.soen487.poketext.Repository.PokemonRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;


@Transactional
@RestController
@RequestMapping(value = "/pokemon")
public class PokemonController {


    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Pokemon> getAll(){
        return null;
    }

    @Autowired
    private final PokemonRepository pokemonRepository;

    public PokemonController(PokemonRepository pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    @GetMapping(value = "")
    public @ResponseBody String hello(){
        return "Hello World";
    }


    //TODO: implement have unique pokemon per UserID
    @PostMapping(value="/choose/{pokemonToChoose}")
    public @ResponseBody String choosePokemon(@RequestHeader HttpHeaders headers, @PathVariable String pokemonToChoose){
        JSONObject pokemonJSON = new PokeAPI().getPokemon(pokemonToChoose);
        Pokemon pokemon = new APIMapper().jsonToPokemon(pokemonJSON);
        this.pokemonRepository.save(pokemon);
        return "Pokemon chosen";
    }

}

package com.soen487.poketext.Controllers;

import com.soen487.poketext.Model.Move;
import com.soen487.poketext.Model.Pokemon;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

import com.soen487.poketext.Model.User;
import com.soen487.poketext.PokeAPI.APIMapper;
import com.soen487.poketext.PokeAPI.PokeAPI;

import com.soen487.poketext.Repository.MoveRepository;
import com.soen487.poketext.Repository.PokemonRepository;
import com.soen487.poketext.Repository.UserRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;


@Transactional
@RestController
@RequestMapping(value = "/pokemon")
public class PokemonController extends Controller{


    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Pokemon> getAll(){
        return null;
    }

    @Autowired
    private final PokemonRepository pokemonRepository;
    @Autowired
    private final MoveRepository moveRepository;


    public PokemonController(PokemonRepository pokemonRepository, UserRepository userRepository, MoveRepository moveRepository) {
        super(userRepository);
        this.pokemonRepository = pokemonRepository;
        this.moveRepository = moveRepository;
    }


//    - get all user's pokemons
    @GetMapping(value="/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public @ResponseBody ResponseEntity<List<Pokemon>> getAll(@RequestHeader HttpHeaders headers){
        User user = getUserByHeadersToken(headers);
        List<Pokemon> pokemons = this.pokemonRepository.findAllByUser(user);
        return ResponseEntity.ok(pokemons);
    }

//    - get pokemon by id
    @GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public @ResponseBody ResponseEntity<Pokemon> getPokemon(@RequestHeader HttpHeaders headers, @PathVariable int id){
        User user = getUserByHeadersToken(headers);
        List<Pokemon> pokemons = this.pokemonRepository.findAllByUser(user);
        if(id<pokemons.size()) {
            return ResponseEntity.ok(pokemons.get(id));
        } else {
            return ResponseEntity.ok(new Pokemon());
        }
    }

//    - remove pokemon
    @DeleteMapping(value="/{id}")
    @CrossOrigin
    public @ResponseBody ResponseEntity<String> deletePokemon(@RequestHeader HttpHeaders headers, @PathVariable int id){
        User user = getUserByHeadersToken(headers);
        List<Pokemon> pokemons = this.pokemonRepository.findAllByUser(user);
        if(id<pokemons.size()) {
            Pokemon pokemon = pokemons.get(id);
            this.pokemonRepository.delete(pokemon);
            return ResponseEntity.ok("Deleted "+pokemon.getName());
        }
        else {
            return ResponseEntity.ok("Pokemon not found");
        }
    }

//    - remove all user's pokemons
    @DeleteMapping(value="/all")
    @CrossOrigin
    public @ResponseBody ResponseEntity<String> deleteAll(@RequestHeader HttpHeaders headers){
        User user = getUserByHeadersToken(headers);
        List<Pokemon> pokemons = this.pokemonRepository.findAllByUser(user);
        for(Pokemon pokemon: pokemons){
            this.pokemonRepository.delete(pokemon);
        }
        return ResponseEntity.ok("Deleted pokemons");
    }

    @PostMapping(value="/{pokemonName}")
    @CrossOrigin
    public @ResponseBody ResponseEntity<String> choosePokemon(@RequestHeader HttpHeaders headers, @PathVariable String pokemonName){
        try {
            User user = getUserByHeadersToken(headers);
            JSONObject pokemonJSON = new PokeAPI().getPokemon(pokemonName);

            // return pokemon from API
            Pokemon pokemon = new APIMapper().jsonToPokemon(pokemonJSON);
            Optional<Pokemon> existingPokemon = this.pokemonRepository.findByUserAndName(user, pokemon.getName());

            if(existingPokemon.isEmpty()) {
                pokemon.setUser(user);
                this.pokemonRepository.save(pokemon);

                // populate with pokemon's moves
                JSONArray pokemonMovesJSON = pokemonJSON.getJSONArray("moves");
                existingPokemon = this.pokemonRepository.findByUserAndName(user, pokemon.getName());

                if(existingPokemon.isPresent()) {
                    pokemon = existingPokemon.get();
                    for (int i = 0; i < 4; i++) {
                        String moveName = (String) pokemonMovesJSON.getJSONObject(i).getJSONObject("move").get("name");
                        JSONObject moveJSON = new PokeAPI().getMove(moveName);
                        Move move = new APIMapper().jsonToMove(moveJSON);
                        move.setPokemon(pokemon);
                        this.moveRepository.save(move);
                    }
                }

                return ResponseEntity.ok("You have chosen "+pokemonName);
            } else {
                return ResponseEntity.ok("You have already chosen this pokemon");
            }

        } catch (NullPointerException e){
            return ResponseEntity.status(401)
                    .body("User not authenticated");
        }
    }


}

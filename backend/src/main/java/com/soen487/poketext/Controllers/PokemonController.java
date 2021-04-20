package com.soen487.poketext.Controllers;

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

import com.soen487.poketext.Repository.PokemonRepository;
import com.soen487.poketext.Repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Objects;
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
    @Autowired
    private final UserRepository userRepository;

    public PokemonController(PokemonRepository pokemonRepository, UserRepository userRepository) {
        this.pokemonRepository = pokemonRepository;
        this.userRepository = userRepository;
    }

    @GetMapping(value = "")
    public @ResponseBody String hello(){
        return "Hello World";
    }


    @PostMapping(value="/choose/{pokemonName}")
    public @ResponseBody ResponseEntity<String> choosePokemon(@RequestHeader HttpHeaders headers, @PathVariable String pokemonName){
        try {
            // although get returns a list, we assume that the token list is of length 1
            // and that the desired token is going to be in the 0 position
            String token = Objects.requireNonNull(headers.get("token")).get(0);
            Optional<User> existingUser = this.userRepository.findByToken(token);
            User user = existingUser.get();

            Pokemon pokemon = getPokemonFromAPI(pokemonName);
            Optional<Pokemon> existingPokemon = this.pokemonRepository.findByUserAndName(user, pokemon.getName());

            if(existingPokemon.isEmpty()) {
                pokemon.setUser(user);
                this.pokemonRepository.save(pokemon);
                return ResponseEntity.ok("You have chosen "+pokemonName);
            } else {
                return ResponseEntity.ok("You have already chosen this pokemon");
            }

        } catch (NullPointerException e){
            return ResponseEntity.status(401)
                    .body("User not authenticated");
        }
    }

    public Pokemon getPokemonFromAPI(String pokemonName){
        JSONObject pokemonJSON = new PokeAPI().getPokemon(pokemonName);
        // return pokemon from API
        return new APIMapper().jsonToPokemon(pokemonJSON);
    }

}

package com.soen487.poketext.Controllers;


import com.soen487.poketext.Model.Move;
import com.soen487.poketext.Model.Pokemon;
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
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Objects;
import java.util.Optional;

@Transactional
@RestController
@RequestMapping(value="/move")
public class MoveController {

    @Autowired
    private final MoveRepository moveRepository;
    @Autowired
    private final PokemonRepository pokemonRepository;
    @Autowired
    private final UserRepository userRepository;

    public MoveController(MoveRepository moveRepository, PokemonRepository pokemonRepository,
                          UserRepository userRepository) {
        this.moveRepository = moveRepository;
        this.pokemonRepository = pokemonRepository;
        this.userRepository = userRepository;
    }

    @PostMapping(value="/choose/{pokemonName}/{moveName}")
    public @ResponseBody String chooseMove(@RequestHeader HttpHeaders headers, @PathVariable String pokemonName, @PathVariable String moveName){
        User user = getUserbyHeadersToken(headers);
        Optional<Pokemon> existingPokemon = this.pokemonRepository.findByUserAndName(user, pokemonName);

        if(existingPokemon.isPresent()){
            Pokemon pokemon = existingPokemon.get();
            JSONObject pokemonJSON = new PokeAPI().getPokemon(pokemon.getName());
            JSONArray pokemonMoveJSON = pokemonJSON.getJSONArray("moves");
            for(int i = 0; i < pokemonMoveJSON.length(); i++) {

            }
            JSONObject moveJSON = new PokeAPI().getMove(moveName);
            Move move = new APIMapper().jsonToMove(moveJSON);
            move.setPokemon(pokemon);
            this.moveRepository.save(move);


        }

        return "Move chosen";
    }

    public User getUserbyHeadersToken(HttpHeaders headers){
        String token = Objects.requireNonNull(headers.get("token")).get(0);
        Optional<User> existingUser = this.userRepository.findByToken(token);
        return existingUser.orElseGet(User::new);
    }

}

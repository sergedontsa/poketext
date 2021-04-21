package com.soen487.poketext.Controllers;


import com.soen487.poketext.Model.Move;
import com.soen487.poketext.Model.Pokemon;
import com.soen487.poketext.Model.User;
import com.soen487.poketext.Repository.MoveRepository;
import com.soen487.poketext.Repository.PokemonRepository;
import com.soen487.poketext.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@RestController
@RequestMapping(value="/move")
public class MoveController extends Controller{

    @Autowired
    private final MoveRepository moveRepository;
    @Autowired
    private final PokemonRepository pokemonRepository;

    public MoveController(MoveRepository moveRepository, PokemonRepository pokemonRepository, UserRepository userRepository) {
        super(userRepository);
        this.moveRepository = moveRepository;
        this.pokemonRepository = pokemonRepository;
    }

//    - return list moves for given pokemon
    @GetMapping(value="/{pokemonName}/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public @ResponseBody ResponseEntity<List<Move>> getAll(@RequestHeader HttpHeaders headers, @PathVariable String pokemonName){
        User user = getUserByHeadersToken(headers);
        Optional<Pokemon> existingPokemon = this.pokemonRepository.findByUserAndName(user, pokemonName);

        if(existingPokemon.isPresent()){
            Pokemon pokemon = existingPokemon.get();
            List<Move> moves = this.moveRepository.findAllByPokemon(pokemon);
            return ResponseEntity.ok(moves);

        } else {
            List<Move> none = new ArrayList<>();
            return ResponseEntity.ok(none);
        }
    }

//    - return move info for given move (id: 0-3)
    @GetMapping(value="/{pokemonName}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public @ResponseBody ResponseEntity<Move> getMove(@RequestHeader HttpHeaders headers, @PathVariable String pokemonName, @PathVariable int id){
        User user = getUserByHeadersToken(headers);
        Optional<Pokemon> existingPokemon = this.pokemonRepository.findByUserAndName(user, pokemonName);

        if(existingPokemon.isPresent()){
            Pokemon pokemon = existingPokemon.get();
            List<Move> moves = this.moveRepository.findAllByPokemon(pokemon);
            if(id< moves.size()) {
                return ResponseEntity.ok(moves.get(id));
            } else {
                return ResponseEntity.ok(new Move());
            }
        } else {
            return ResponseEntity.ok(new Move());
        }
    }

}

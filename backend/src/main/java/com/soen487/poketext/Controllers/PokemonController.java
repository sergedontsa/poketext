package com.soen487.poketext.Controllers;

import com.soen487.poketext.Model.Pokemon;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RestController
@RequestMapping(value = "/pokemon")
public class PokemonController {

    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Pokemon> getAll(){
        return null;
    }
}

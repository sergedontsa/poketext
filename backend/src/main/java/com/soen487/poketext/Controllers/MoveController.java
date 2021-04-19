package com.soen487.poketext.Controllers;


import com.soen487.poketext.Model.Move;
import com.soen487.poketext.PokeAPI.APIMapper;
import com.soen487.poketext.PokeAPI.PokeAPI;
import com.soen487.poketext.Repository.MoveRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@Transactional
@RestController
@RequestMapping(value="/move")
public class MoveController {

    @Autowired
    private final MoveRepository moveRepository;

    public MoveController(MoveRepository moveRepository) {
        this.moveRepository = moveRepository;
    }

    @PostMapping(value="/choose/{moveToChoose}")
    public @ResponseBody String chooseMove(@PathVariable String moveToChoose){
        JSONObject moveJSON = new PokeAPI().getMove(moveToChoose);
        Move move = new APIMapper().jsonToMove(moveJSON);
        this.moveRepository.save(move);
        return "Move chosen";
    }
}

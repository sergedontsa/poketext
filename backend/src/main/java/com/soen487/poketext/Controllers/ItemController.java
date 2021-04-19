package com.soen487.poketext.Controllers;

import com.soen487.poketext.Model.Items;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RestController
@RequestMapping(value = "/items")
public class ItemController {
    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Items> getAll(){
        return null;
    }
}

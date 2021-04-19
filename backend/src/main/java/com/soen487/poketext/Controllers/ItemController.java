package com.soen487.poketext.Controllers;


import com.soen487.poketext.Model.Items;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soen487.poketext.Model.Item;
import com.soen487.poketext.Model.Move;
import com.soen487.poketext.PokeAPI.APIMapper;
import com.soen487.poketext.PokeAPI.PokeAPI;
import com.soen487.poketext.Repository.ItemRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


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

@RequestMapping(value = "/item")
public class ItemController {

    @Autowired
    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Item> getAll(){
        return null;
    }

    @PostMapping(value="/choose/{itemToChoose}")
    public @ResponseBody
    String chooseItem(@RequestHeader HttpHeaders headers, @PathVariable String itemToChoose){


        JSONObject itemJSON = new PokeAPI().getItem(itemToChoose);
        Item item = new APIMapper().jsonToItem(itemJSON);
        this.itemRepository.save(item);
        return "Item chosen";
    }

}

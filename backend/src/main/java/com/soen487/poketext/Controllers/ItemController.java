package com.soen487.poketext.Controllers;


import com.soen487.poketext.Model.User;
import com.soen487.poketext.Repository.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

@RequestMapping(value = "/item")
public class ItemController extends Controller{
    @Autowired
    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository, UserRepository userRepository) {
        super(userRepository);
        this.itemRepository = itemRepository;
    }

    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public @ResponseBody ResponseEntity<Item> getItem(@RequestHeader HttpHeaders headers){
        User user = getUserByHeadersToken(headers);
        List<Item> items = this.itemRepository.findAllByUser(user);
        if(items.size()>0){
            return ResponseEntity.ok(items.get(0));
        }else{
            return ResponseEntity.ok(new Item());
        }

    }

    @PostMapping(value="/choose")
    @CrossOrigin
    public @ResponseBody String chooseItem(@RequestHeader HttpHeaders headers){
        try {
            User user = getUserByHeadersToken(headers);

            JSONObject itemJSON = new PokeAPI().getItem("17");
            Item item = new APIMapper().jsonToItem(itemJSON);
            item.setUser(user);
            this.itemRepository.save(item);
            return "Item chosen";
        }catch (Exception e){
            return "Backend Issue while fetching the item";
        }
    }



}

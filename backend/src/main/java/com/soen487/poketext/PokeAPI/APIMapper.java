package com.soen487.poketext.PokeAPI;

import com.soen487.poketext.Model.Item;
import com.soen487.poketext.Model.Move;
import com.soen487.poketext.Model.Pokemon;
import org.json.JSONObject;

public class APIMapper {

    public Pokemon jsonToPokemon(JSONObject pokemonJSON){
        Pokemon pokemon = new Pokemon();
        pokemon.setName((String) pokemonJSON.get("name"));
        pokemon.setSprite((String) pokemonJSON.getJSONObject("sprites").get("front_default"));
        pokemon.setHp(Integer.parseInt((String.valueOf(pokemonJSON.getJSONArray("stats")
                .getJSONObject(0)
                .get("base_stat")))));

        return pokemon;
    }

    public Move jsonToMove(JSONObject moveJSON){
        Move move = new Move();
        move.setName((String) moveJSON.get("name"));
        move.setAccuracy(Integer.parseInt(String.valueOf(moveJSON.get("accuracy"))));
        move.setDamage(Integer.parseInt(String.valueOf(moveJSON.get("power"))));
        move.setPp(Integer.parseInt(String.valueOf(moveJSON.get("pp"))));
        move.setPriority(Integer.parseInt(String.valueOf(moveJSON.get("priority"))));

        return move;
    }

    public Item jsonToItem(JSONObject itemJSON){
        Item item = new Item();
        item.setName((String) itemJSON.get("name"));
        // only implemented potion item for now
        // with heal of 20 points
        item.setAttributes(20);

        return item;
    }

}

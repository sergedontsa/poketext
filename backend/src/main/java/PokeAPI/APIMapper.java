package PokeAPI;

import Model.Pokemon;
import org.json.JSONObject;

public class APIMapper {

    public Pokemon jsonToPokemon(JSONObject pokemonJSON){
        Pokemon pokemon = new Pokemon();
        pokemon.setName((String) pokemonJSON.get("name"));
        pokemon.setSprite((String) pokemonJSON.getJSONObject("sprites").get("front_default"));
        pokemon.setHp(Integer.parseInt((String) pokemonJSON.getJSONArray("stats")
                .getJSONObject(0)
                .get("base_stat")));


        return pokemon;
    }


}

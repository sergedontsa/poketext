package com.soen487.poketext;

import PokeAPI.PokeAPI;
import com.mashape.unirest.http.JsonNode;
import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PoketextApplication {

	public static void main(String[] args) {
//		SpringApplication.run(PoketextApplication.class, args);

		PokeAPI pokeAPI = new PokeAPI();
		JSONObject pokemon = pokeAPI.getPokemon("pikachu");
		System.out.println(pokemon.get("abilities"));

	}

}

package PokeAPI;


import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONObject;

public class PokeAPI {

    private String baseUrl;

    public PokeAPI(){
        this.baseUrl = "https://pokeapi.co/api/v2/{prefix}/{entity}";
    }

    public JSONObject getPokemon(String pokemon){
        try {
            HttpResponse<JsonNode> response = Unirest.get(baseUrl)
                    .routeParam("prefix", "pokemon")
                    .routeParam("entity", pokemon)
                    .asJson();
            return response.getBody().getObject();
        } catch (UnirestException e){
            return new JSONObject("{}");
        }
    }

    public JSONObject getItem(String item){
        try {
            HttpResponse<JsonNode> response = Unirest.get(baseUrl)
                    .routeParam("prefix", "item")
                    .routeParam("entity", item)
                    .asJson();
            return response.getBody().getObject();
        } catch (UnirestException e){
            return new JSONObject("{}");
        }
    }

    public JSONObject getMove(String move){
        try {
            HttpResponse<JsonNode> response = Unirest.get(baseUrl)
                    .routeParam("prefix", "move")
                    .routeParam("entity", move)
                    .asJson();
            return response.getBody().getObject();
        } catch (UnirestException e){
            return new JSONObject("{}");
        }
    }

}

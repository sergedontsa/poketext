package com.soen487.poketext.Controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@Transactional
@RestController
@RequestMapping(value = "/user")
public class UserController {

    @PostMapping(value="register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String createUser(@RequestParam("username") String username, @RequestParam("password") String password){
        return "";
    }

    @PostMapping(value="login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void login(@RequestParam("username") String username, @RequestParam("password") String password){

    }

    @PostMapping(value="logout", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String logout(@RequestParam("username") String username){
        return "";
    }
}

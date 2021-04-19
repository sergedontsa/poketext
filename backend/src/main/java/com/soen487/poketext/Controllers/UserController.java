package com.soen487.poketext.Controllers;

import com.soen487.poketext.Utils.JwtUtil;
import com.soen487.poketext.Model.AuthenticationRequest;
import com.soen487.poketext.Model.AuthenticationResponse;
import com.soen487.poketext.Service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;



@RestController
public class UserController {

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private final UserDetailService userDetailService;

    @Autowired
    private final JwtUtil jwtTokenUtil;

    public UserController(AuthenticationManager authenticationManager, UserDetailService userDetailService, JwtUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping(value = "/auth", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try {
            this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));

        }catch (BadCredentialsException exception){
            throw new Exception("Incorrect username andor password");
        }
        final UserDetails userDetails = userDetailService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));

    }

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

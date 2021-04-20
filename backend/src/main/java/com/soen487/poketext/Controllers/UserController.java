package com.soen487.poketext.Controllers;

import com.soen487.poketext.Model.User;
import com.soen487.poketext.Repository.UserRepository;

import com.soen487.poketext.Utils.JwtUtil;
import com.soen487.poketext.Model.AuthenticationRequest;
import com.soen487.poketext.Model.AuthenticationResponse;
import com.soen487.poketext.Service.UserDetailService;
import com.soen487.poketext.Utils.PasswordUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.OptionalInt;



import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@RestController
public class UserController {

    @Autowired

    private final AuthenticationManager authenticationManager;

    @Autowired
    private final UserDetailService userDetailService;

    @Autowired
    private final JwtUtil jwtTokenUtil;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserController(AuthenticationManager authenticationManager, UserDetailService userDetailService, JwtUtil jwtTokenUtil, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
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

        return ResponseEntity.ok(new AuthenticationResponse(jwt, userDetails.getUsername()));
        //String rs = "username : " +userDetails.getUsername() + " Password: " + userDetails.getPassword();
        //return ResponseEntity.ok(new AuthenticationResponse(rs));

    }

    @PostMapping(value="/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createUser(@RequestBody User user) throws Exception {
        if (this.userRepository.findByUsername(user.getUsername()).isPresent()){
            throw new Exception("Username is taken");
        }else {
            User new_user = new User(user.getUsername(), PasswordUtilities.passwordEncoding(user.getPassword()));
            this.userRepository.save(new_user);
        }
    }

    @PostMapping(value="/login/{username}/{password}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean login(@PathVariable("username") String username, @PathVariable("password") String password){
        Optional<User> optionalUser = this.userRepository.findByUsername(username);

        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            return PasswordUtilities.isPasswordMatch(password, user.getPassword());
        }
        return false;


    }


    @PostMapping(value="login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> login(@RequestBody User user){
        Optional<User> existingUser = this.userRepository.findByUsername(user.getUsername());
        if(existingUser.isPresent()) {
            String token = "dummytoken";
            existingUser.get().setToken(token);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("token", token);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body("Login Succesful");

        } else{
            return ResponseEntity.status(401)
                    .body("Login Failed");
        }
    }

    @PostMapping(value="logout", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String logout(@RequestParam("username") String username){
        return "";
    }
}

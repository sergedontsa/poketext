package com.soen487.poketext.Controllers;

import com.soen487.poketext.Model.User;
import com.soen487.poketext.Repository.UserRepository;

import com.soen487.poketext.Utils.JwtUtil;
import com.soen487.poketext.Model.AuthenticationRequest;
import com.soen487.poketext.Model.AuthenticationResponse;
import com.soen487.poketext.Service.UserDetailService;
import com.soen487.poketext.Utils.PasswordUtilities;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.OptionalInt;



import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Transactional
@RestController
@RequestMapping(value="")
public class UserController extends Controller {

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
        super(userRepository);
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/auth", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
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

    }

    @PostMapping(value="/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public @ResponseBody ResponseEntity<String> createUser(@RequestBody User user) throws Exception {
        if (this.userRepository.findByUsername(user.getUsername()).isPresent()){
            return ResponseEntity.ok("Username is taken");
        }else {
            User new_user = new User(user.getUsername(), PasswordUtilities.passwordEncoding(user.getPassword()));
            this.userRepository.save(new_user);
            return ResponseEntity.ok("User created!");
        }
    }

    @PostMapping(value="/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<String> login(@RequestBody User user){
        Optional<User> optionalUser = this.userRepository.findByUsername(user.getUsername());
        JSONObject respJSON = new JSONObject();

        if (optionalUser.isPresent()){
            User existingUser = optionalUser.get();
            if(PasswordUtilities.isPasswordMatch(user.getPassword(), existingUser.getPassword())){

                Random random = ThreadLocalRandom.current();
                byte[] r = new byte[32]; //Means 256 bit
                random.nextBytes(r);
                String token = Base64.encodeBase64String(r);


                existingUser.setToken(token);
                this.userRepository.save(existingUser);

                respJSON.put("token", existingUser.getToken());
                respJSON.put("body", "Login Successful");

                return ResponseEntity.ok()
                        .body(respJSON.toString());
            }
            else{
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(respJSON.toString());
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(respJSON.toString());
        }
    }

    @PostMapping(value="logout", consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public String logout(@RequestParam("username") String username){
        return "";
    }

    @GetMapping(value="/info")
    @CrossOrigin
    public @ResponseBody ResponseEntity<User> getInfo(@RequestHeader HttpHeaders headers){
        User user = getUserByHeadersToken(headers);
        return ResponseEntity.ok(user);
    }

    @PutMapping(value="/updatewin")
    @CrossOrigin
    public @ResponseBody ResponseEntity<String> updateWin(@RequestHeader HttpHeaders headers){
        User user = getUserByHeadersToken(headers);
        user.setWincount(user.getWincount()+1);
        this.userRepository.save(user);
        return ResponseEntity.ok("Updated Win count");
    }

    @PutMapping(value="/updateloss")
    @CrossOrigin
    public @ResponseBody ResponseEntity<String> updateLoss(@RequestHeader HttpHeaders headers){
        User user = getUserByHeadersToken(headers);
        user.setLosscount(user.getLosscount()+1);
        this.userRepository.save(user);
        return ResponseEntity.ok("Updated Loss count");
    }
}

package com.soen487.poketext.Utils;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtilities {
    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public static String passwordEncoding(String password){
        return passwordEncoder.encode(password);
    }
    public static boolean isPasswordMatch(String userPassword, String encryptedPassword){
        return passwordEncoder.matches(userPassword, encryptedPassword);
    }


}

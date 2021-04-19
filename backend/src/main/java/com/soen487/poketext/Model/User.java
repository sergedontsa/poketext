package com.soen487.poketext.Model;

import lombok.*;

import javax.persistence.*;
import java.security.SecureRandom;

@Entity
@Table(name="user",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "username")
})

@Table(name="user")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    @Basic
    private int user_id;


    @Id

    @Column(name="username")
    @Basic
    private String username;


    @Column(name="password")
    @Basic
    private String password;


    public User(String username, String password) {
        this.username = username;
        this.password = password;

    @Column(name="token")
    @Basic
    private String token = "";

    private static final int TOKEN_LENGTH = 20;

    public void generateToken(){
        String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
        String CHAR_UPPER = CHAR_LOWER.toUpperCase();
        String NUMBER = "0123456789";
        String DATA_FOR_RANDOM_STRING = CHAR_LOWER + CHAR_UPPER + NUMBER;

        StringBuilder sb = new StringBuilder(TOKEN_LENGTH);
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < TOKEN_LENGTH; i++) {
            // 0-62 (exclusive), random returns 0-61
            int rndCharAt = random.nextInt(DATA_FOR_RANDOM_STRING.length());
            char rndChar = DATA_FOR_RANDOM_STRING.charAt(rndCharAt);
            sb.append(rndChar);
        }
        this.token = sb.toString();
    }

    public void destroyToken(){
        this.token = "";
    }
}

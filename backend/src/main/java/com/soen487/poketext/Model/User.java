package com.soen487.poketext.Model;

import lombok.*;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.security.SecureRandom;

@Entity
@Table(name="user",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "username")
})
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Id
    @Column(name="userid")
    @Basic
    private int userid;

    @Column(name="username")
    @Basic
    private String username;

    @Column(name="password")
    @Basic
    private String password;

    @Column(name="token")
    @Basic
    private String token = "";

    @Column(name="wincount")
    @Basic
    private int wincount;

    @Column(name="losscount")
    @Basic
    private int losscount;

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

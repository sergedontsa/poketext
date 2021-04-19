package com.soen487.poketext.Model;

import lombok.*;

import javax.persistence.*;
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


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    @Basic
    private int user_id;

    @Column(name="username")
    @Basic
    private String username;


    @Column(name="password")
    @Basic
    private String password;


    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}

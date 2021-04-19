package com.soen487.poketext.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@Getter
@Setter
public class AuthenticationResponse implements Serializable {
    private final String jwt;

}

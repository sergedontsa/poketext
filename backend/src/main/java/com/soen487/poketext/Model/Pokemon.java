package com.soen487.poketext.Model;

import lombok.*;

import javax.persistence.*;

import java.util.List;


@Entity
@Table(name="pokemon")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Pokemon {

    @Id
    @Column(name = "name")
    @Basic
    private String name;

    private final int level = 50;

//    private final int level = 50;

    @Column(name = "hp")
    @Basic
    private int hp;

    @Column(name = "sprite")
    @Basic
    private byte[] sprite;

    private String sprite;

    @OneToMany
    private List<Move> moves;


}


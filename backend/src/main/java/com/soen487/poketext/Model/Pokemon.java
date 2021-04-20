package com.soen487.poketext.Model;

import lombok.*;
import org.hibernate.engine.internal.Cascade;

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
    @Column(name="pokemonid")
    @Basic
    private int pokemonid;

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

    @ManyToOne(cascade=CascadeType.ALL, optional = false)
    @JoinColumn(name="userid")
    private User user;

}


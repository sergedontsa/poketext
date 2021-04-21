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


    @Column(name = "hp")
    @Basic
    private int hp;

    @Column(name = "sprite")
    @Basic
    private String sprite;

    @ManyToOne(optional = false)
    @JoinColumn(name="userid")
    private User user;

}

